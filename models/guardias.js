const { Schema, model } = require("mongoose");

const GuardiaSchema = new Schema({
    vehiculo: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo'
    },
    montoDiario: {
        required: true ,
        type: Number,
    },
    valorPendiente: {
        required: true ,
        type: Number,
    },
    fechaActual: {
        required: true ,
        type: Date,
    },
    diaPagado: {
        required: true ,
        type: Date,
    },
    estado: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Estado'
    },
    abonando: {
        type: Boolean,
        required: false
    },
    mantenimiento: {
        type: Boolean,
        required: false
    },
    feriado: {
        type: Boolean,
        required: false
    }, 
    usuario: {
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    // abonos: [
    //     { 
    //         type:Schema.Types.ObjectId, 
    //         ref: 'Abono' }
    // ], // Cambiado a un arreglo de referencias a Abono
    
});



module.exports = model('Guardia', GuardiaSchema);


