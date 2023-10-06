const { response } = require('express');
const Estado = require('../models/estado');
const { generateJWT } = require('../helpers/jwt');



const getEstados = async (req, res) => {
    const estados = await Estado.find({}, 'nombre')
    res.json({
        ok: true,
        estados,
        // uid: req.id
    });
}

const crearEstado = async (req, res = response) => {
    const uid = req.id;
    const { nombre } = req.body;
    const estado = new Estado({ usuario: uid, ...req.body });
    console.log(estado);
    try {
        const existeData = await Estado.findOne({ nombre });
        
        if (existeData) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ya esta registrado'
            });
        }

        const estadoDB = await estado.save();

        res.json({
            ok: true,
            estado: estadoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }

}
const actualizarEstado = async (req, res = response) => {
    const id = req.params.id
    try {
        const estadoDB = await Estado.findById(id);
        if (!estadoDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe el estado por ese id'
            });
        }

        // ACTUALIZACIONES
        const { ...nombre } = req.body;
        console.log(nombre)
        if (estadoDB === nombre) {
            const existeEstado = await Estado.findOne({ nombre });
            if (existeEstado) {
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un nombre'
                });
            }
        }

        const update = await Estado.findByIdAndUpdate(id, nombre, { new: true })
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

module.exports = { getEstados, crearEstado, actualizarEstado };