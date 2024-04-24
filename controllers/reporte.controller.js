const Reporte = require('../model/reporte.model');
const Lead = require('../model/leads.model');

/* ========== CU. 24 CONSULTA HISTORIAL | Chimali Nava =============== */

exports.getReportes = (req, res) => {
    const { NombreCompleto, Privilegios } = req.session;
    console.log(NombreCompleto, Privilegios);
    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta historial todos."
        )
    ) {
        Reporte.fetchAll()
            .then(([reportesFetched]) => {
                res.render("historial", {
                    reportes: reportesFetched,
                    csrfToken: req.csrfToken(),
                    correo: req.session.Correo,
                    rol: req.session.Rol,
                    privilegios: req.session.Privilegios,
                    nombre: req.session.Nombre,
                    apellidoPaterno: req.session.ApellidoPaterno,
                    apellidoMaterno: req.session.apellidoMaterno,
                });
            })
            .catch((error) => {
                req.flash("error", "Error al cargar reportes.");
                res.redirect("/inicio");
            });
    } else if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta historial propios."
        )
    ) {
        Reporte.fetchReportesByUser(NombreCompleto)
            .then(([reportesFetched]) => {
                res.render("historial", {
                    reportes: reportesFetched,
                    csrfToken: req.csrfToken(),
                });
            })
            .catch((error) => {
                req.flash("error", "Error al cargar reportes.");
                res.redirect("/inicio");
            });
    }
};
/* ========================== FIN CU. 24 ==============================  */

/* ========== CU. 25 CONSULTA REPORTE EN HISTORIAL | Sebas Colin =============== */

exports.consultaReporte = (req, res) => {
    const { IDReporte } = req.params;

    Reporte.fetchOne(IDReporte)
        .then(([reporte]) => {
            console.log(reporte[0]);
            res.status(200).json(reporte[0]);
        })
        .catch((error) => {
            console.log(error);
        })
}

/* ========================== FIN CU. 25 ==============================  */


module.exports = exports;
