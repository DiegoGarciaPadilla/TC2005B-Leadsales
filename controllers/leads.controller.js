const Lead = require("../model/leads.model");
const Usuario = require("../model/usuario.model");
const csv = require('csv-parser');
const fs = require('fs');

/* ========== CU. 25 CONSULTA REPORTE EN HISTORIAL | Diego García =============== */

/* ========================== FIN CU. 25 ==============================  */

/* ========== CU. 10 CONSULTA DIRECTORIO | Diego Lira - Diego García - Chimali (Puro Peer Programing) =============== */

exports.getLeads = (req, res) => {
    const { Correo, Privilegios } = req.session; // Test user

    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta directorio todos."
        )
    ) {
        Lead.fetchAll()
            .then(([leadsFetched]) => {
                Usuario.fetchAllUsers()
                    .then(([usuariosFetched]) => {
                        res.render("directorio", {
                            leads: leadsFetched,
                            csrfToken: req.csrfToken(),
                            correo: req.session.Correo,
                            rol: req.session.Rol,
                            nombre: req.session.Nombre,
                            apellidoPaterno: req.session.ApellidoPaterno,
                            apellidoMaterno: req.session.apellidoMaterno,
                            usuarios: usuariosFetched,
                            error: "",
                            success: "",
                        });
                    })
                    .catch((error) => {
                        res.redirect("/inicio");
                    });
            })
            .catch((error) => {
                res.redirect("/inicio");
            });
    } else {
        Lead.fetchLeadsByUser(Correo)
            .then(([leadsFetched]) => {
                res.render("directorio", {
                    leads: leadsFetched,
                    csrfToken: req.csrfToken(),
                    correo: req.session.Correo,
                    rol: req.session.Rol,
                    nombre: req.session.Nombre,
                    apellidoPaterno: req.session.ApellidoPaterno,
                    apellidoMaterno: req.session.apellidoMaterno,   
                    error: "",
                    success: "",
                });
            })
            .catch((error) => {
                console.log(error);
                res.redirect("/inicio");
            });
    }
};

/* ========================== FIN CU. 10 ==============================  */

/* ========== CU. 6 CONSULTA LEAD | Sebas Colin =============== */

exports.getLeadDetails = (req, res) => {
    const { leadId } = req.params;

    Lead.fetchOne(leadId)
        .then(([testLead]) => res.status(200).json(testLead[0]))
        .catch(() => {
            redirect("/directorio");
        });
};

/* ========================== FIN CU. 6 ==============================  */

/* ========== CU. 5 CREA LEAD | Diego Lira =============== */

exports.postCrearLead = (req, res) => {
    const { Privilegios } = req.session;
    const { nombre, telefono, embudo, asignadoa } = req.body;
    if (Privilegios.some((Privilegios => Privilegios.Descripcion === 'Crea lead todos.'))) {

        Lead.createLead(nombre, telefono, embudo, asignadoa)
            .then(([rows]) => {

                res.status(200).json({ success: "Lead creado con exito",  lead: rows[0] });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Error creando lead" });
            });
    } else {
        console.log("No tienes permisos para crear leads");
    }
};

/* ========================== FIN CU. 5 ==============================  */

/* ========== CU. 8 ELIMINA LEAD | Chimali Nava =============== */

exports.postEliminarLead = async (req, res) => {
    const selectedLeads = req.body.selectedLeads;
  
    try {
      for (const id of selectedLeads) {
        await Lead.deleteLeadById(id);
      }
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error eliminando leads' });
    }
  };

/* ========================== FIN CU. 8 ==============================  */

/* ========== CU. 27 Exporta datos de leads. | Chimali Nava =============== */

exports.postDescargarLeads = async (req, res) => {
    const selectedLeads = req.body.selectedLeads;

    try {
        const leadsData = [];
        for (const IDLead of selectedLeads) {
            const lead = await Lead.fetchOne(IDLead);
            leadsData.push(lead[0]);
        }
        //console.log('Leads descargados:', leadsData);
        
        const csvString = 'Nombre,Telefono,Correo,Compania,Asignadoa,Creado,Horadecreacion,Fechadeprimermensaje,Horadelprimermensaje,Primermensaje,Fechadeultimomensaje,Horadelultimomensaje,Ultimomensaje,Status,EstadodeLead,Embudo,Etapa,Archivado,CreadoManualmente,Valor,Ganado,Etiquetas\n' +
        leadsData.map(lead => {
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
                lead[0].Etiquetas
            ].map(value => value === undefined ? '' : value);
            return values.join(',');
        }).join('\n');

        res.header('Content-Type', 'text/csv');
        res.send(csvString);
    } catch (error) {
        console.error('Error al descargar leads:', error);
        res.status(500).send('Error al descargar leads');
    }
};

