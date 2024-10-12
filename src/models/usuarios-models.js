import mongoose from "mongoose";
import usuariosEsquema from "./schemas/usuarios.schemas.js";

const UsuarioModelo = mongoose.model("usuarios", usuariosEsquema);

const obtenerTodosLosUsuarios = async () => {
  try {
    const usuarios = await UsuarioModelo.find()
    return usuarios
  } catch (error) {
    throw error
  }

};

const obtenerUsuarioPorId = async (id) => {
  
  try {
    const usuario = await UsuarioModelo.findById(id)
    return usuario
  } catch (error) {
    console.log("[obtenerUsuarioPorId]", error);
    
  }
  
};
const obtenerUsuarioPorEmail = async (email) => {
  try {
    const usuarioEncontrado = await UsuarioModelo.findOne({ email: email });
    console.log("[usuarioEncontradoPorEmail]", usuarioEncontrado);
    
    return usuarioEncontrado;
  } catch (error) {
    throw error;
  }
};

const obteneterLaPosicionDelUsuario = (id) => {
  const usuario = usuarios.find((user) => user.id === id);

  return usuario;
};

const crearUsuario = async (usuario) => {
  try {
    const usuarioCreado = new UsuarioModelo(usuario);
    usuarioCreado.password = await usuarioCreado.encriptarPassword(
      usuario.password,
    );

    await usuarioCreado.save();
    return usuarioCreado;
  } catch (error) {
    throw error;
  }
};

const revisarPassword = async (usuario, password) => {
  try {
    const isMatch = await usuario.comprobarPassword(password)
    return isMatch
  } catch (error) {
    throw error
  }
}

const actualizarUsuario = (index, id, usuarioPorEditar) => {
  usuarioPorEditar.id = id;
  usuarios.splice(index, 1, usuarioPorEditar);
  return usuarioPorEditar;
};

const eliminarUsuario = (index) => {
  const arrayUsuariosEliminados = usuarios.splice(index, 1);
  const usuarioEliminado = arrayUsuariosEliminados[0];
  return usuarioEliminado;
};

export default {
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  obtenerUsuarioPorEmail,
  obteneterLaPosicionDelUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  revisarPassword
};
