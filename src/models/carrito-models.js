import mongoose from "mongoose";
import carritoEsquema from "./schemas/carrito.schema.js";
import modelProductos from "../models/productos-models.js"
import productosController from "../controllers/productos-controller.js";


const CarritoModelo = mongoose.model("carrito", carritoEsquema)

const obtenerTodosLosCarritos = async () => {
    try {
        const carritos = await CarritoModelo.find().lean()
        return carritos
    } catch (error) {
        throw error
    }
}

const obtenerCarritoPorId = async (id) => {
    try {
        const carrito = await CarritoModelo.findById(id)
        return carrito
    } catch (error) {
        console.log("[obtenerCarritoPorId]", error);
        
    }
}

const crearCarrito = async (carrito) => {
    try {
        const carritoCreado = new CarritoModelo(carrito)
        await carritoCreado.save()
        return carritoCreado
    } catch (error) {
        console.log("[crearCarrito]", error);
        
    }
}

const addProductToCart = async (cid, pid, cantidad) => {
    //cid: carrito id
    //pid: producto id
    console.log("[addProductToCart] pid", pid);
    
    try {
        //const producto = await modelProductos.obtenerProductosPorId(pid)
        const producto = await modelProductos.obtenerProductosPorId(pid)
        console.log("Producto en addProductToCart", producto);
        
        if(!producto) {
            throw new Error('Producto no encontrado')
        }
        const carrito = await CarritoModelo.findById(cid)
        const productoExistente = carrito.productos.find((producto) => producto.producto.toString() === pid)

        if(productoExistente) {
            productoExistente.cantidad = cantidad
        } else {
            carrito.productos.push({
                producto: pid,
                cantidad,
                titulo: producto.titulo,
                precio: producto.precio
            })
        }
        await carrito.save()

        const populateCart = await CarritoModelo.findById(cid).populate('productos.producto').lean()
        return populateCart
    } catch (error) {
        console.log('[addProductToCart]', error);
        throw error
    }
}

export default {
    obtenerTodosLosCarritos,
    obtenerCarritoPorId,
    crearCarrito,
    addProductToCart
}