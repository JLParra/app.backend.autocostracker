const { Router } = require("express");
const { getTipoVehiculos, crearTipoVehiculo, actualizarTipoVehiculo, getTipoVehiculoById } = require("../controllers/tipoVehiculo");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
router.get('/', validarJWT, getTipoVehiculos);
router.post('/',
    [
        validarJWT,
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('estado', 'El id del estado es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearTipoVehiculo);
router.put('/:id',
    [
        validarJWT,
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('estado', 'El id del estado es obligatorio').isMongoId(),
        validarCampos
    ],
    actualizarTipoVehiculo);

router.get('/:id',validarJWT,getTipoVehiculoById);
module.exports = router;