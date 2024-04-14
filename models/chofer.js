const { Schema, model } = require("mongoose");

const ChoferSchema = new Schema({
    vehiculo: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo'
    },
    img: {
        required: false,
        type: String,
    },
    cedula: {
        required: true ,
        type: String,
    },
    nombres: {
        type: String,
        required: true
    },

    nacionalidad: {
        type: String,
        required: false
    },
    convencional: {
        type: String,
        required: false
    },
    celular: {
        type: String,
        required: true
    },
    whatsapp:{
        type: String,
        required: true
    },
    emergencia: {
        type: String,
        required: true
    },
    parentezco: {
        type: String,
        required: false
    },
    fechaIngresoLaboral: {
        required: true ,
        type: Date,
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

// Definir índices únicos para cedula y nombres
ChoferSchema.index({ cedula: 1, nombres: 1 }, { unique: true });

module.exports = model('Chofer', ChoferSchema);


