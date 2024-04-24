const Graph = require("../model/graph.model");
const Reporte = require("../model/reporte.model");

/* ========== CU. 02 GENERA REPORTE | Sebas Colín - Andrea Medina =============== */

exports.getReporte = (req, res, next) => {
    const { Privilegios, Nombre, ApellidoPaterno } = req.session;
    const NombreCompleto = `${Nombre} ${ApellidoPaterno}`;

    // Obteniendo fechas de inicio y fin

    const { start, end } = req.body;

    // Caso cuando se pueden consultar los leads de todos
    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta directorio todos."
        )
    ) {
        // Arreglo de promesas a ser resueltas
        const graphPromises = [];

        // Gráfica 1
        const Graph1 = new Graph(1);
        const g1 = Graph.fetchAllForGraphs(start, end);
        const promesaGraphOne = Graph.graphOne(g1);

        graphPromises.push(promesaGraphOne);

        // Gráfica 2
        const Graph2 = new Graph(2);
        const g2 = Graph.fetchAllForGraphs(start, end);
        const promesaGraphTwo = Graph.graphTwo(g2);

        graphPromises.push(promesaGraphTwo);

        // Gráfica 3
        const Graph3 = new Graph(3);
        const g3 = Graph.fetchAllForGraphs(start, end);
        const promesaGraphThree = Graph.graphThree(g3);

        graphPromises.push(promesaGraphThree);

        // Gráfica 4
        const Graph4 = new Graph(4);
        const g4 = Graph.fetchAllForGraphs(start, end);
        const promesaGraphFour = Graph.graphFour(g4);

        graphPromises.push(promesaGraphFour);

        // Gráfica 5
        const Graph5 = new Graph(5);
        const g5 = Graph.fetchAllForGraphs(start, end);
        const promesaGraphFive = Graph.graphFive(g5);

        graphPromises.push(promesaGraphFive);

        // // Gráfica 6
        // const Graph6 = new Graph(6);
        // const g6 = Graph.fetchAllForGraphs(start, end);
        // const promesaGraphSix = Graph.graphSix(g6);

        // graphPromises.push(promesaGraphSix);

        // // Gráfica 7
        // const Graph7 = new Graph(7);
        // const g7 = Graph.fetchAllForGraphs(start, end);
        // const promesaGraphSeven = Graph.graphSeven(g7);

        // graphPromises.push(promesaGraphSeven);

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
                };

                // Respuesta de JSON con datos para todas las gráficas
                res.status(200).json(resData);
            })
            .catch((error) => {
                console.log("Error recogiendo datos de leads:", error);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        // Arreglo de promesas a ser resueltas
        const graphPromises = [];

        // Gráfica 1
        const Graph1 = new Graph(1);
        const g1 = Graph.fetchSomeForGraphs(NombreCompleto, start, end);
        console.log(g1);
        const promesaGraphOne = Graph.graphOne(g1);

        graphPromises.push(promesaGraphOne);

        // Gráfica 2    
        const Graph2 = new Graph(2);
        const g2 = Graph.fetchSomeForGraphs(NombreCompleto, start, end);
        const promesaGraphTwo = Graph.graphTwo(g2);

        graphPromises.push(promesaGraphTwo);

        // Gráfica 3
        const Graph3 = new Graph(3);
        const g3 = Graph.fetchSomeForGraphs(NombreCompleto, start, end);
        const promesaGraphThree = Graph.graphThree(g3);

        graphPromises.push(promesaGraphThree);

        // Gráfica 4
        const Graph4 = new Graph(4);
        const g4 = Graph.fetchSomeForGraphs(NombreCompleto, start, end);
        const promesaGraphFour = Graph.graphFour(g4);

        graphPromises.push(promesaGraphFour);

        // Gráfica 5
        const Graph5 = new Graph(5);
        const g5 = Graph.fetchSomeForGraphs(NombreCompleto, start, end);
        const promesaGraphFive = Graph.graphFive(g5);

        graphPromises.push(promesaGraphFive);

        // Gráfica 6
        // const Graph6 = new Graph(6);
        // const g6 = Graph.fetchSomeForGraphs(start, end);
        // const promesaGraphSix = Graph.graphSix(g6);

        // graphPromises.push(promesaGraphSix);

        // Gráfica 7
        // const Graph7 = new Graph(7);
        // const g7 = Graph.fetchSomeForGraphs(start, end);
        // const promesaGraphSeven = Graph.graphSeven(g7);

        // graphPromises.push(promesaGraphSeven);

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
                };

                // Respuesta de JSON con datos para todas las gráficas
                res.status(200).json(resData);
            })
            .catch((error) => {
                console.log("Error recogiendo datos de leads:", error);
                res.status(500).json({ error: "Internal server error" });
            });
    }
};


exports.postPDF = (req, res, next) => {
  const { IDUsuario } = req.session;
  const { pdfData } = req.body;
  const { csrfToken } = req.csrfToken();

  Reporte.insertReport(IDUsuario, "Reporte", pdfData)
    .then(() => {
      console.log("PDF Almacenado");
      res.redirect("/historial");
    })
    .catch((error) => {
      console.log(error);
    });
};

/* ========================== FIN CU. 02 ==============================  */

module.exports = exports;
