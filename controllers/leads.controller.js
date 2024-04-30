const Lead = require("../model/leads.model");
const Usuario = require("../model/usuario.model");

/* ========== CU. 25 CONSULTA REPORTE EN HISTORIAL | Diego García =============== */

/* ========================== FIN CU. 25 ==============================  */

/* ========== CU. 10 CONSULTA DIRECTORIO | Diego Lira - Diego García - Chimali (Puro Peer Programing) =============== */

exports.getLeads = (req, res) => {
    res.render("directorio", {
        csrfToken: req.csrfToken(),
        privilegios: req.session.Privilegios,
        correo: req.session.Correo,
        rol: req.session.Rol,
        nombre: req.session.Nombre,
        apellidoPaterno: req.session.ApellidoPaterno,
        error: req.session.error || "",
        success: req.session.success || "",
    });
};

/* ---------------- Paginación (Diego García) ---------------- */

exports.getLeadsJSON = (req, res) => {

    // Obtiene los privilegios del usuario
    const { Privilegios, Correo } = req.session;

    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta directorio todos."
        )
    ) {
        // Obtiene los leads de la BD
        Lead.fetchAll()
            .then(([leadsFetched]) => {
                res.status(200).json(leadsFetched);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Error obteniendo leads" });
            });
    } else if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta directorio propios."
        )
    ) {
        // Obtiene los leads de la BD
        Lead.fetchAllByUser(Correo)
            .then(([leadsFetched]) => {
                res.status(200).json(leadsFetched);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Error obteniendo leads" });
            });
    }


}


/* ========================== FIN CU. 10 ==============================  */

/* ========== CU. 6 CONSULTA LEAD | Sebas Colin =============== */

exports.getLeadDetails = (req, res) => {
    const { leadId } = req.params;

    Lead.fetchOne(leadId)
        .then(([testLead]) => res.status(200).json(testLead[0]))
        .catch((error) => {
            console.error(error);

            req.flash("error", "El lead no ha podido ser consultado.");
            res.redirect("/directorio");
        });
};

/* ========================== FIN CU. 6 ==============================  */

/* ========== CU. 5 CREA LEAD | Diego Lira =============== */

exports.postCrearLead = (req, res) => {

    // Se obtienen los datos de la sesión
    const { Privilegios, Nombre, ApellidoPaterno } = req.session;

    // Se obtienen los datos del formulario
    const { nombre, telefono, embudo, asignadoa } = req.body;

    // Si el usuario tiene el privilegio de "Crea lead todos." se crea el lead
    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Crea lead todos."
        )
    ) {
        Lead.createLead(nombre, telefono, embudo, asignadoa)
            .then(([rows]) => {
                res.status(200).json({
                    success: "Lead creado con exito",
                    lead: rows[0],
                });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Error creando lead" });
            });

    // En caso contrario, si el usuario tiene el privilegio de "Crea lead propios." se crea el lead
    } else if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Crea lead."
        )
    ) {
        const nombreCompleto = `${Nombre} ${ApellidoPaterno}`;
        Lead.createLead(nombre, telefono, embudo, nombreCompleto)
            .then(([rows]) => {
                res.status(200).json({
                    success: "Lead creado con exito",
                    lead: rows[0],
                });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Error creando lead" });
            });
    }
};

/* ========================== FIN CU. 5 ==============================  */

/* ========== CU. 8 ELIMINA LEAD | Chimali Nava =============== */

exports.postEliminarLead = async (req, res) => {
    // Se obtienen los leads seleccionados
    const { selectedLeads } = req.body;

    // Se eliminan los leads seleccionados
    try {
        // ELimina los leads seleccionados
        selectedLeads.forEach(async (id) => {
            await Lead.deleteLeadById(id);
        });

        // Respuesta exitosa
        res.status(200).json({ success: true });
    } catch (error) {
        // Respuesta de error
        console.error(error);

        res.status(500).json({ message: "Error eliminando leads" });
    }
};

/* ========================== FIN CU. 8 ==============================  */

/* ========== CU. 27 Exporta datos de leads. | Chimali Nava =============== */

