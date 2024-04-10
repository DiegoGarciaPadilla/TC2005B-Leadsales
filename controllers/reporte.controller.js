const Reporte = require('../model/reporte.model');

/* ========== CU. 24 CONSULTA HISTORIAL | Chimali Nava =============== */

exports.getReportes = (request, response, next) => {
    const { IDUsuario } = request.session;
    console.log(IDUsuario);
    Reporte.fetchRol(IDUsuario)
        .then (([idRolFetched, fieldData]) => {
            console.log(idRolFetched);
            const rol = idRolFetched[0];
            if (rol.IDRol === 1 || rol.IDRol === 2) {
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

