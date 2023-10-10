const { Schema, model } = require("mongoose");

const ValorGuardiaSchema = new Schema({
    valor: {
        type: Number,
        required: true
    },
    vehiculo: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo'
    },
    fechaRegistro: {
        required: true ,
        type: Date,
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

module.exports = model('valorGuardia', ValorGuardiaSchema);


