const { Router } = require("express");
const { getEstados, crearEstado, actualizarEstado } = require("../controllers/estados");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
router.get('/', validarJWT, getEstados);
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del estado es obligatorio').not().isEmpty(),
        // check('usuario', 'El id del usuario es obligatorio').isMongoId,
        validarCampos
    ],
    crearEstado);
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del estado es obligatorio').not().isEmpty(),
       
        validarCampos

    ],
    actualizarEstado);


module.exports = router;