const db = require('../util/db/db');
const fs = require('fs');
const csvParser = require('csv-parser');

module.exports = class CSV {
    constructor(fName) {
        this.name = fName;
    }

    save() {
        const results = [];
        fs.createReadStream(`public/uploads/${this.name}`)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                const query = `INSERT INTO lead SET ?`;
                results.forEach((row) => {
                    db.query(query, row, (error, results, fields) => {
                        if (error) {
                            console.error('Error storing data in database:', error);
                        }
                    });
                });
                // Delete the CSV file after saving to the database
                fs.unlinkSync(`public/uploads/${this.name}`);
            });
    }

    static fetchAll() {
        return db.execute('Select * from csv')
    }

    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    }
    static fetchOne(id) {
        return db.execute('Select * from csv WHERE idCSV = ?', [id]);
    }

}