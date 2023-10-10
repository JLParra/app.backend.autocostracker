const { response } = require('express');
const ValorGuardia = require('../models/valorGuardia');
const moment = require('moment-timezone');




const getValorGuardia = async (req, res) => {
    const monto = await ValorGuardia.find({}, 'valor fechaRegistro ')
        .populate('usuario', 'nombre usuario')
        .populate('estado', 'nombre ')
        .populate('vehiculo', 'nombre ')
    res.json({
        ok: true,
        monto,
        // uid: req.id
    });
}

const crearValorGuardia = async (req, res = response) => {
    const uid = req.id;
    const { nombre } = req.body;
    const fechaEcuador = moment().tz('America/Guayaquil'); // Zona horaria de Guayaquil
    console.log(fechaEcuador);
    const valorGuardia = new ValorGuardia({ usuario: uid, fechaRegistro:fechaEcuador,...req.body });
    // console.log(estado);
    try {
        const existeData = await ValorGuardia.findOne({ nombre });

        if (existeData) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ya esta registrado'
            });
        }

        const valorGuardiaDB = await valorGuardia.save();

        res.json({
            ok: true,
            valorGuardia: valorGuardiaDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }

}
const actualizarValorGuardia = async (req, res = response) => {
    const id = req.params.id
    try {
        const ValorGuardiaDB = await ValorGuardia.findById(id);
        if (!ValorGuardiaDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe vehiculo con ese id'
            });
        }

        // ACTUALIZACIONES
        const { ...nombre } = req.body;
         console.log(nombre)
        if (ValorGuardiaDB === nombre) {
            const existeMarca = await Vehiculo.findOne({ nombre });
            if (existeMarca) {
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un vehiculo registrado con ese nombre'
                });
            }
        }

        const update = await ValorGuardia.findByIdAndUpdate(id,nombre, { new: true })
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

module.exports = { getValorGuardia, crearValorGuardia, actualizarValorGuardia };