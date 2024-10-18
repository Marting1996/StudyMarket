import mongoose from "mongoose";

const carritoEsquema = new mongoose.Schema(
    {
        usuario: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "usuarios",
            require: true
        
        },
        productos: [
            {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "productos",
            },
            cantidad: {
                type: Number,
                require: true,
                min: 1,
            },
            },
        ],
    },
    {
        timestamps: true
    }
);

export default carritoEsquema;
