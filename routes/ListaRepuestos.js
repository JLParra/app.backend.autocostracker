const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { crearListaRepuestos, actualizarListaRepuestos, getListaRepuestos } = require("../controllers/listaRepuestos");

const router = Router();
router.get('/', validarJWT, getListaRepuestos);
router.post('/',
    [
        validarJWT,
        check('descripcion', 'El nombre es obligatorio').not().isEmpty(),
        // check('usuario', 'El id del usuario es obligatorio').isMongoId,
        validarCampos
    ],
    crearListaRepuestos);
router.put('/:id',
    [
        validarJWT,
        check('descripcion', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarListaRepuestos);


module.exports = router;