const { Schema, model } = require("mongoose");


const AbonoSchema = new Schema({
    
    fechaAbono: Date,
    valorAbono: Number,
    valorPendiente: Number,
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },  
    guardia: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Guardia'
    },  
});


module.exports = model('Abono', AbonoSchema);


