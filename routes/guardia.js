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
        check('diaPagado', 'El dia pagado es obligatorio').not().isEmpty(),
        check('valorEntregado', 'El valorEntregado es obligatorio').not().isEmpty(),
        check('estado', 'El id del estado es obligatorio').not().isMongoId(),
        validarCampos
    ],
    crearGuardia);
router.put('/:id',
    [
        validarJWT,
        check('diaPagado', 'El dia pagado es obligatorio').not().isEmpty(),
        check('valorEntregado', 'El valorEntregado es obligatorio').not().isEmpty(),
        check('estado', 'El id del estado es obligatorio').not().isMongoId(),
        validarCampos
    ],
    actualizarGuardia);

router.get('/:id',validarJWT,getGuardiaById);
module.exports = router;