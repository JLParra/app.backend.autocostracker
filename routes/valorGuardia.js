const { Router } = require("express");
const { getValorGuardia,crearValorGuardia,actualizarValorGuardia } = require("../controllers/valorGuardia");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
router.get('/', validarJWT, getValorGuardia);
router.post('/',
    [
        validarJWT,
        check('valor', 'El valor es obligatorio').not().isEmpty(),
        check('estado', 'El id del estado es obligatorio').not().isEmpty(), 
        check('vehiculo', 'El id del vehiculo es obligatorio').not().isEmpty(), 
        validarCampos
    ],
    crearValorGuardia);
router.put('/:id',
    [
        validarJWT,
        check('valor', 'El nombre es obligatorio').not().isEmpty(),
        check('estado', 'El id del estado es obligatorio').isMongoId(),
        check('vehiculo', 'El id del vehiculo es obligatorio').isMongoId(),
        validarCampos
    ],
    actualizarValorGuardia);


module.exports = router;