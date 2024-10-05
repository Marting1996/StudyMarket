import modelUsuarios from "../models/usuarios-models.js";

const formularioRegistro = (req, res) => {
  res.render("usuarios/register")
}

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
const createUser = async (req, res) => {
  const usuario = req.body;

  const { name, email, password, confirm_password } = usuario;
  const errores = [];
  try {
    // Validadores
    if ((password = !confirm_password)) {
      errores.push({ mensaje: "Las contraseñas no coinciden" });
    }
    const usuarioEncontrado = await modelUsuarios.obtenerUsuarioPorEmail(email);

    if (usuarioEncontrado) {
      errores.push({ mensaje: "Ya existe un usuario con este correo" });
    }

    if (errores.length > 0) {
      return res.status(400).json(erroes);
    }

    // Crear usuarios
    const usuarioCreado = await modelUsuarios.crearUsuario(usuario);

    const objRespuesta = {
      name: usuarioCreado.name,
      email: usuarioCreado.email,
      id: usuarioCreado_id,
    };

    res.json(objRespuesta);
  } catch (error) {
    console.log(error);

    res.status(500).json({ mensaje: "No se pudo registrar el usuario" });
  }
};

//!EDIT
const editUsuatio = (req, res) => {
  const id = Number(req.params.id);
  const usuarioPorEditar = req.body;

  const index = modelUsuarios.obteneterLaPosicionDelUsuario(id);

  if (index >= 0) {
    const usuarioActualizado = modelUsuarios.actualizarUsuario(
      index,
      id,
      usuarioPorEditar,
    );
    res.json(usuarioActualizado);
    console.log("Usuario actualizado correctamente");
  } else {
    res.status(404).json({ mensaje: " No se encontro el usuario" });
  }
};

//!REMOVE
const eliminarUsuario = (req, res) => {
  const id = Number(req.params.id);

  const index = modelUsuarios.obteneterLaPosicionDelUsuario(id);

  if (index >= 0) {
    const usuarioEliminado = modelUsuarios.eliminarUsuario(index);
    res.json(usuarioEliminado);
    console.log("Usuario eliminado correctamente");
  } else {
    res.status(404).json({ mensaje: "No se encontro el usuario" });
  }
};

export default {
  getAll,
  getUserByEmail,
  getUserById,
  createUser,
  editUsuatio,
  eliminarUsuario,
};
