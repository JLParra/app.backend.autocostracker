const mongoose = require('mongoose');

// Define el esquema para los feriados
const FeriadoSchema = new mongoose.Schema({
    anio: {
        type: Number,
        required: true,
        unique: true // Garantiza que no haya dos registros con el mismo año
    }
});

// Crea y exporta el modelo Feriado basado en el esquema
module.exports = mongoose.model('Feriado', FeriadoSchema);