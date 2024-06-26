const Lead = require("../model/leads.model");
const Usuario = require("../model/usuario.model");

/* ========== CU. 25 CONSULTA REPORTE EN HISTORIAL | Diego García =============== */

/* ========================== FIN CU. 25 ==============================  */

/* ========== CU. 10 CONSULTA DIRECTORIO | Diego Lira - Diego García - Chimali (Puro Peer Programing) =============== */

exports.getLeads = async (req, res) => {
    const sucessMessage = req.flash("editado") || "";

    const {
        Nombre,
        ApellidoPaterno,
        ApellidoMaterno,
        Correo,
        Privilegios,
        Rol,
    } = req.session;

    // Obtiene todos los usuarios
    const [usuariosFetched] = await Usuario.fetchAllUsers();

    // Obtiene los embudos
    const [embudosFetched] = await Lead.fetchEmbudos();

    res.render("directorio", {
        csrfToken: req.csrfToken(),
        privilegios: Privilegios,
        correo: Correo,
        rol: Rol,
        nombre: Nombre,
        apellidoPaterno: ApellidoPaterno,
        apellidoMaterno: ApellidoMaterno,
        error: req.session.error || "",
        success: sucessMessage,
        usuarios: usuariosFetched,
        embudos: embudosFetched,
    });
};

/* ---------------- Paginación (Diego García) ---------------- */

exports.getLeadsJSON = async (req, res) => {
    // Obtiene los privilegios del usuario
    const { Privilegios, Correo } = req.session;

    // Obtiene la página actual de los parámetros de la URL
    const page = req.query.page || 1;

    // Entradas por página
    const entriesPerPage = 100;

    // Si el usuario tiene el privilegio de "Consulta directorio todos." se obtienen todos los leads
    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta directorio todos."
        )
    ) {
        // Obtiene los leads de la BD
        const [leadsFetched] = await Lead.fetchAllLeadsByPage(page, entriesPerPage);

        // Obtiene el conteo de leads de la BD
        const [leadsCount] = await Lead.fetchAllCount();

        // Obtiene los usuarios de la BD
        const [usuariosFetched] = await Usuario.fetchAllUsers();

        // Obtiene los embudos de la BD
        const [embudosFetched] = await Lead.fetchEmbudos();

        const pages = Math.ceil(leadsCount[0].total / entriesPerPage);

        // Envía la respuesta con los leads, usuarios y embudos
        res.status(200).json({
            leadsFetched,
            leadsCount,
            usuariosFetched,
            embudosFetched,
            pages
        });

        // En caso contrario, si el usuario tiene el privilegio de "Consulta directorio propios." se obtienen los leads propios
    } else if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta directorio propios."
        )
    ) {
        // Obtiene los leads de la BD
        const [leadsFetched] = await Lead.fetchAllLeadsByUserAndPage(
            Correo,
            page,
            entriesPerPage
        );

        // Obtiene el conteo de leads de la BD
        const [leadsCount] = await Lead.fetchLeadsByUserCount(Correo);

        // Obtiene los usuarios de la BD
        const [usuariosFetched] = await Usuario.fetchAllUsers();

        // Obtiene los embudos de la BD
        const [embudosFetched] = await Lead.fetchEmbudos();

        // Calcula el número de páginas
        const pages = Math.ceil(leadsCount[0].total / entriesPerPage);

        // Envía la respuesta con los leads
        res.status(200).json({
            leadsFetched,
            leadsCount,
            usuariosFetched,
            embudosFetched,
            pages

        });
    }
};

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

exports.postCrearLead = async (req, res) => {
    // Se obtienen los datos de la sesión
    const { Nombre, ApellidoPaterno, ApellidoMaterno, Correo, Rol, Privilegios } = req.session;

    // Obtiene todos los usuarios
    const [usuariosFetched] = await Usuario.fetchAllUsers();

    // Obtiene los embudos
    const [embudosFetched] = await Lead.fetchEmbudos();

    // Se obtienen los datos del formulario
    const { nombre, telefono, embudo, asignadoa } = req.body;

    // Si el usuario tiene el privilegio de "Crea lead todos." se crea el lead
    if (Privilegios.some((priv) => priv.Descripcion === "Crea lead todos.")) {
        Lead.createLead(nombre, telefono, embudo, asignadoa)
            .then(() => {
                // Respuesta exitosa
                res.render("directorio", {
                    csrfToken: req.csrfToken(),
                    privilegios: Privilegios,
                    correo: Correo,
                    rol: Rol,
                    nombre: Nombre,
                    apellidoPaterno: ApellidoPaterno,
                    apellidoMaterno: ApellidoMaterno,
                    error: "",
                    success: "Lead creado con exito",
                    usuarios: usuariosFetched,
                    embudos: embudosFetched,
                });
                    
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Error creando lead" });
            });

        // En caso contrario, si el usuario tiene el privilegio de "Crea lead propios." se crea el lead
    } else if (Privilegios.some((priv) => priv.Descripcion === "Crea lead propios.")) {
        const nombreCompleto = `${Nombre} ${ApellidoPaterno}`;
        Lead.createLead(nombre, telefono, embudo, nombreCompleto)
            .then(() => {
                res.render("directorio", {
                    csrfToken: req.csrfToken(),
                    privilegios: Privilegios,
                    correo: Correo,
                    rol: Rol,
                    nombre: Nombre,
                    apellidoPaterno: ApellidoPaterno,
                    apellidoMaterno: ApellidoMaterno,
                    error: "",
                    success: "Lead creado con exito",
                    usuarios: usuariosFetched,
                    embudos: embudosFetched,
                });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Error creando lead" });
            });
    }
};

/* ========================== FIN CU. 5 ==============================  */

/* =================== BÚSQUEDA DE LEAD | Chimali Nava =================== */

exports.getBusquedaLead = (req, res, next) => {
    Lead.buscaLead(req.params.valorBusqueda)
    .then(([leads, fieldData]) => {
        return res.status(200).json({ leads: leads});
    })
    .catch((error) => {
        console.error("Explicación error", error);
        return res.status(500).json({ message: "Error al buscar leads" });
    });
};

/* ========================== FIN BÚSQUEDA DE LEAD ==============================  */

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
    const { privilegios } = req.session;

    Lead.fetchOne(leadId)
        .then(([leadFetched]) => {
            Usuario.fetchAllUsers()
                .then(([usuariosFetched]) => {
                    res.render("editarLead", {
                        lead: leadFetched[0],
                        csrfToken: req.csrfToken(),
                        usuarios: usuariosFetched,
                        correo: req.session.Correo,
                        rol: req.session.Rol,
                        nombre: req.session.Nombre,
                        apellidoPaterno: req.session.ApellidoPaterno,
                        apellidoMaterno: req.session.apellidoMaterno,
                        privilegios,
                        success: "",
                        error: "",
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
            req.flash("editado", "Lead actualizado correctamente.");
            res.redirect("/directorio");
        })
        .catch();
};

/* ========================== FIN CU. 7 ==============================  */

module.exports = exports;
