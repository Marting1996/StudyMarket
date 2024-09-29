import express from "express";
import "dotenv/config";
import routerProductos from "./src/routers/productos-router.js";

//! Constantes
const app = express();
const PORT = process.env.PORT || 8888;

//! Middlewares
app.use(express.static("./public"));
app.use(express.static("./views"));
app.use(express.json());

//! Rutas
//* Inicio
app.get('/', (req, res) => {
    res.sendFile("./index.html", {root: 'public'})
})

//* Carrito
app.get("/carrito", (req, res) => {
  res.sendFile("./carrito.html", { root: "views" });
});

//* Sobre nosotros
app.get("/sobreNosotros", (req, res) => {
  res.sendFile("./sobreNosotos.html", { root: "views" });
});

//* Forgot pass
app.get("/forgotPass", (req, res) => {
    res.sendFile("./forgotpass.html", { root: "views"})
})

//* Login
app.get("/login", (req, res) => {
    res.sendFile("./login.html", {root: "view"})
})

//* Perfil
app.get("/perfil", (req, res) => {
    res.sendFile("./perfil.html", { root: "views" });
});

//* Publicacion 
app.get("/publicacion", (req, res) => {
    res.sendFile("./publicacion.html", {root: "views"})
})

//* Registrarse
app.get("/registrarse", (req, res) => {
    res.sendFile("./registrarse.html", {root: "views"})
})

//* Reset pass
app.get("/resetPass", (req, res) => {
    res.sendFile("./resetPass.html", {root: "views"})
})

//?PRODUCTOS
app.use('/api/productos', routerProductos)
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
});
