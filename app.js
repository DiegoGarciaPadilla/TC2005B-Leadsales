const express = require("express");
const multer = require('multer');
const csrf = require("csurf");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const routes = require("./routes/.routes");
const usuariosRoutes = require("./routes/usuarios.routes");
const ajustesRoutes = require("./routes/ajustes.routes");
const leadsRoutes = require("./routes/leads.routes");
const reportesRoutes = require("./routes/reportes.routes");

const app = express();

app.use(express.static("public"));

// Cookie parser

app.use(cookieParser());

// Sesión

app.use(session({
    secret: 'Mario',
    resave: false,
    saveUninitialized: false,
}));

// Body parser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Motor de plantillas
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
        callback(null, file.originalname, '-', Date.now(), '.csv');
    },
});

app.use(multer({ storage: fileStorage }).single("file"));

// Protección CSRF
const csrfProtection = csrf({ cookie: true});
app.use(csrfProtection);

// app.use(express.static(path.join(__dirname, "public")));

// Rutas

// Usar rutas
app.use("/usuarios", usuariosRoutes);
app.use("/ajustes", ajustesRoutes);
app.use("/directorio", leadsRoutes);
app.use("/historial", reportesRoutes);
app.use("/", csrfProtection, routes);

// Levantar el servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
