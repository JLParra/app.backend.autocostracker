const { response } = require('express');
const Marca = require('../models/marca');




const getMarcas = async (req, res) => {
    const marcas = await Marca.find({}, 'nombre')
        .populate('usuario', 'nombre usuario')
        .populate('estado', 'nombre ')
    res.json({
        ok: true,
        marcas,
        // uid: req.id
    });
}

const crearMarca = async (req, res = response) => {
    const uid = req.id;
    const { nombre } = req.body;
    const marca = new Marca({ usuario: uid, ...req.body });
    // console.log(estado);
    try {
        const existeData = await Marca.findOne({ nombre });

        if (existeData) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ya esta registrado'
            });
        }

        const marcaDB = await marca.save();

        res.json({
            ok: true,
            marca: marcaDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }

}
const actualizarMarca = async (req, res = response) => {
    const id = req.params.id
    try {
        const marcaDB = await Marca.findById(id);
        if (!marcaDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe marca por ese id'
            });
        }

        // ACTUALIZACIONES
        const { ...nombre } = req.body;
        // console.log(nombre)
        if (estadoDB === nombre) {
            const existeMarca = await Marca.findOne({ nombre });
            if (existeMarca) {
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un nombre'
                });
            }
        }

        const update = await Marca.findByIdAndUpdate(id, nombre, { new: true })
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

module.exports = { getMarcas, crearMarca, actualizarMarca };