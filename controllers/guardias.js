const { response } = require('express');
const Guardia = require('../models/guardias');
const moment = require('moment-timezone');




const getGuardias = async (req, res) => {
    const guardias = await Guardia.find({}, 'fechaRegistro fechaPago diaPagado libre valorEntregado valorPendiente')
        .populate('usuario', 'nombre usuario')
        .populate('estado', 'nombre ')
    res.json({
        ok: true,
        guardias,
        // uid: req.id
    });
}
const getGuardiaById = async (req, res) => {
    const id = req.params.id;
    try {
        const guardia = await Guardia.findById(id)
            .populate('usuario', 'nombre usuario')
            .populate('estado', 'nombre ')
        res.json({
            ok: true,
            guardia,
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
const crearGuardia = async (req, res = response) => {
    const uid = req.id;
    const { diaPagado } = req.body;
    const fechaEcuador = moment().tz('America/Guayaquil'); // Zona horaria de Guayaquil
    console.log(fechaEcuador);
    const guardia = new Guardia({ usuario: uid, fechaRegistro: fechaEcuador, fechaPago: fechaEcuador, ...req.body });
    console.log(vehiculo);
    try {
        const existeData = await Guardia.findOne({ diaPagado });

        if (existeData) {
            return res.status(400).json({
                ok: false,
                msg: 'El dia de pago ya fue cancelado(pagado)'
            });
        }

        const guardiaDB = await guardia.save();

        res.json({
            ok: true,
            vehiculo: guardiaDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }

}
const actualizarGuardia = async (req, res = response) => {
    console.log(res)
    const id = req.params.id
    try {
        const guardiaDB = await Guardia.findById(id);
        if (!guardiaDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe guardia con ese id'
            });
        }

        // ACTUALIZACIONES
        const { ...diaPagado } = req.body;
        console.log(diaPagado)
        if (vehiculoDB === diaPagado) {
            const existediaPagado = await Vehiculo.findOne({ diaPagado });
            if (existediaPagado) {
                res.status(400).json({
                    ok: false,
                    msg: 'El dia de pago ya fue cancelado(pagado)'
                });
            }
        }

        const update = await Guardia.findByIdAndUpdate(id, diaPagado, { new: true })
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

module.exports = { getGuardias, crearGuardia, actualizarGuardia, getGuardiaById };