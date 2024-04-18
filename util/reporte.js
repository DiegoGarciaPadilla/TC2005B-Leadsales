function graficas_asincronas() {
    console.log("GRAFICAS PERRAS ASINCRONAS");

    fetch(`/reporte`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((result) => {
            if (!result.ok) {
                throw new Error("Network response was not ok");
            }
            return result.json()
        })
        .then((data) => {
            Object.keys(data).forEach((key) => {

                // const graphData = data[key];

                const graphData = JSON.parse("<%- JSON.stringify(data) %>");

                if (key === "graph1Data") {
                    console.log(key);
                    // Procesado de datos de gráfica uno
                    const leadsPorDia = {};
                    let diasTotales = 0;
                    let leadsTotales = 0;

                    graphData.forEach((item) => {
                        const fecha = item.Fecha;
                        const leads = item.Leads;
                        if (!leadsPorDia[fecha]) {
                            leadsPorDia[fecha] = leads;
                            diasTotales+= 1;
                        } else {
                            leadsPorDia[fecha] += leads;
                        }
                        leadsTotales += leads;
                    });

                    const averageLeadsPerDay = leadsTotales / diasTotales;

                    // Datos para Chart.js
                    const fechas = Object.keys(leadsPorDia);
                    const leads = Object.values(leadsPorDia);

                    const ctx1 = document
                        .getElementById("chartOne")
                        .getContext("2d");
                    const graficaUno = new Chart(ctx1, {
                        type: "bar",
                        data: {
                            labels: fechas,
                            datasets: [
                                {
                                    label: "Promedio de Leads Manejados al Día",
                                    data: leads,
                                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                                    borderColor: "rgba(54, 162, 235, 1)",
                                    borderWidth: 1,
                                },
                            ],
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        },
                    });
                }
            });

            // console.log(data);
            // console.log(graph1Data);
            // window.location.href = '/reporte';
        })
        .catch((error) => {
            console.log(error);
        });
}
