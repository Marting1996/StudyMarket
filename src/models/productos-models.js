import productos from "../db/productos.js"; 

let productoId = Date.now();

const obtenerTodosLosProductos = () => {
    return productos
}

const obtenerProductosPorId = (id) => {
    const producto = productos.find((prod) => prod.id === id)
    return producto
}

const obtenerLaPosicionDelProducto = (id) => {
    return productos.findIndex((prod) => prod.id === id) 
}

const crearProducto = (producto) => {
    producto.id = productoId
    productos.push(producto)
    return producto
}

const actualizarProducto = (index, id, productoPorEditar) => {
    productoPorEditar.id = id
    productos.splice(index, 1, productoPorEditar)
    return productoPorEditar
}

const eliminarProducto = (index) => {
    const arrayProductosEliminados = productos.splice(index, 1)
    const productoEliminado = arrayProductosEliminados[0]
    return productoEliminado
}

export default {
    obtenerTodosLosProductos,
    obtenerProductosPorId,
    obtenerLaPosicionDelProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}