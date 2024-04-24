const Lead = require("../model/leads.model");

const Usuario = require("../model/usuario.model");

/* ========== CU. 25 CONSULTA REPORTE EN HISTORIAL | Diego García =============== */

/* ========================== FIN CU. 25 ==============================  */

/* ========== CU. 10 CONSULTA DIRECTORIO | Diego Lira - Diego García - Chimali (Puro Peer Programing) =============== */

exports.getLeads = (req, res) => {
    const { Correo, Privilegios } = req.session; // Test user
    const error = req.flash("error") || "";
    const success = req.flash("success") || "";

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
                            error: error,
                            success: success,
                        });
                    })
                    .catch((error) => {
                        req.flash("error", "Error al cargar usuarios.");
                        res.redirect("/inicio");
                    });
            })
            .catch((error) => {
                req.flash("error", "Error al cargar leads.");
                res.redirect("/inicio");
            });
    } else {
        Lead.fetchLeadsByUser(Correo)
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
                            error: error,
                            success: success,
                        });
                    })
                    .catch((error) => {
                        req.flash("error", "Error al cargar usuarios.");
                        res.redirect("/inicio");
                    });
            })
            .catch((error) => {
                console.log(error);
                req.flash("error", "Error al cargar leads.");
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
            req.flash("error", "El lead no ha podido ser consultado.");
            redirect("/directorio");
        });
};

/* ========================== FIN CU. 6 ==============================  */

/* ========== CU. 5 CREA LEAD | Diego Lira =============== */

exports.postCrearLead = (req, res) => {
    const { Privilegios } = req.session;
    const { nombre, telefono, embudo, asignadoa } = req.body;
    if (Privilegios.some((Privilegios => Privilegios.Descripcion === 'Crea lead todos.'))) {

        Lead.createLead({
                Nombre: nombre,
                Telefono: telefono,
                Embudo: embudo,
                Asignadoa: asignadoa,
            })
            .then(() => {
                res.redirect("/directorio");
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        res.redirect("/directorio");
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

module.exports = exports;
