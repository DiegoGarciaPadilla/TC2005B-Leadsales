const Reporte = require('../model/reporte.model');

/* ========== CU. 24 CONSULTA HISTORIAL | Chimali Nava =============== */

exports.getReportes = (request, response, next) => {
    const { idUsuario } = request.session;
    console.log(idUsuario);
    Reporte.fetchRol(idUsuario)
        .then (([idRolFetched, fieldData]) => {
            if (idRolFetched === 1 || idRolFetched === 2) {
                Reporte.fetchAll()
                    .then(([reportesFetched, fieldData]) => {
                        response.render('history', {
                            reportes: reportesFetched,
                            csrfToken: request.csrfToken(),
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            else {
                Reporte.fetchReportesByUser(idUsuario)
                    .then(([reportesFetched, fieldData]) => {
                        response.render('history', {
                            reportes: reportesFetched,
                            csrfToken: request.csrfToken(),
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })
        .catch((error) => {
            console.log("trake khe");
        });
};
/* ========================== FIN CU. 24 ==============================  */

