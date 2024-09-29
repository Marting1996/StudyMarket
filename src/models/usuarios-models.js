import usuarios from "../db/users.js";

let usuarioId = Date.now();

const obtenerTodosLosUsuarios = () => {
  return usuarios;
};

const obtenerUsuarioPorId = (id) => {
  const usuario = usuarios.find((user) => user.id === id);
  return usuario;
};
const obtenerUsuarioPorEmail = (email) => {
  const usuario = usuarios.find((user) => user.email === email);
  return usuario;
};

const obteneterLaPosicionDelUsuario = (id) => {
  const usuario = usuarios.find((user) => user.id === id);

  return usuario;
};

const crearUsuario = (usuario) => {
  usuario.id = usuarioId;
  usuarios.push(usuario);
  return usuario;
};

const actualizarUsuario = (index, id, usuarioPorEditar) => {
    usuarioPorEditar.id = id
    usuarios.splice(index, 1, usuarioPorEditar)
    return usuarioPorEditar
}

const eliminarUsuario = (index) => {
    const arrayUsuariosEliminados = usuarios.splice(index, 1)
    const usuarioEliminado = arrayUsuariosEliminados[0]
    return usuarioEliminado
}

export default {
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId,
    obtenerUsuarioPorEmail,
    obteneterLaPosicionDelUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}