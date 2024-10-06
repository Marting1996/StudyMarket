import express from 'express'
import controladorProductos from '../controllers/productos-controller.js'
const routerProductos = express.Router()

//!READ ALL
routerProductos.get('/', controladorProductos.getAll)

//!READ ONE
routerProductos.get('/:id', controladorProductos.getOne)

//!CREATE
routerProductos.post('/api/productos/crearapunte', controladorProductos.createProduct)

//!UPDATE
routerProductos.put('/:id', controladorProductos.editProducto)

//!DELETE
routerProductos.delete('/:id', controladorProductos.removeProducto)

//!OTRAS
routerProductos.all('*', (req, res) => {
    res.status(404).json({mensaje: "Recurso no encontrado"})
})

export default routerProductos