const { Router } = require("express");
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require("../controllers/usuarios");
const { check } = require("express-validator");
const {validarCampos} = require ("../middlewares/validar-campos")

const router = Router();
router.get('/', getUsuarios);
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contrasena es obligatoria').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos

], 
crearUsuario);
router.put('/:id',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('role','el rol es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos

], 
actualizarUsuario);
router.delete('/:id',
borrarUsuario);

module.exports = router;