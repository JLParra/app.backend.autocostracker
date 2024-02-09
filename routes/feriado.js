const { Router } = require("express");
const { getFeriados, crearFeriado, actualizarFeriado, buscarFeriadosPorAnio } = require("../controllers/feriado");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
router.get('/', validarJWT, getFeriados);
router.post('/',
    [
        validarJWT,
        check('anio', 'El año es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearFeriado);
router.put('/:id',
    [
        validarJWT,
        check('fechas', 'La fecha es obligatorio').not().isEmpty(),
        // check('estado', 'El id del estado es obligatorio').isMongoId(),
        validarCampos
    ],
    actualizarFeriado);

router.get('/:id',validarJWT,buscarFeriadosPorAnio);
module.exports = router;