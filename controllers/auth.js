const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        // verificar email
        const usuarioDB = await Usuario.findOne({ email });

        const existeEmail = await Usuario.findOne({ email });
        if (!existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contrasena no validos'
            });
        }
        // verificar contrasena
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            res.status(500).json({
                ok: false,
                msg: 'Usuario o contrasena no validos'
            });
        }
        // GENERAR EL TOKEN JWT

        res.json({
            ok: true,
            msg: 'hOLA mUNDO'
        });
            



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = { login };