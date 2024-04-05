const express = require("express");


const ejs = require("ejs");

const app = express();

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
const configRoutes = require("./routes/config.routes");

// Usar rutas

app.use("/users", usuariosRoutes);
app.use("/config", configRoutes);
app.use("/", routes);

// Levantar el servidor

app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
