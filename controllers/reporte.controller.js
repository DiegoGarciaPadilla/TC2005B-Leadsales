const Chart = require("chart.js");

const Reporte = require("../model/reporte.model");

const Lead = require("../model/leads.model");

// const jsPDF = require('jspdf');

/* ========== CU. 02 CONSULTA HISTORIAL | Sebas Colín - Andrea Medina =============== */

exports.getReporte = (req, res, ) => { 
    res.render('reporte', {
        data: null,
        csrfToken: req.csrfToken(),
        privilegios: req.session.Privilegios,
        correo: req.session.Correo,
        rol: req.session.Rol,
        nombre: req.session.Nombre,
        apellidoPaterno: req.session.ApellidoPaterno,
        apellidoMaterno: req.session.apellidoMaterno,
    });
};

exports.postReporte = (req, res, next) => {
    // Obtiene los datos de la sesión
    const { IDUsuario, Correo, Privilegios, Nombre, ApellidoPaterno } =
        req.session;

    // Obtiene el valor del token CSRF
    const CSRF = req.body._csrf;
    console.log("Hola?");
    console.log("Hola soy el csrf pipipi", CSRF);
    console.log("Hola soy el body pipipi", req.body);

    console.log(req.csrfToken());

    // Obtiene el nombre completo del usuario
    const NombreCompleto = String(Nombre, " ", ApellidoPaterno);

    // Recibe las fechas de inicio y fin para la consulta
    const { start, end } = req.body;

    console.log(start, end);

    // Caso cuando se pueden consultar los leads de todos

    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta directorio todos."
        )
    ) {
        // Arreglo de promesas a ser resueltas
        const graphPromises = [];

        // Gráfica 1
        const g1 = Lead.fetchAllForGraphs(start, end);
        const promesaGraphOne = Lead.graphOne(g1);

        graphPromises.push(promesaGraphOne);

        // Gráfica 2
        const g2 = Lead.fetchAllForGraphs(start, end);
        const promesaGraphTwo = Lead.graphTwo(g2);

        graphPromises.push(promesaGraphTwo);

        // Gráfica 3
        const g3 = Lead.fetchAllForGraphs(start, end);
        const promesaGraphThree = Lead.graphThree(g3);

        graphPromises.push(promesaGraphThree);

        // Gráfica 4
        const g4 = Lead.fetchAllForGraphs(start, end);
        const promesaGraphFour = Lead.graphFour(g4);

        graphPromises.push(promesaGraphFour);

        // Gráfica 5
        const g5 = Lead.fetchAllForGraphs(start, end);
        const promesaGraphFive = Lead.graphFive(g5);

        graphPromises.push(promesaGraphFive);

        // Gráfica 6
        const g6 = Lead.fetchAllForGraphs(start, end);
        const promesaGraphSix = Lead.graphSix(g6);

        graphPromises.push(promesaGraphSix);

        // Gráfica 7
        const g7 = Lead.fetchAllForGraphs(start, end);
        const promesaGraphSeven = Lead.graphSeven(g7);

        graphPromises.push(promesaGraphSeven);

        // Gráfica 8
        const g8 = Lead.fetchAllForGraphs(start, end);
        const promesaGraphEight = Lead.graphEight(g8);

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
                    graph5Data: results[4][0], // Datos gráficas
                    graph6Data: results[5][0],
                    graph7Data: results[6][0],
                    graph8Data: results[7][0],
                };

                res.render("reporte", {
                    data: res.json(resData),
                    csrfToken: req.csrfToken(),
                });
            })
            .catch((error) => {
                console.log("Error recogiendo datos de leads:", error);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        // Arreglo de promesas a ser resueltas
        const graphPromises = [];

        // Gráfica 1
        const g1 = Lead.fetchSomeForGraphs(NombreCompleto, start, end);
        console.log(g1);
        const promesaGraphOne = Lead.graphOne(g1);

        graphPromises.push(promesaGraphOne);

        // Gráfica 2
        const g2 = Lead.fetchSomeForGraphs(NombreCompleto, start, end);
        const promesaGraphTwo = Lead.graphTwo(g2);

        graphPromises.push(promesaGraphTwo);

        // Gráfica 3
        const g3 = Lead.fetchSomeForGraphs(NombreCompleto, start, end);
        const promesaGraphThree = Lead.graphThree(g3);

        graphPromises.push(promesaGraphThree);

        // Gráfica 4
        const g4 = Lead.fetchSomeForGraphs(NombreCompleto, start, end);
        const promesaGraphFour = Lead.graphFour(g4);

        graphPromises.push(promesaGraphFour);

        // Gráfica 5
        const g5 = Lead.fetchSomeForGraphs(NombreCompleto, start, end);
        const promesaGraphFive = Lead.graphFive(g5);

        graphPromises.push(promesaGraphFive);

        // Gráfica 6
        const g6 = Lead.fetchSomeForGraphs(start, end);
        const promesaGraphSix = Lead.graphSix(g6);

        graphPromises.push(promesaGraphSix);

        // Gráfica 7
        const g7 = Lead.fetchSomeForGraphs(start, end);
        const promesaGraphSeven = Lead.graphSeven(g7);

        graphPromises.push(promesaGraphSeven);

        // Gráfica 8
        const g8 = Lead.fetchSomeForGraphs(start, end);
        const promesaGraphEight = Lead.graphEight(g8);

        graphPromises.push(promesaGraphEight);

        // Datos de todas las gráficas pendientes a resolver
        Promise.all(graphPromises)
            .then((results) => {
                const resData = {
                    // Datos a JSON de cada gráfica
                    graph1Data: results[0][0],
                    graph2Data: results[1][0],
                    graph3Data: results[2][0], // Datos gráficas
                    graph4Data: results[3][0],
                    graph5Data: results[4][0],
                    graph6Data: results[5][0],
                    graph7Data: results[6][0],
                    graph8Data: results[7][0],
                };

                // Respuesta de JSON con datos para todas las gráficas
                res.render("reporte", {
                    data: resData,
                    csrfToken: CSRF,
                });
            })
            .catch((error) => {
                console.log("Error recogiendo datos de leads:", error);
                res.status(500).json({ error: "Internal server error" });
            });
    }
};

/* ========================== FIN CU. 24 ==============================  */

/* ========== CU. 24 CONSULTA HISTORIAL | Chimali Nava =============== */

exports.getHistorial = (req, res) => {
    const { IDUsuario, Privilegios } = req.session;

    console.log("getHistorial -> IDUsuario: ", IDUsuario);

    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta historial todos."
        )
    ) {
        Reporte.fetchAll()
            .then(([reportesFetched]) => {
                console.log("getHistorial -> reportesFetched: ", reportesFetched);
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
                console.log("getHistorial -> reportesFetched: ", reportesFetched);
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
