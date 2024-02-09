const mongoose = require('mongoose');

// Define el esquema para las fechas de los feriados
const FechaFeriadoSchema = new mongoose.Schema({
    feriado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feriado',
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: false
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'], // Solo permite estos valores
        default: 'activo' // Valor por defecto
    }
});

// Crea y exporta el modelo FechaFeriado basado en el esquema
module.exports = mongoose.model('FechaFeriado', FechaFeriadoSchema);