exports.postDescargarLeads = async (req, res) => {
    // Se obtienen los leads seleccionados
    const { selectedLeads } = req.body;

    // Se descargan los leads seleccionados
    try {
        let leadsData = [];
        leadsData = await Promise.all(
            selectedLeads.map(async (IDLead) => {
                const lead = await Lead.fetchOne(IDLead);
                return lead[0];
            })
        );

        // Construye el archivo CSV
        const csvString = `Nombre,Telefono,Correo,Compania,Asignadoa,Creado,Horadecreacion,Fechadeprimermensaje,Horadelprimermensaje,Primermensaje,Fechadeultimomensaje,Horadelultimomensaje,Ultimomensaje,Status,EstadodeLead,Embudo,Etapa,Archivado,CreadoManualmente,Valor,Ganado,Etiquetas
            ${leadsData
                .map((lead) => {
                    const values = [
                        lead[0].Nombre,
                        lead[0].Telefono,
                        lead[0].Correo,
                        lead[0].Compania,
                        lead[0].Asignadoa,
                        lead[0].Creado,
                        lead[0].Horadecreacion,
                        lead[0].Fechadeprimermensaje,
                        lead[0].Horadelprimermensaje,
                        lead[0].Primermensaje,
                        lead[0].Fechadeultimomensaje,
                        lead[0].Horadelultimomensaje,
                        lead[0].Ultimomensaje,
                        lead[0].Status,
                        lead[0].EstadodeLead,
                        lead[0].Embudo,
                        lead[0].Etapa,
                        lead[0].Archivado,
                        lead[0].CreadoManualmente,
                        lead[0].Valor,
                        lead[0].Ganado,
                        lead[0].Etiquetas,
                    ].map((value) => (value === undefined ? "" : value));
                    return values.join(",");
                })
                .join("\n")}`;

        // Descarga el archivo CSV
        res.header("Content-Type", "text/csv");
        res.send(csvString);
    } catch (error) {
        console.error("Error al descargar leads:", error);
        res.status(500).send("Error al descargar leads");
    }
};

/* ========== CU. 7 MODIFICA LEAD | Andrea Medina - Diego Lira ========== */
exports.getEditarLead = (req, res) => {
    const { leadId } = req.params;

    Lead.fetchOne(leadId)
        .then(([leadFetched]) => {
            Usuario.fetchAllUsers()
                .then(([usuariosFetched]) => {
                    res.render("editarLead", {
                        lead: leadFetched[0],
                        csrfToken: req.csrfToken(),
                        usuarios: usuariosFetched,
                    });
                })
                .catch();
        })
        .catch();
};

exports.postEditarLead = (req, res) => {
    const { leadId } = req.params;
    let {
        nombre,
        telefono,
        correo,
        compania,
        asignadoa,
        fechadelultimomensaje,
        horadelultimomensaje,
        ultimomensaje,
        status,
        estado,
        embudo,
        etapa,
        archivado,
        valor,
        ganado,
        etiquetas,
    } = req.body;

    nombre = nombre === undefined ? null : nombre;
    telefono = telefono === undefined ? null : telefono;
    correo = correo === undefined ? null : correo;
    compania = compania === undefined ? null : compania;
    asignadoa = asignadoa === undefined ? null : asignadoa;
    fechadelultimomensaje =
        fechadelultimomensaje === undefined
            ? null
            : new Date(fechadelultimomensaje).toISOString().split("T")[0];
    horadelultimomensaje =
        horadelultimomensaje === undefined ? null : horadelultimomensaje;
    ultimomensaje = ultimomensaje === undefined ? null : ultimomensaje;
    status = status === undefined ? null : status;
    estado = estado === undefined ? null : estado;
    embudo = embudo === undefined ? null : embudo;
    etapa = etapa === undefined ? null : etapa;
    archivado = archivado === undefined ? null : archivado;
    valor = valor === undefined ? null : valor;
    ganado = ganado === undefined ? null : ganado;
    etiquetas = etiquetas === undefined ? null : etiquetas;

    Lead.updateLeadById(
        leadId,
        nombre,
        telefono,
        correo,
        compania,
        asignadoa,
        fechadelultimomensaje,
        horadelultimomensaje,
        ultimomensaje,
        status,
        estado,
        embudo,
        etapa,
        archivado,
        valor,
        ganado,
        etiquetas
    )
        .then(() => {
            req.flash("success", "Lead actualizado correctamente.");
            res.redirect("/directorio");
        })
        .catch();
};

/* ========================== FIN CU. 7 ==============================  */

module.exports = exports;
