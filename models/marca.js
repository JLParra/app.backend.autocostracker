const { Schema, model } = require("mongoose");

const MarcaSchema = new Schema({
    nombre: {
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

module.exports = model('Marca', MarcaSchema);


