const { response } = require('express');
const ListaRepuestos = require('../models/listaRepuestos');




const getListaRepuestos = async (req, res) => {
    const listaRepuestos = await ListaRepuestos.find({}, 'descripcion')
        .populate('usuario', 'nombre usuario')
        .populate('estado', 'nombre ')
    res.json({
        ok: true,
        listaRepuestos,
        // uid: req.id
    });
}

const crearListaRepuestos = async (req, res = response) => {
    const uid = req.id;
    const { descripcion } = req.body;
    const listaRepuestos = new ListaRepuestos({ usuario: uid, ...req.body });
    // console.log(estado);
    try {
        const existeData = await ListaRepuestos.findOne({ descripcion });

        if (existeData) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ya esta registrado'
            });
        }

        const listaRepuestosDB = await listaRepuestos.save();

        res.json({
            ok: true,
            listaRepuestos: listaRepuestosDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }

}
const actualizarListaRepuestos = async (req, res = response) => {
    const id = req.params.id
    try {
        const dataDB = await ListaRepuestos.findById(id);
        if (!dataDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe marca por ese id'
            });
        }

        // ACTUALIZACIONES
        const { ...nombre } = req.body;
        // console.log(nombre)
        if (dataDB === nombre) {
            const existeData= await ListaRepuestos.findOne({ nombre });
            if (existeDta) {
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un nombre'
                });
            }
        }

        const update = await ListaRepuestos.findByIdAndUpdate(id, nombre, { new: true })
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

module.exports = { getListaRepuestos, crearListaRepuestos, actualizarListaRepuestos };