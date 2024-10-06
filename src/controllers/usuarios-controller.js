import modelUsuarios from "../models/usuarios-models.js";

const formularioRegistro = (req, res) => {
  res.render("usuarios/register");
};

//!GET ALL
const getAll = async (req, res) => {
  try {
    const usuarios = await modelUsuarios.obtenerTodosLosUsuarios()
    res.json(usuarios)
  } catch (error) {
    console.log(error);
    
    res.status(404).json({mensaje: "No se encontraron los usuarios"})
  }
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

//!REGISTER
const createUser = async (req, res) => {
  const usuario = req.body;

  const { name, email, password, confirm_password } = usuario;
  const errores = [];
  try {
    // Validadores
    if (!name || !email || !password || !confirm_password) {
      errores.push({ mensaje: "Todos los campos son obligatorios" });
    }

    if (!name || name.trim().length < 2) {
      errores.push({ mensaje: "El nombre debe tener al menos 2 caracteres" });
    }

    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!nameRegex.test(name)) {
      errores.push({
        mensaje: "El nombre solo puede contener letras y espacios",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errores.push({ mensaje: "El correo electrónico no es válido" });
    }

    if (password ==! confirm_password) {
      errores.push({ mensaje: "Las contraseñas no coinciden" });
    }

    /* const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      errores.push({
        mensaje:
          "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial",
      });
    } */

    /* const weakPasswords = ["123456", "password", "qwerty", "admin"];

    if (weakPasswords.includes(password)) {
      errores.push({
        mensaje: "La contraseña es demasiado común, elige una más segura",
      });
    } */
    /* if (password.length > 30) {
      errores.push({
        mensaje: "La contraseña no puede tener más de 30 caracteres",
      });
    } */
    const usuarioEncontrado = await modelUsuarios.obtenerUsuarioPorEmail(email);

    if (usuarioEncontrado) {
      errores.push({ mensaje: "Ya existe un usuario con este correo" });
    }

    if (errores.length > 0) {
      return res.status(400).json(errores);
    }

    // Crear usuarios
    const usuarioCreado = await modelUsuarios.crearUsuario(usuario);

    const objRespuesta = {
      name: usuarioCreado.name,
      email: usuarioCreado.email,
      id: usuarioCreado._id,
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
