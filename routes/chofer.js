const { Router } = require("express");
const { getChoferes, crearChoferes, actualizarChofer, getChoferesById } = require("../controllers/chofer");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
router.get('/', validarJWT, getChoferes);
router.post('/',
    [
        validarJWT,
        check('vehiculo', 'El vehiculo es obligatorio').not().isEmpty(),
        check('cédula', 'La cédula es obligatorio').not().isEmpty(),
        check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
        check('celular', 'El celular es obligatorio').not().isEmpty(),
        check('emergencia', 'El  # de emergencia es obligatorio').not().isEmpty(),
        check('fechaIngresoLaboral', 'La fechaIngresoLaboral es obligatoria').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isMongoId(),
        // check('usuario', 'El usuario es obligatorio').not().isMongoId(),
        validarCampos
    ],
    crearChoferes);
router.put('/:id',
    [
        validarJWT,
        check('vehiculo', 'El vehiculo es obligatorio').not().isEmpty(),
        check('cédula', 'La cédula es obligatorio').not().isEmpty(),
        check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
        check('celular', 'El celular es obligatorio').not().isEmpty(),
        check('emergencia', 'El  # de emergencia es obligatorio').not().isEmpty(),
        check('fechaIngresoLaboral', 'La fechaIngresoLaboral es obligatoria').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isMongoId(),
        // check('usuario', 'El usuario es obligatorio').not().isMongoId(),
        validarCampos
    ],
    actualizarChofer);

router.get('/:id',validarJWT,getChoferesById);
module.exports = router;