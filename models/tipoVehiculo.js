const { Schema, model } = require("mongoose");

const TipoVehiculoSchema = new Schema({
    img: {
        type: String,
        required: false
    },
    descripcion: {
        type: String,
        required: true
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

module.exports = model('TipoVehiculo', TipoVehiculoSchema);


