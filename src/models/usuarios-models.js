import mongoose from "mongoose";
import usuariosEsquema from "./schemas/usuarios.schemas.js";


const UsuarioModelo = mongoose.model("usuarios", usuariosEsquema);

let usuarioId = Date.now();

const obtenerTodosLosUsuarios = async () => {
  try {
    const usuarios = await UsuarioModelo.find()
    return usuarios
  } catch (error) {
    throw error
  }

};

const obtenerUsuarioPorId = (id) => {
  const usuario = usuarios.find((user) => user.id === id);
  return usuario;
};
const obtenerUsuarioPorEmail = async (email) => {
  try {
    const usuarioEncontrado = await UsuarioModelo.findOne({ emal: email });
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
};
