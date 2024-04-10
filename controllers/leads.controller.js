const Lead = require('../model/leads.model');

/* ========== CU. 25 CONSULTA REPORTE EN HISTORIAL | Diego García =============== */


/* ========================== FIN CU. 25 ==============================  */


/* ========== CU. 10 CONSULTA DIRECTORIO | Diego Lira - Diego García (Puro Peer Programing) =============== */

exports.getLeads = (request, response, next) => {
    const { correo = "pednobr@gmail.com", privilegios = ["Ver todos los leads"] } = request.session;
    if (!privilegios.includes("Ver todos los leads")) {
        Lead.fetchLeadsByUser(correo)
            .then(([leadsFetched, fieldData]) => {
                response.render('directory', {
                    leads: leadsFetched,    
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    else {
        Lead.fetchAll()
            .then(([leadsFetched, fieldData]) => {
                response.render('directory', {
                    leads: leadsFetched,
                    csrfToken: request.csrfToken(),
                });
            })
            .catch((error) => {
                console.log(error);
            });
        }
};


/* ========================== FIN CU. 10 ==============================  */

/* ========== CU. 6 CONSULTA LEAD | Sebas Colin =============== */

exports.getOneLead = (req, res, next) => {

};

/* ========================== FIN CU. 6 ==============================  */


