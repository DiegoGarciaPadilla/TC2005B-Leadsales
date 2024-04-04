const Lead = require('../model/leads.model');

/* ========== CU. 26 IMPORTA DATOS DE LEADS | Sebas Colin =============== */


/* ========================== FIN CU. 26 ==============================  */


/* ========== CU. 24 CONSULTA HISTORIAL | Chimali Nava =============== */


/* ========================== FIN CU. 24 ==============================  */


/* ========== CU. 25 CONSULTA REPORTE EN HISTORIAL | Diego García =============== */


/* ========================== FIN CU. 25 ==============================  */


/* ========== CU. 10 CONSULTA DIRECTORIO | Diego Lira - Diego García (Puro Peer Programing) =============== */

exports.getLeads = (request, response, next) => {
    const { idusuario = "", privilegios = [] } = request.session;
    if (privilegios.includes("Ver leads propios") && !privilegios.includes("Ver todos los leads")) {
        Lead.fetchLeadsByUser(idusuario)
            .then(([leadsFetched, fieldData]) => {
                response.render('leads', {
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
                response.render('leads', {
                    leads: leadsFetched,
                });
            })
            .catch((error) => {
                console.log(error);
            });
        }
};


/* ========================== FIN CU. 10 ==============================  */

/* ========== CU. 6 CONSULTA LEAD | Sebas Colin =============== */


/* ========================== FIN CU. 6 ==============================  */


