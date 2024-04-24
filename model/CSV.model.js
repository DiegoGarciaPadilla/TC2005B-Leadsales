const fs = require("fs");

const csvParser = require("csv-parser");

const moment = require("moment");

const db = require("../util/db/db");

module.exports = class CSV {
    constructor(fName) {
        this.name = fName;
    }

    save() {
        const results = [];
        fs.createReadStream(`public/uploads/${this.name}`) // Read the CSV file, NOT CREATE
            .pipe(csvParser())
            .on("data", (data) => results.push(data))
            .on("end", () => {
                console.log(results);
                const query = "INSERT INTO `lead` SET ?";
                results.forEach((row) => {
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
                        }
                        else {
                            // acc[normalizedKey] = row[key];
                            // Replace emojis with empty string and assign to acc[normalizedKey]
                            acc[normalizedKey] = row[key].replace(/[^\x00-\x7F]/g, "");
                        }
                        
                        return acc;
                    }, {});

                    db.query(query, data, (error) => {
                        if (error) {
                            console.error(
                                "Error storing data in database:",
                                error
                            );
                        }
                    });
                });

                // Delete the CSV file after saving to the database
                fs.unlinkSync(`public/uploads/${this.name}`);
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
