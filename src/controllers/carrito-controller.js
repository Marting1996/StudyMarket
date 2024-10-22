import modelCarrito from "../models/carrito-models.js";
import productosModels from "../models/productos-models.js";

//! GET ALL
const getAll = (req, res) => {
  const carritos = modelCarrito.obtenerTodosLosCarritos();
  res.json(carritos);
};

//! GET ONE
const getOne = (req, res) => {
  const id = Number(req.params.id);
  const carrito = modelCarrito.obtenerCarritoPorId(id);

  if (carrito) {
    res.json(carrito);
  } else {
    res.status(404).json({ mensaje: "Carrito no encontrado" });
  }
};

//! AÑADIR PRODUCTO AL CARRITO

const addProductToCartController = async (req, res) => {
    try {
       const {pid, cantidad} = req.body
       if (!pid || !cantidad) {
        return res.status(400).json({mensaje: 'Producto y cantidad son requeridos'})
       }
       const cid = "67156e350a6006a8d9fc5735"

       const carritoActualizado = await modelCarrito.addProductToCart(cid, pid, cantidad)

       return res.json(carritoActualizado)
    } catch (error) {
        console.log('[addProductToCartController]', error);
        return res.status(500).json({mensaje: "Error al agregar producto al carrito"})
        
    }
}

export default {
    getAll,
    getOne,
    addProductToCartController
}