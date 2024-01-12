const { Router } = require("express");
const { getGuardias, crearGuardia, actualizarGuardia, getGuardiaById} = require("../controllers/guardias");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
router.get('/', validarJWT, getGuardias);
router.post('/',
    [
        validarJWT,
        check('vehiculo', 'El vehiculo es obligatorio').not().isEmpty(),
        check('montoDiario', 'El montoDiario es obligatorio').not().isEmpty(),
        check('valorPendiente', 'El valorPendiente es obligatorio').not().isEmpty(),
        check('fechaActual', 'El fechaActual es obligatorio').not().isEmpty(),
        check('diaPagado', 'El diaPagado es obligatorio').not().isEmpty(),
        // check('estado', 'El estado es obligatorio').not().isMongoId(),
        // check('usuario', 'El usuario es obligatorio').not().isMongoId(),
        validarCampos
    ],
    crearGuardia);
router.put('/:id',
    [
        validarJWT,
        check('vehiculo', 'El vehiculo es obligatorio').not().isEmpty(),
        check('montoDiario', 'El montoDiario es obligatorio').not().isEmpty(),
        check('valorPendiente', 'El valorPendiente es obligatorio').not().isEmpty(),
        check('fechaActual', 'El fechaActual es obligatorio').not().isEmpty(),
        check('diaPagado', 'El diaPagado es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isMongoId(),
        check('usuario', 'El usuario es obligatorio').not().isMongoId(),
        validarCampos
    ],
    actualizarGuardia);

router.get('/:id',validarJWT,getGuardiaById);
module.exports = router;