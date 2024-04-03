const { response } = require('express');
const Chofer = require('../models/chofer');

const moment = require('moment-timezone');




const getChoferes = async (req, res) => {

    const choferes = await Chofer.find({}, 'img cedula nombres nacionalidad convencional celular emergencia parentezco fechaIngresoLaboral fechaRegistro ')
        .populate('estado', 'nombre')
        .populate('vehiculo', 'nombre')

    res.json({
        ok: true,
        choferes,
        // uid: req.id
    });

}
const getChoferesById = async (req, res) => {
    const id = req.params.id;
    try {
        const Choferes = await Choferes.findById(id)
            .populate('estado', 'nombre ')
            .populate('vehiculo', 'nombre')
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
const crearChoferes = async (req, res = response) => {
    const uid = req.id;
    const { nombre } = req.body;
    const fechaEcuador = moment().tz('America/Guayaquil'); // Zona horaria de Guayaquil
    console.log(fechaEcuador);
    const chofer = new Chofer({ fechaRegistro: fechaEcuador, ...req.body });
    console.log(chofer);
    try {
        const existeData = await Chofer.findOne({ nombre });

        if (existeData) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ya esta registrado'
            });
        }

        const choferDB = await chofer.save();

        res.json({
            ok: true,
            chofer: choferDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }

}
const actualizarChofer = async (req, res = response) => {
    console.log(res)
    const id = req.params.id
    try {
        const choferDB = await Chofer.findById(id);
        if (!choferDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe vehiculo con ese id'
            });
        }

        // ACTUALIZACIONES
        const { ...nombre } = req.body;
        console.log(nombre)
        if (choferDB === nombre) {
            const existeNombre = await Chofer.findOne({ nombre });
            const existeCedula = await Chofer.findOne({ cedula });
            if (existeCedula || existeNombre) {
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un chofer registrado con ese nombre y/o cédula'
                });
            }
        }

        const update = await Chofer.findByIdAndUpdate(id, nombre, { new: true })
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

module.exports = { getChoferes, crearChoferes, actualizarChofer, getChoferesById };