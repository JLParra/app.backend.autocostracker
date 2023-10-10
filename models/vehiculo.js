const { Schema, model } = require("mongoose");

const VehiculoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    marca: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Marca'
    },
    modelo: {
        type: String,
        required: true
    },
    anio: {
        type: String,
        required: true
    },
    alias: {
        type: String,
    },
    fuenteIngreso: {
        type: Boolean,
        required: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fechaRegistro: {
        required: true ,
        type: Date,
    },
    estado: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Estado'
    },

});

module.exports = model('Vehiculo', VehiculoSchema);


