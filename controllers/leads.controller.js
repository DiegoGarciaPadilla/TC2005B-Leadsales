const Lead = require('../model/leads.model');

/* ========== CU. 25 CONSULTA REPORTE EN HISTORIAL | Diego García =============== */


/* ========================== FIN CU. 25 ==============================  */


/* ========== CU. 10 CONSULTA DIRECTORIO | Diego Lira - Diego García (Puro Peer Programing) =============== */

exports.getLeads = (request, response, next) => {
    const { correo = "pednobr@gmail.com", privilegios = ["Ver todos los leads"] } = request.session;
    if (!privilegios.includes("Ver todos los leads")) {
        Lead.fetchLeadsByUser(correo)
            .then(([leadsFetched, fieldData]) => {
                response.render('directorio', {
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
                response.render('directorio', {
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

exports.getLeadDetails = (req, res) => {
    console.log('pedo');
    const leadId = req.params.leadId;
    Lead.fetchOne(leadId)
    .then(([testLead, fieldData]) => {
            return res.status(200).json(testLead[0]);
    }).catch(() => {
        console.log('Error fetching lead details:');
        res.status(500).json({ error: 'Internal server error' });
    });

};

// exports.getLeadDetails = async (req, res) => {
//     console.log('controlador');
//     res.send('Hello from getLeadDetails');
// };


/* ========================== FIN CU. 6 ==============================  */


