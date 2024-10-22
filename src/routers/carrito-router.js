import express from 'express'
import controladorCarrito from '../controllers/carrito-controller.js'

const routerCarrito = express.Router()

//!READ ALL
routerCarrito.get('/', controladorCarrito.getAll)

//!READ ONE
routerCarrito.get('./:id', controladorCarrito.getOne)

//! AÑADIR PRODUCTO
// cid: cart id
//pid: product id
routerCarrito.post('/add-product', controladorCarrito.addProductToCartController)

export default routerCarrito