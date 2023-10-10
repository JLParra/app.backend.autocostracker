const { Router } = require("express");
const { getVehiculos,crearVehiculo,actualizarVehiculo } = require("../controllers/vehiculo");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
router.get('/', validarJWT, getVehiculos);
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('anio', 'El año es obligatorio').not().isEmpty(),
        check('estado', 'El id del estado es obligatorio').not().isEmpty(), 
        check('marca', 'El id de la marca es obligatoria').not().isEmpty(), 
        validarCampos
    ],
    crearVehiculo);
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('anio', 'El año es obligatorio').not().isEmpty(),
        check('estado', 'El id del estado es obligatorio').isMongoId(),
        check('marca', 'El id de la marca es obligatoria').isMongoId(),
        validarCampos
    ],
    actualizarVehiculo);


module.exports = router;