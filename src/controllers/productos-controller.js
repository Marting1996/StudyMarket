import modelProductos from "../models/productos-models.js";

//!GET ALL
const getAll = async (req, res) => {
  try {
    const productos = await modelProductos.obtenerTodosLosProductos()
    res.json(productos)
  } catch (error) {
   // console.log("[getAll]", error);

    res.status(404).json({ mensaje: "No se encontraron los productos" });
  }
};

//!GET ONE
const getOne = async (req, res) => {
  const  {pid}  = req.body
  
  //console.log('[getOne]', pid);
  
  try {
    const unProducto = await modelProductos.obtenerProductosPorId(pid);
    //console.log("[getOne] producto:", unProducto);
    
  
    if (unProducto) {
      res.json(unProducto);
    } else {
      res.status(404).json({ mensaje: "Producto no disponible" });
    }
  } catch (error) {
    console.log("[getOne]", error);
    res.status(500).json({ mensaje: "Error al obtener el producto" });
  }
};

//!CREATE
const createProduct = async (req, res) => {
  const producto = req.body;
  const { nombre, descripcion, precio, imagen, categoria } = producto;
  const errores = [];
  console.log(producto);
  
  try {
    //Validadores
    if (!nombre || !precio || !descripcion || !imagen || !categoria) {
      errores.push({ mensaje: "Los campos Nombre y Precio son obligatorios" });
    }

    if (errores.length > 0) {
      return res.status(400).json(errores);
    }

    //Crear producto
    const productoCreado = await modelProductos.crearProducto(producto);
    console.log("Producto creado con exito:", productoCreado);
    
    res.json(productoCreado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "No se pudo crear el producto" });
  }
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
      productoPorEditar,
    );
    res.json(productoActualizado);
    console.log("Producto actualizado correctamente");
  } else {
    res.status(404).json({
      mensaje: "No se encontro el producto solicitado para editar",
    });
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
    res.status(404).json({
      mensaje: "No se encontro el producto para eliminarlo",
    });
  }
};

export default {
  getAll,
  getOne,
  createProduct,
  editProducto,
  removeProducto,
};
