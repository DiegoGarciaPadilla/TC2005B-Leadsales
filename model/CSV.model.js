const fs = require("fs");

const csvParser = require("csv-parser");

const moment = require("moment");

const db = require("../util/db/db");

module.exports = class CSV {
    constructor(fName) {
        this.name = fName;
    }

    save() {
        return new Promise((resolve, reject) => {
            const results = [];
    
            fs.createReadStream(`public/uploads/${this.name}`) // Read the CSV file
                .pipe(csvParser())
                .on("data", (data) => results.push(data))
                .on("end", async () => {
                    console.log(results);
                    const query = "INSERT INTO `lead` SET ?";
    
                    const promises = results.map(async (row) => {
                        // Transform row object properties to match column names
                        const data = Object.keys(row).reduce((acc, key) => {
                            const normalizedKey = key
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .replace(/\s/g, "")
                                .replace(/\$/g, "");
                            
                            // Date format
                            if (moment(row[key], 'DD/MM/YYYY', true).isValid()) {
                                acc[normalizedKey] = moment(row[key], 'DD/MM/YYYY').format('YYYY-MM-DD');
                            } else if (moment(row[key], 'DD/M/YYYY', true).isValid()) {
                                acc[normalizedKey] = moment(row[key], 'DD/M/YYYY').format('YYYY-MM-DD');
                            } else if(moment(row[key], 'D/M/YYYY', true).isValid()) {
                                acc[normalizedKey] = moment(row[key], 'D/M/YYYY').format('YYYY-MM-DD');
                            } else if (moment(row[key], 'D/MM/YYYY', true).isValid()) {
                                acc[normalizedKey] = moment(row[key], 'D/MM/YYYY').format('YYYY-MM-DD');
                            } else {
                                acc[normalizedKey] = row[key].replace(/[^\x00-\x7F]/g, "");
                            }
                            
                            return acc;
                        }, {});
    
                        try {
                            console.log("Dentro de promise para fila:", data);
                            const result = await new Promise((resolve, reject) => {
                                db.query(query, data, (error, results, fields) => {
                                    if (error) {
                                        console.error("Error storing data in database:", error);
                                        reject(error);
                                    } else {
                                        console.log("Query successful for data:", data);
                                        resolve(results);
                                    }
                                });
                            });
                            return result;
                        } catch (error) {
                            console.error("Promise error:", error);
                            throw error;
                        }
                    });
    
                    try {
                        const allResults = await Promise.all(promises);
                        // Delete the CSV file after saving to the database
                        fs.unlinkSync(`public/uploads/${this.name}`);
                        console.log("All promises resolved successfully");
                        resolve(allResults);  // Resuelve la promesa con los resultados del CSV
                    } catch (error) {
                        console.error("Promise.all error:", error);
                        reject(error);
                    }
                })
                .on("error", (error) => {
                    console.error("CSV parsing error:", error);
                    reject(error);
                });
        });
    }
    
    
    

    static fetchAll() {
        return db.execute("SELECT * FROM csv");
    }

    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        }
        return this.fetchAll();
    }

    static fetchOne(id) {
        return db.execute("SELECT * FROM csv WHERE idCSV = ?", [id]);
    }
};
