const CSV = require('../model/CSV.model');

/* ========== CU. 26 IMPORTA DATOS DE LEADS | Sebas Colin =============== */

exports.post_CSV = (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    if (!req.file) {
        return res.render('home', { msg: 'Error: No file selected!' });
    }

    const mi_csv = new CSV(req.file.filename);

    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        mi_csv.save(results); // Pass req and res to handle response and rendering
        // Delete uploaded CSV file
        fs.unlinkSync(req.file.path);
        res.render('home', { msg: 'File uploaded successfully!', file: req.file.path });
      });
}

/* ========================== FIN CU. 26 ==============================  */