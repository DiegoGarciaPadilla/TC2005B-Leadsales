const CSV = require('../model/CSV.model');

/* ========== CU. 26 IMPORTA DATOS DE LEADS | Sebas Colin =============== */

exports.post_CSV = (req, res, next) => {
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }
  const csv = new CSV(req.file.filename);
  csv.save();

  res.render("home", {
      msg: 'File uploaded successfully!',
      file: `/uploads/${req.file.filename}`
  });
}

/* ========================== FIN CU. 26 ==============================  */