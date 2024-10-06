import express from "express";
import MongoStore from "connect-mongo";
import "dotenv/config";
import passport from 'passport'
import session from "express-session";

import routerProductos from "./src/routers/productos-router.js";
import routerUsuarios from "./src/routers/user-router.js";
import handleConnection from "./src/utils/handle-connection.js";

//! Constantes
const app = express();
const PORT = process.env.PORT || 8888;
const NODE_ENV = process.env.NODE_ENV;
const MONGO_LOCAL = process.env.MONGO_LOCAL;
const MONGO_REMOTO = process.env.MONGO_REMOTO;
const SECRET_SESSION = process.env.SECRET;

//! Middlewares
app.use(express.static("./public"));
app.use(express.static("./views"));
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

// ! Configuracion express-sessions
app.use(
  session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_REMOTO }),
  }),
);

//! Configurando Passport
app.use(passport.initialize())
app.use(passport.session())

//! Rutas
//?PRODUCTOS
app.use("/api/productos", routerProductos);

//?USUARIOS
app.use("/", routerUsuarios);
/* //* Cargar Producto Apunte
app.get("/cargarApunte", (req, res) => {
    res.sendFile("./loadProductApunte.html", {root: "views"})
})

//* Cargar Porducto Libro
app.get("/cargarLibro", (req, res) => {
    res.sendFile("./loadProductLibro.html", {root: "views"})
}) */

//! Arranque del servidor

app.listen(PORT, (err) => {
  if (err) throw new Error(`No se pudo levantar el servidor ${err}`);
  console.log(`La aplicaión arrancó -> http://localhost:${PORT}`);
  if (NODE_ENV === "desarrollo") {
    handleConnection(MONGO_REMOTO);
  } else {
    handleConnection(MONGO_LOCAL);
  }
});
