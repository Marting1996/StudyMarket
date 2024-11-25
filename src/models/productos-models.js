import mongoose from "mongoose";
import productosEsquema from "./schemas/productos.schemas.js";

const ProductoModelo = mongoose.model("productos", productosEsquema)
let productoId = Date.now();

const obtenerTodosLosProductos = async () => {
   try {
      const productos = await ProductoModelo.find()
      console.log(productos);
      
      return productos
   } catch (error) {
      console.log("[obtenerTodosLosProductos]", error);
      
   }
};

const obtenerProductosPorId = async (pid) => {
   //console.log("[obtenerProductosPorId] pid:", pid); 
   try {
     const producto = await ProductoModelo.findById(pid);
     //console.log("[obtenerProductosPorId] producto:", producto);
     
     return producto;
   } catch (error) {
     console.log("[obtenerProductosPorId]", error);
     throw error;
   }
 };

const obtenerLaPosicionDelProducto = (pid) => {
   return productos.findIndex((prod) => prod.pid === pid);
};

const crearProducto =  async (producto) => {
   try {
      const productoCreado = new ProductoModelo(producto)
      await productoCreado.save()
      return productoCreado
   } catch (error) {
      throw error
   }
};

const actualizarProducto = (index, pid, productoPorEditar) => {
   productoPorEditar.pid = pid;
   productos.splice(index, 1, productoPorEditar);
   return productoPorEditar;
};

const eliminarProducto = (index) => {
   const arrayProductosEliminados = productos.splice(index, 1);
   const productoEliminado = arrayProductosEliminados[0];
   return productoEliminado;
};

export default {
   obtenerTodosLosProductos,
   obtenerProductosPorId,
   obtenerLaPosicionDelProducto,
   crearProducto,
   actualizarProducto,
   eliminarProducto,
};
