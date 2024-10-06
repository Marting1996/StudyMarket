import mongoose from "mongoose";

const productosEsquema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      require: true,
    },
    descripcion: {
      type: String,
    },
    etiquetas: {
      type: String,
    },
    precio: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default productosEsquema
