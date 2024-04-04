const db = require('../util/db/db');

module.exports = class CSV {
    constructor(fName) {
        this.name = fName;
    }

    save(results) {
        const query = `INSERT INTO leads SET ?`;
        // Assuming connection is already established somewhere
        connection.query(query, results, (error, results, fields) => {
            if (error) {
                console.error('Error storing data in database:', error);
            }
        });
    }
}