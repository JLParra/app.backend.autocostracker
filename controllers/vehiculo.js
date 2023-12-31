const { response } = require('express');
const Vehiculo = require('../models/vehiculo');
const moment = require('moment-timezone');




const getVehiculos = async (req, res) => {
    const vehiculos = await Vehiculo.find({}, 'nombre modelo anio KMactual fuenteIngreso fechaRegistro')
        .populate('usuario', 'nombre usuario')
        .populate('estado', 'nombre ')
        .populate('marca', 'nombre ')
    res.json({
        ok: true,
        vehiculos,
        // uid: req.id
    });
}
const getVehiculoById = async (req, res) => {
    const id = req.params.id;
    try {
        const vehiculo = await Vehiculo.findById(id)
            .populate('usuario', 'nombre usuario')
            .populate('estado', 'nombre ')
            .populate('marca', 'nombre ')
        res.json({
            ok: true,
            vehiculo,
            // uid: req.id
        });
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hable con el administrador',
            // uid: req.id
        });
    }

}
const crearVehiculo = async (req, res = response) => {
    const uid = req.id;
    const { nombre } = req.body;
    const fechaEcuador = moment().tz('America/Guayaquil'); // Zona horaria de Guayaquil
    console.log(fechaEcuador);
    const vehiculo = new Vehiculo({ usuario: uid, fechaRegistro: fechaEcuador, ...req.body });
    console.log(vehiculo);
    try {
        const existeData = await Vehiculo.findOne({ nombre });

        if (existeData) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ya esta registrado'
            });
        }

        const vehiculoDB = await vehiculo.save();

        res.json({
            ok: true,
            vehiculo: vehiculoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }

}
const actualizarVehiculo = async (req, res = response) => {
    console.log(res)
    const id = req.params.id
    try {
        const vehiculoDB = await Vehiculo.findById(id);
        if (!vehiculoDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe vehiculo con ese id'
            });
        }

        // ACTUALIZACIONES
        const { ...nombre } = req.body;
        console.log(nombre)
        if (vehiculoDB === nombre) {
            const existeMarca = await Vehiculo.findOne({ nombre });
            if (existeMarca) {
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un vehiculo registrado con ese nombre'
                });
            }
        }

        const update = await Vehiculo.findByIdAndUpdate(id, nombre, { new: true })
        res.json({
            ok: true,
            update
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }
}

module.exports = { getVehiculos, crearVehiculo, actualizarVehiculo, getVehiculoById };