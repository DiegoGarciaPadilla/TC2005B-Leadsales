const Reporte = require('../model/reporte.model');

/* ========== CU. 24 CONSULTA HISTORIAL | Chimali Nava =============== */

exports.getReportes = (req, res) => {
    const { IDUsuario } = req.session;
    console.log(IDUsuario);
    Reporte.fetchRol(IDUsuario)
        .then (([idRolFetched]) => {
            console.log(idRolFetched);
            const rol = idRolFetched[0];
            if (rol.IDRol === 1 || rol.IDRol === 2) {
                Reporte.fetchAll()
                    .then(([reportesFetched]) => {
                        res.render('historial', {
                            reportes: reportesFetched,
                            csrfToken: req.csrfToken(),
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            else {
                Reporte.fetchReportesByUser(IDUsuario)
                    .then(([reportesFetched]) => {
                        res.render('historial', {
                            reportes: reportesFetched,
                            csrfToken: req.csrfToken(),
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })
        .catch((error) => {
            console.log(error);
        });
};
/* ========================== FIN CU. 24 ==============================  */

