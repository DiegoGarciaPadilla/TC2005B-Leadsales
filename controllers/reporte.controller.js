const Reporte = require('../model/reporte.model');

/* ========== CU. 24 CONSULTA HISTORIAL | Chimali Nava =============== */

exports.getReportes = (request, response, next) => {
    const { IDUsuario, privilegios } = request.session;
    console.log(IDUsuario, privilegios);
    if (privilegios.includes('Consulta historial todos.')){
        Reporte.fetchAll()
            .then(([reportesFetched, fieldData]) => {
                response.render('historial', {
                    reportes: reportesFetched,
                    csrfToken: request.csrfToken(),
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    else {
        Reporte.fetchReportesByUser(IDUsuario)
                    .then(([reportesFetched, fieldData]) => {
                        response.render('historial', {
                            reportes: reportesFetched,
                            csrfToken: request.csrfToken(),
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
    }
}
/* ========================== FIN CU. 24 ==============================  */

