const { Router } = require("express");
const { getMarcas, crearMarca, actualizarMarca } = require("../controllers/marca");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
router.get('/', validarJWT, getMarcas);
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        // check('usuario', 'El id del usuario es obligatorio').isMongoId,
        validarCampos
    ],
    crearMarca);
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarMarca);


module.exports = router;