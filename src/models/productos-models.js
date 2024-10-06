import productos from "../db/productos.js";
import mongoose from "mongoose";
import productosEsquema from "./schemas/productos.schemas.js";

const ProductoModelo = mongoose.model("productos", productosEsquema)
let productoId = Date.now();

const obtenerTodosLosProductos = () => {
   return productos;
};

const obtenerProductosPorId = (id) => {
   const producto = productos.find((prod) => prod.id === id);
   return producto;
};

const obtenerLaPosicionDelProducto = (id) => {
   return productos.findIndex((prod) => prod.id === id);
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

const actualizarProducto = (index, id, productoPorEditar) => {
   productoPorEditar.id = id;
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
