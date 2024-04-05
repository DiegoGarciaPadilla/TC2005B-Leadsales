const express = require("express");
const ejs = require("ejs");
const app = express();
const multer = require('multer');
const fs = require('fs');
const csvParser = require('csv-parser');
const port = 3000;

app.use(express.static("public"));

// Body parser
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Motor de plantillas
const path = require("path");
app.set("view engine", "ejs");
app.set("views", "views");

// fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
  destination: (request, file, callback) => {
      // 'public/uploads': Es el directorio del servidor donde se subirán los archivos 
      callback(null, 'public/uploads');
  },
  filename: (request, file, callback) => {
      // aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
      // para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
      callback(null, file.originalname + '-' + Date.now() + '.csv');
  },
});

app.use(multer({storage: fileStorage }).single("file")); 

// Sesión
const session = require("express-session");

app.use(session({
  secret: 'Mario',
  resave: false,
  saveUninitialized: false,
}))

// app.use(express.static(path.join(__dirname, "public")));

// Rutas
const routes = require("./routes/.routes.js");
const usuariosRoutes = require("./routes/usuarios.routes.js");

// Usar rutas
app.use("/users", usuariosRoutes);
app.use("/", routes);

// Levantar el servidor
app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:", port);
});
