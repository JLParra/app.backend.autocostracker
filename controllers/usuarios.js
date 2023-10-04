const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');



const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google')
    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async (req, res = response) => {


    const { nombre, password, email } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const usuario = new Usuario(req.body);
        // ENCRIPTAR LA CONTRASENA
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }

}
const actualizarUsuario = async (req, res = response) => {
    const id = req.params.id
    console.log(id);
    try {
        const usuarioDB = await Usuario.findById(id);
        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // ACTUALIZACIONES
        const { password, google, email, ...campos } = req.body;
        if (usuarioDB === email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, { new: true })
        res.json({
            ok: true,
            usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }
}
const borrarUsuario = async (req, res = response) => {
    const id = req.params.id
    try {
        const usuarioDB = await Usuario.findById(id);
        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete(id)
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }
}
module.exports = { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario};