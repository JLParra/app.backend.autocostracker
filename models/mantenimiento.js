const { Schema, model } = require("mongoose");


const MantenimientoSchema = new Schema({
    fechaRegistro:Date,
    fechaIngreso: Date,
    fechaSalida: Date,
    horaDescontar: Number,
    valorDescontar: Number,
    Observaciones:String,
    Vehiculo: { type: Schema.Types.ObjectId, ref: 'Vehiculo' },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }, 
});

const MantenimientoDetalleSchema = new Schema({
    
    cambioKM: Number,
    duracionKM: Number,
    precioRepuesto: Number,
    repuestoId: { type: Schema.Types.ObjectId, ref: 'ListaRepuestos' },    
});


module.exports = model('Mantenimiento', MantenimientoSchema);
module.exports = model('MantenimientoDetalle', MantenimientoDetalleSchema);


