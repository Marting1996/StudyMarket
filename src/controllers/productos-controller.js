import modelProductos from "../models/productos-models.js";

//!GET ALL
const getAll = (req, res) => {
  const prodoductos = modelProductos.obtenerTodosLosProductos();
  res.json(prodoductos);
};

//!GET ONE
const getOne = (req, res) => {
  const id = Number(req.params.id);

  const unProducto = modelProductos.obtenerProductosPorId(id);

  if (unProducto) {
    res.json(unProducto);
  } else {
    res.status(404).json({ mensaje: "Producto no disponible" });
  }
};

//!CREATE
const createProduct = (req, res) => {
  const productoPorCrear = req.body;

  const productoCreado = modelProductos.crearProducto(productoPorCrear);

  res.status(201).json(productoCreado);
  console.log("Producto creado correctamente");
};

//!EDIT
const editProducto = (req, res) => {
  const id = Number(req.params.id);
  const productoPorEditar = req.body;

  const index = modelProductos.obtenerLaPosicionDelProducto(id);

  if (index >= 0) {
    const productoActualizado = modelProductos.actualizarProducto(
      index,
      id,
      productoPorEditar
    );
    res.json(productoActualizado);
    console.log("Producto actualizado correctamente");
  } else {
    res
      .status(404)
      .json({ mensaje: "No se encontro el producto solicitado para editar" });
  }
};

//!REMOVE
const removeProducto = (req, res) => {
  const id = Number(req.params.id);

  const index = modelProductos.obtenerLaPosicionDelProducto(id);

  if (index >= 0) {
    const productoEliminado = modelProductos.eliminarProducto(index);
    res.json(productoEliminado);
    console.log("Producto eliminado correctamente");
  } else {
    res
      .status(404)
      .json({ mensaje: "No se encontro el producto para eliminarlo" });
  }
};


export default {
    getAll,
    getOne,
    createProduct,
    editProducto,
    removeProducto
}