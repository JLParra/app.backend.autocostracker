const { Schema, model } = require("mongoose");

const EstadoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

});

module.exports = model('Estado', EstadoSchema);