//const csvString = 'Nombre,Telefono,Correo,Compania,Asignadoa,Creado,Horadecreacion,Fechadeprimermensaje,Horadelprimermensaje,Primermensaje,Fechadeultimomensaje,Horadelultimomensaje,Ultimomensaje,Status,EstadodeLead,Embudo,Etapa,Archivado,CreadoManualmente,Valor,Ganado,Etiquetas\n' + leadsData.map(lead => `${lead.Nombre},${lead.Telefono},${lead.Correo},${lead.Compania},${lead.Asignadoa},${lead.Creado},${lead.Horadecreacion},${lead.Fechadeprimermensaje},${lead.Horadelprimermensaje},${lead.Primermensaje},${lead.Fechadeultimomensaje},${lead.Horadelultimomensaje},${lead.Ultimomensaje},${lead.Status},${lead.EstadodeLead},${lead.Embudo},${lead.Etapa},${lead.Archivado},${lead.CreadoManualmente},${lead.Valor},${lead.Ganado},${lead.Etiquetas}`).join('\n');

/* ========== CU. 7 MODIFICA LEAD | Andrea Medina - Diego Lira ========== */
exports.getEditarLead = (req, res) => {
    const { leadId } = req.params;

    Lead.fetchOne(leadId)
        .then(([leadFetched]) => {
            Usuario.fetchAllUsers()
                .then(([usuariosFetched]) => {
                    res.render('editarLead', {
                        lead: leadFetched[0],
                        csrfToken: req.csrfToken(),
                        usuarios: usuariosFetched,
                    });
                })
                .catch()
        })
        .catch();
}

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
    fechadelultimomensaje = fechadelultimomensaje === undefined ? null : new Date(fechadelultimomensaje).toISOString().split('T')[0];
    horadelultimomensaje = horadelultimomensaje === undefined ? null : horadelultimomensaje;
    ultimomensaje = ultimomensaje === undefined ? null : ultimomensaje;
    status = status === undefined ? null : status;
    estado = estado === undefined ? null : estado;
    embudo = embudo === undefined ? null : embudo;
    etapa = etapa === undefined ? null : etapa;
    archivado = archivado === undefined ? null : archivado;
    valor = valor === undefined ? null : valor;
    ganado = ganado === undefined ? null : ganado;
    etiquetas = etiquetas === undefined ? null : etiquetas;
    
    Lead.updateLeadById(leadId, nombre, telefono, correo, compania, asignadoa, fechadelultimomensaje, horadelultimomensaje, ultimomensaje, status, estado, embudo, etapa, archivado, valor, ganado, etiquetas)
        .then(() => {
            const { Correo, Privilegios } = req.session; // Test user

            if (
                Privilegios.some(
                    (priv) => priv.Descripcion === "Consulta directorio todos."
                )
            ) {
                Lead.fetchAll()
                    .then(([leadsFetched]) => {
                        Usuario.fetchAllUsers()
                            .then(([usuariosFetched]) => {
                                res.render("directorio", {
                                    leads: leadsFetched,
                                    csrfToken: req.csrfToken(),
                                    correo: req.session.Correo,
                                    rol: req.session.Rol,
                                    nombre: req.session.Nombre,
                                    apellidoPaterno: req.session.ApellidoPaterno,
                                    apellidoMaterno: req.session.apellidoMaterno,
                                    usuarios: usuariosFetched,
                                    error: "",
                                    success: "Tu lead ha sido editado con éxito.",
                                });
                            })
                            .catch((error) => {
                                res.redirect("/inicio");
                            });
                    })
                    .catch((error) => {
                        res.redirect("/inicio");
                    });
            } else {
                Lead.fetchLeadsByUser(Correo)
                    .then(([leadsFetched]) => {
                        res.render("directorio", {
                            leads: leadsFetched,
                            csrfToken: req.csrfToken(),
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.redirect("/inicio");
                    });
            }

        })
        .catch();
}

/* ========================== FIN CU. 7 ==============================  */

module.exports = exports;
