const Reporte = require('../model/reporte.model');
const Lead = require('../model/leads.model');

const fs = require('fs');
const axios = require('axios');
const path = require('path');

/* ========== CU. 24 CONSULTA HISTORIAL | Chimali Nava =============== */

exports.getReportes = (req, res) => {
    const { NombreCompleto, Privilegios } = req.session;
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
    }
};
/* ========================== FIN CU. 24 ==============================  */

/* ========== CU. 25 CONSULTA REPORTE EN HISTORIAL | Sebas Colin =============== */
// Function to download PDF from data URI and save it to a file
async function downloadPDFFromURI(pdfDataURI, fileName) {
    try {
        // Check if pdfDataURI is a Buffer
        if (!Buffer.isBuffer(pdfDataURI)) {
            return;
        }

        // Write the Buffer to a file
        fs.writeFileSync(fileName, pdfDataURI);
    } catch (error) {
    }
}

exports.consultaReporte = (req, res) => {
    const { IDReporte } = req.params;

    Reporte.fetchOne(IDReporte)
        .then(([reporteFetched]) => {
            const reporte = reporteFetched[0];
            // Assuming reporte contains the PDF data URI
            const pdfDataURI = reporte.Liga; 

            const fileName = `Reporte_${IDReporte}.pdf`; // You can customize the file name here

            // Download the PDF from the data URI
            //downloadPDFFromURI(pdfDataURI, fileName);

              // Define the path of the PDF file
                const pdfPath = path.join('public', 'uploads', 'reportes', fileName);

                // Send the PDF file for download
                res.download(pdfPath, err => {
                    if (err) {
                    // Handle error
                    } else {
                    }
                });



            //res.json({ pdfUrl: '/public/uploads/reportes/reporte.pdf' });
            
            // You may also send the downloaded PDF file as a response to the client if needed
            //res.download(fileName); // Uncomment this line if you want to send the file to the client

            // Send a response to the client indicating successful download
            //res.status(200).json('PDF descargado exitosamente.');
        })
        .catch((error) => {
        })
}

/* ========================== FIN CU. 25 ==============================  */


module.exports = exports;
