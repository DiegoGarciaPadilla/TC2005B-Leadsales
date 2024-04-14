const Reporte = require('../model/reporte.model');

/* ========== CU. 24 CONSULTA HISTORIAL | Chimali Nava =============== */

exports.getReportes = (request, response, next) => {
    const { IDUsuario, Privilegios } = request.session;
    console.log(IDUsuario, Privilegios);
    if (Privilegios.some( Privilegios => Privilegios.Descripcion === 'Consulta historial todos.')){
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
    else if (Privilegios.some(Privilegios => Privilegios.Descripcion === 'Consulta historial propios.')){
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

