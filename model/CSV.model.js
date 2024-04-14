const fs = require("fs");

const csvParser = require("csv-parser");

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
                        acc[normalizedKey] = row[key];
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
                // Save CSV file to database
                // db.execute('INSERT INTO csv (name) VALUES (?)', [this.name]);

                // Delete the CSV file after saving to the database
                fs.unlinkSync(`public/uploads/${this.name}`);
            });
    }

    static fetchAll() {
        return db.execute("Select * from csv");
    }

    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        }
        return this.fetchAll();
    }

    static fetchOne(id) {
        return db.execute("Select * from csv WHERE idCSV = ?", [id]);
    }
};
