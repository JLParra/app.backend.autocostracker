const Usuario = require('../models/usuario');

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google')
    res.json({
        ok: true,
        msg: 'Hola Mundo',
        usuarios
    });
}

const crearUsuario = async (req, res) => {
    console.log(req.body);

    const { nombre, password, email } = req.body;
    const usuario = new Usuario(
        req.body
        // {
        //     nombre: nombre,
        //     password: password,
        //     email: email
        // }

    );
    await usuario.save();
    res.json({
        ok: true,
        usuario
    });
}

module.exports = { getUsuarios, crearUsuario };