const db = require("../util/db/db");

module.exports = class Reporte {

    constructor(Uname, Utel) {
        this.name = Uname;
        this.tel = Utel;
    }

    save(){

    }

    static fetchAll() {
        return db.execute("SELECT * FROM `Reporte`");
    }

    static async fetchReporteByUser(IDReporte) {
       
    }