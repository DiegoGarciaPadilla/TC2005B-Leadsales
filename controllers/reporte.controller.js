const Reporte = require('../model/reporte.model');
const Lead = require('../model/leads.model');
// const jsPDF = require('jspdf');
// const Chart = require('chart.js');

/* ========== CU. 02 CONSULTA HISTORIAL | Sebas Colín - Andrea Medina =============== */

exports.postReporte = (request, response, next) => {
    const { IDUsuario, Correo, Privilegios } = request.session;
    console.log(IDUsuario, Privilegios);

    const { start, end } = request.body;
    console.log(start, end);

    // Caso cuando se pueden consultar los leads de todos   
    if (Privilegios.some((Privilegios => Privilegios.Descripcion === 'Consulta directorio todos.'))) {
        if (start && end) {
            // Leads de todos filtrados por fecha 
            Lead.fetchAllByDate(start, end)
                .then(([leadsFetched, fieldData]) => {
                    console.log(leadsFetched);
                    const datosGraficas = generarDatosGraficas(leadsFetched);
                    const pdf = generarPDF(datosGraficas);
                    response.redirect("/");
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                // Leads de todos
                Lead.fetchAll()
                .then(([leadsFetched, fieldData]) => {
                    console.log(leadsFetched);
                    const datosGraficas = generarDatosGraficas(leadsFetched);
                    const pdf = generarPDF(datosGraficas);
                    response.redirect("/");
                }).catch((error) => {
                    console.log(error);
                });
                
            }
        } else {
            if (start && end) {
                // Leads por usuario filtrados for fecha 
                Lead.fetchLeadsByUserByDate(Correo, start, end)
                .then(([leadsFetched, fieldData]) => {
                    console.log(leadsFetched);
                    const datosGraficas = generarDatosGraficas(leadsFetched);
                    const pdf = generarPDF(datosGraficas);
                    response.redirect("/");
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                Lead.fetchLeadsByUser(Correo)
                .then(([leadsFetched, fieldData]) => {
                    console.log(leadsFetched);
                    const datosGraficas = generarDatosGraficas(leadsFetched);
                    const pdf = generarPDF(datosGraficas);
                    response.redirect("/");
            }).catch((error) => {
                console.log(error);
            });
        }
    } 

}

function generarDatosGraficas(leads) {

}

function generarPDF(data) {

}

/* ========================== FIN CU. 24 ==============================  */


/* ========== CU. 24 CONSULTA HISTORIAL | Chimali Nava =============== */

exports.getReportes = (req, res) => {
    const { IDUsuario, Privilegios } = req.session;
    console.log(IDUsuario, Privilegios);
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
                    nombre: req.session.Nombre,
                    apellidoPaterno: req.session.ApellidoPaterno,
                    apellidoMaterno: req.session.apellidoMaterno,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    } else if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta historial propios."
        )
    ) {
        Reporte.fetchReportesByUser(IDUsuario)
            .then(([reportesFetched]) => {
                res.render("historial", {
                    reportes: reportesFetched,
                    csrfToken: req.csrfToken(),
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
/* ========================== FIN CU. 24 ==============================  */

module.exports = exports;
