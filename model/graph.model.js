const db = require("../util/db/db");

module.exports = class Graph {
    constructor(ID) {
        this.idGraph = ID;
    }

    static fetchAllForGraphs(start, end) {
        if (start && end) {
            let query =
                "SELECT * FROM `lead` WHERE FechaHoraEliminado IS NULL AND Creado BETWEEN ";
            query += "'" + start + "' AND '" + end + "'";
            return query;
        } else {
            let query = "SELECT * FROM `lead` WHERE FechaHoraEliminado IS NULL";
            return query;
        }
    }

    static fetchSomeForGraphs(NombreCompleto, start, end) {
        let query = "SELECT * FROM `lead` WHERE Asignadoa = ";
        query += "'" + NombreCompleto + "'" + " AND FechaHoraEliminado IS NULL";
        if (start && end) {
            query += " AND Creado BETWEEN ";
            query += "'" + start + "' AND '" + end + "'";
            return query;
        } else {
            return query;
        }
    }

    static async graphOne(filter) {
        let query =
            "SELECT DATE_FORMAT(Creado, '%Y-%m-%d') AS `Fecha`, COUNT(*) AS `Leads` FROM (";
        query +=
            filter + ") AS `Leads` GROUP BY DATE_FORMAT(Creado, '%Y-%m-%d')";

        return db.execute(query);
    }

    static async graphTwo(filter) {
        let query =
            "SELECT YEAR(Creado) AS `Anio`, MONTH(Creado) AS `Mes`, COUNT(*) AS `NoLeads` FROM (";
        query += filter + ") AS `Leads` GROUP BY Anio, Mes";

        return db.execute(query);
    }

    static async graphThree(filter) {
        let query = "SELECT Asignadoa, COUNT(*) as `LeadsPorUsuario` FROM (";
        query += filter + ") AS Leads GROUP BY Asignadoa HAVING COUNT(*) > 1";

        return db.execute(query);
    }

    static async graphFour(filter) {
        let query = "SELECT Status, COUNT(*) AS `Cantidad` FROM (";
        query += filter + ") AS Leads GROUP BY Status";

        return db.execute(query);
    }

    static async graphFive(filter) {
        let query = "SELECT Embudo, COUNT(*) AS `Cantidad` FROM (";
        query += filter + ") AS Leads GROUP BY Embudo";

        return db.execute(query);
    }

    static async graphSix(filter) {
        let query =
            "SELECT YEAR(Creado) AS Anio, COUNT(DISTINCT Compania) AS `Companias Atendidas` FROM (";
        query += filter + ") AS Leads GROUP BY YEAR(Creado) ORDER BY Anio";

        return db.execute(query);
    }

    static async graphSeven(filter) {
        let query = "SELECT Archivado, Embudo, COUNT(*) AS Cantidad FROM (";
        query += filter + ") AS Leads GROUP BY Archivado, Embudo";

        return db.execute(query);
    }
};
