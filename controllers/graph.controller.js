const Graph = require("../model/graph.model");
const Reporte = require("../model/reporte.model");

const path = require("path");
const fs = require("fs");

exports.getReporte = (req, res) => {
    res.render('reporte', {
        csrfToken: req.csrfToken(),
        privilegios: req.session.Privilegios,
        correo: req.session.Correo,
        rol: req.session.Rol,
        nombre: req.session.Nombre,
        apellidoPaterno: req.session.ApellidoPaterno,
        apellidoMaterno: req.session.apellidoMaterno,
    });
}

/* ========== CU. 02 GENERA REPORTE | Sebas Colín - Andrea Medina - Diego García =============== */

exports.getReporteJSON = (req, res, next) => {
    const { Privilegios, Nombre, ApellidoPaterno } = req.session;
    const NombreCompleto = `${Nombre} ${ApellidoPaterno}`;

    // Obteniendo fechas de inicio y fin desde los parámetros de la petición

    const { dateStart, dateEnd } = req.query;

    // Caso cuando se pueden consultar los leads de todos
    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Genera reporte todos."
        )
    ) {
        // Arreglo de promesas a ser resueltas
        const graphPromises = [];

        // Gráfica 1
        const Graph1 = new Graph(1);
        const g1 = Graph.fetchAllForGraphs(dateStart, dateEnd);
        const promesaGraphOne = Graph.graphOne(g1);

        graphPromises.push(promesaGraphOne);

        // Gráfica 2
        const Graph2 = new Graph(2);
        const g2 = Graph.fetchAllForGraphs(dateStart, dateEnd);
        const promesaGraphTwo = Graph.graphTwo(g2);

        graphPromises.push(promesaGraphTwo);

        // Gráfica 3
        const Graph3 = new Graph(3);
        const g3 = Graph.fetchAllForGraphs(dateStart, dateEnd);
        const promesaGraphThree = Graph.graphThree(g3);

        graphPromises.push(promesaGraphThree);

        // Gráfica 4
        const Graph4 = new Graph(4);
        const g4 = Graph.fetchAllForGraphs(dateStart, dateEnd);
        const promesaGraphFour = Graph.graphFour(g4);

        graphPromises.push(promesaGraphFour);

        // Gráfica 5
        const Graph5 = new Graph(5);
        const g5 = Graph.fetchAllForGraphs(dateStart, dateEnd);
        const promesaGraphFive = Graph.graphFive(g5);

        graphPromises.push(promesaGraphFive);

        // // Gráfica 6
        // const Graph6 = new Graph(6);
        // const g6 = Graph.fetchAllForGraphs(dateStart, dateEnd);
        // const promesaGraphSix = Graph.graphSix(g6);

        // graphPromises.push(promesaGraphSix);

        // Gráfica 7
        const Graph7 = new Graph(7);
        const g7 = Graph.fetchAllForGraphs(dateStart, dateEnd);
        const promesaGraphSeven = Graph.graphSeven(g7);

        graphPromises.push(promesaGraphSeven);

        // Gráfica 8
        const Graph8 = new Graph(8);
        const g8 = Graph.fetchAllForGraphs(dateStart, dateEnd);
        const promesaGraphEight = Graph.graphEight(g8);

        graphPromises.push(promesaGraphEight);

        // Datos de todas las gráficas pendientes a resolver
        Promise.all(graphPromises)
            .then((results) => {
                const resData = {
                    // Datos a JSON de cada gráfica
                    graph1Data: results[0][0],
                    graph2Data: results[1][0],
                    graph3Data: results[2][0],
                    graph4Data: results[3][0],
                    graph5Data: results[4][0],
                    //graph6Data: results[5][0],
                    graph7Data: results[5][0],
                    graph8Data: results[6][0],
                };

                // Respuesta de JSON con datos para todas las gráficas
                res.status(200).json(resData);
            })
            .catch((error) => {
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        // Arreglo de promesas a ser resueltas
        const graphPromises = [];

        // Gráfica 1
        const Graph1 = new Graph(1);
        const g1 = Graph.fetchSomeForGraphs(NombreCompleto, dateStart, dateEnd);
        const promesaGraphOne = Graph.graphOne(g1);

        graphPromises.push(promesaGraphOne);

        // Gráfica 2    
        const Graph2 = new Graph(2);
        const g2 = Graph.fetchSomeForGraphs(NombreCompleto, dateStart, dateEnd);
        const promesaGraphTwo = Graph.graphTwo(g2);

        graphPromises.push(promesaGraphTwo);

        // Gráfica 3
        const Graph3 = new Graph(3);
        const g3 = Graph.fetchSomeForGraphs(NombreCompleto, dateStart, dateEnd);
        const promesaGraphThree = Graph.graphThree(g3);

        graphPromises.push(promesaGraphThree);

        // Gráfica 4
        const Graph4 = new Graph(4);
        const g4 = Graph.fetchSomeForGraphs(NombreCompleto, dateStart, dateEnd);
        const promesaGraphFour = Graph.graphFour(g4);

        graphPromises.push(promesaGraphFour);

        // Gráfica 5
        const Graph5 = new Graph(5);
        const g5 = Graph.fetchSomeForGraphs(NombreCompleto, dateStart, dateEnd);
        const promesaGraphFive = Graph.graphFive(g5);

        graphPromises.push(promesaGraphFive);

        // Gráfica 6
        // const Graph6 = new Graph(6);
        // const g6 = Graph.fetchSomeForGraphs(dateStart, dateEnd);
        // const promesaGraphSix = Graph.graphSix(g6);

        // graphPromises.push(promesaGraphSix);

        // Gráfica 7
        const Graph7 = new Graph(7);
        const g7 = Graph.fetchSomeForGraphs(NombreCompleto, dateStart, dateEnd);
        const promesaGraphSeven = Graph.graphSeven(g7);

        graphPromises.push(promesaGraphSeven);

        const Graph8 = new Graph(8);
        const g8 = Graph.fetchSomeForGraphs(NombreCompleto, dateStart, dateEnd);
        const promesaGraphEight = Graph.graphEight(g8);

        graphPromises.push(promesaGraphEight);

        // Datos de todas las gráficas pendientes a resolver
        Promise.all(graphPromises)
            .then((results) => {
                const resData = {
                    // Datos a JSON de cada gráfica
                    graph1Data: results[0][0],
                    graph2Data: results[1][0],
                    graph3Data: results[2][0],
                    graph4Data: results[3][0],
                    graph5Data: results[4][0],
                    //graph6Data: results[5][0],
                    graph7Data: results[5][0],
                    graph8Data: results[6][0],
                };

                // Respuesta de JSON con datos para todas las gráficas
                res.status(200).json(resData);
            })
            .catch((error) => {
                res.status(500).json({ error: "Internal server error" });
            });
    }
};

/* ========================== FIN CU. 02 ==============================  */

/* ============== CU. 02 PT. 2 GENERA REPORTE | Sebas Colín ================  */

exports.postPDF = (req, res, next) => {
    const { IDUsuario } = req.session;
    const { pdfData, descripcion } = req.body;
    const { csrfToken } = req.csrfToken();
  
    Reporte.insertReport(IDUsuario, descripcion, pdfData)
      .then(([rows]) => {
        reporteID = rows[0].id;
        
        // Convert the base64 string back to a Buffer
        const pdfBuffer = Buffer.from(pdfData, 'base64');
    
        // Define the path where you want to save the PDF
        const pdfPath = path.join('public', 'uploads', 'reportes', `Reporte_${reporteID}.pdf`);
    
        // Write the PDF Buffer to a file
        fs.writeFile(pdfPath, pdfBuffer, (err => {
            if (err) {
            console.error('Error writing PDF:', err);
            } else {
            }
        }));

        res.status(200).json({ message: "PDF Almacenado correctamente" });
      })
      .catch((error) => {
      });

  };

module.exports = exports;
