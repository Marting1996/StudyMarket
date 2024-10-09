import { Strategy } from "passport-local";
import usuariosModels from "../models/usuarios-models";
import passport  from "passport";


const fieldEstrategia = { usernameField: 'email'}

const comprobacionUsuario = async (email, password, done) => {
    try {
        const usuario = await usuariosModels.obtenerUsuarioPorEmail(email)

        if(!usuario) {
            return done(null, false, {mensaje: "El usuario no existe"})
        }
        
        const passwordCorrecto = await usuariosModels.revisarPassword(usuario, password)

        if(!passwordCorrecto) {
            return done(null, false, {mensaje: "La contraseña es incorrecta"})
        }

        return done(null, usuario)
    } catch (error) {
        throw error
    }
}

const estrategiaLocal = new Strategy(fieldEstrategia, comprobacionUsuario)

passport.serializeUser((usuario, done) => {
    done(null,usuario.id)
})

passport.deserializeUser(async (id, done) => {
    const usuario = await usuariosModels.obtenerUsuarioPorId(id)
    done(null, usuario)
})

export default passport.use(estrategiaLocal)