import express from 'express'
import controladorUsuarios from '../controllers/usuarios-controller.js'
const routerUsuarios = express.Router()

//!READ ALL
routerUsuarios.get('/', controladorUsuarios.getAll)

//!READ ONE BY ID
routerUsuarios.get('/:id', controladorUsuarios.getUserById)

//!READ ONE BY EMAIL
routerUsuarios.get('/:id', controladorUsuarios.getUserByEmail)

//!REGISTER
routerUsuarios.post('/api/auth/register', controladorUsuarios.createUser)

//!UPDATE
routerUsuarios.put('/:id', controladorUsuarios.editUsuatio)

//!DELETE
routerUsuarios.delete('/:id', controladorUsuarios.eliminarUsuario)

//!OTRAS
routerUsuarios.all('*', (req, res) => {
    res.status(404).json({mensaje: "Recurso no encontrado"})
})

export default routerUsuarios