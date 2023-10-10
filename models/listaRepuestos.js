const { Schema, model } = require("mongoose");

const ListaRepuestosSchema = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    estado: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Estado'
    },

});

module.exports = model('ListaRepuestos', ListaRepuestosSchema);


