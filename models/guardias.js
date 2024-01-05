const { Schema, model } = require("mongoose");

const GuardiaSchema = new Schema({
    fechaRegistro: {
        required: true ,
        type: Date,
    },
    fechaPago: {
        required: true ,
        type: Date,
    },
    diaPagado:{
        required: true ,
        type: Date,
    },
    libre: {
        type: Boolean,
        required: false
    },
    valorEntregado: {
        type: Number,
        required: true
    },
    valorPendiente: {
        type: Number,
        required: true
    },
    estado: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Estado'
    },

    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    
});

module.exports = model('Guardia', GuardiaSchema);


