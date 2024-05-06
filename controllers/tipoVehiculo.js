const { response } = require('express');
const TipoVehiculo = require('../models/tipoVehiculo');
const moment = require('moment-timezone');


const getTipoVehiculos = async (req, res) => {
    const tipoVehiculo = await TipoVehiculo.find({}, 'img descripcion fechaRegistro')
        .populate('usuario', 'nombre usuario')
        .populate('estado', 'nombre ')
    res.json({
        ok: true,
        result: tipoVehiculo,
        // uid: req.id
    });
}
const getTipoVehiculoById = async (req, res) => {
    const id = req.params.id;
    try {
        const tipoVehiculo = await TipoVehiculo.findById(id)
            .populate('usuario', 'nombre usuario')
            .populate('estado', 'nombre ')
        res.json({
            ok: true,
            tipoVehiculo,
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
const crearTipoVehiculo = async (req, res = response) => {
    const uid = req.id;
    const { descripcion } = req.body;
    const fechaEcuador = moment().tz('America/Guayaquil'); // Zona horaria de Guayaquil
    console.log(fechaEcuador);
    const tipoVehiculo = new TipoVehiculo({ usuario: uid, fechaRegistro: fechaEcuador, ...req.body });
    console.log(tipoVehiculo);
    try {
        const existeData = await TipoVehiculo.findOne({ descripcion });
        if (existeData) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ya esta registrado'
            });
        }

        const tipoVehiculoDB = await tipoVehiculo.save();
        res.json({
            ok: true,
            tipoVehiculo: tipoVehiculoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }

}
const actualizarTipoVehiculo = async (req, res = response) => {
    console.log(res)
    const id = req.params.id
    try {
        const tipoVehiculoDB = await TipoVehiculo.findById(id);
        if (!tipoVehiculoDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe vehiculo con ese id'
            });
        }

        // ACTUALIZACIONES
        const { ...descripcion } = req.body;
        console.log(descripcion)
        if (tipoVehiculoDB === descripcion) {
            const existeDescripcion= await TipoVehiculo.findOne({ descripcion });
            if (existeDescripcion) {
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un vehiculo registrado con ese nombre'
                });
            }
        }

        const update = await TipoVehiculo.findByIdAndUpdate(id, descripcion, { new: true })
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

module.exports = { getTipoVehiculos, crearTipoVehiculo, actualizarTipoVehiculo, getTipoVehiculoById }