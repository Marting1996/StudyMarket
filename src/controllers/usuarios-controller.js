import modelUsuarios from "../models/usuarios-models.js";

//!GET ALL
const getAll = (req, res) => {
  const usuarios = modelUsuarios.obtenerTodosLosUsuarios();
  res.json(usuarios);
};

//!GET ONE BY ID
const getUserById = (req, res) => {
  const id = Number(req.params.id);

  const unUsuario = modelUsuarios.obtenerUsuarioPorId(id);

  if (unUsuario) {
    res.json(unUsuario);
  } else {
    res.status(404).json({ mensaje: "No se encontro el usuario por id" });
  }
};

//!GET ONE BY EMAIL
const getUserByEmail = (req, res) => {
  const id = Number(req.params.email);

  const unUsuario = modelUsuarios.obtenerUsuarioPorEmail(email);

  if (unUsuario) {
    res.json(unUsuario);
  } else {
    res.status(404).json({ mensaje: "No se encontro el usuario por email" });
  }
};

//!CREATE
const createUser = (req, res) => {
  const usuarioPorCrear = req.body;

  const usuarioCreado = modelUsuarios.crearUsuario(usuarioPorCrear);

  res.status(201).json(usuarioCreado);
  console.log("Usuaio creado correctamente");
};

//!EDIT
const editUsuatio = (req, res) => {
    const id = Number(req.params.id)
    const usuarioPorEditar = (req.body)

    const index = modelUsuarios.obteneterLaPosicionDelUsuario(id)

    if(index >= 0) {
        const usuarioActualizado = modelUsuarios.actualizarUsuario(index, id, usuarioPorEditar)
        res.json(usuarioActualizado)
        console.log('Usuario actualizado correctamente');
        
    } else {
        res.status(404).json({mensaje:" No se encontro el usuario"})
    }
}

//!REMOVE
const eliminarUsuario = (req, res) => {
    const id = Number(req.params.id)

    const index = modelUsuarios.obteneterLaPosicionDelUsuario(id)

    if(index >= 0) {
        const usuarioEliminado = modelUsuarios.eliminarUsuario(index)
        res.json(usuarioEliminado)
        console.log("Usuario eliminado correctamente");
        
    } else {
        res.status(404).json({mensaje:"No se encontro el usuario"})
    }
}

export default {
    getAll,
    getUserByEmail,
    getUserById,
    createUser,
    editUsuatio,
    eliminarUsuario
}
