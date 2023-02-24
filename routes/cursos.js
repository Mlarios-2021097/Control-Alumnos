const { Router } = require('express');
const { check } = require('express-validator');
const { postProfesores ,getCursoById,postCursos,putCursos,deleteCurso,putAgregarCursos } = require('../controllers/profesores');
const { validarCampos } = require('../middlewares/validar-campos');
const{ cursoExiste, existeCurso, emailExiste} = require('../helpers/db-validator');
const { esAdmin,esUser } = require('../middlewares/validar-rol');
const { validarJWT } = require('../middlewares/validar-jwt');
const {asignacion,asignacionMasDeTres} = require('../middlewares/validar-asignaciones');
const { request } = require('http');
const router = Router();
router.get('/mostrar',[
    validarJWT,
    esAdmin,
    validarCampos
],getCursoById);
 
router.post('/agregarCurso',[
    validarJWT,
    esAdmin,
    check('nombreCurso', 'El nombre es obligatorio').not().isEmpty(),
    check('nombreCurso').custom(cursoExiste),
    validarCampos,
],postCursos);

router.post('/agregar',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(  emailExiste ),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos,
],postProfesores);

router.put('/editar/:id',[
    validarJWT,
    check('id').custom( existeCurso), 
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('nombreCurso').custom(cursoExiste),
    check('nombreCurso', 'El nombre es obligatorio').not().isEmpty(),
    esAdmin,
    validarCampos,
],putCursos);

router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeCurso ),
    validarCampos
],deleteCurso );

router.put('/agregarAsignacion/:id',[
    validarJWT,
    esUser,
    check('id').custom( existeCurso ),
    asignacion ,
    asignacionMasDeTres,
    validarCampos,
],putAgregarCursos);

module.exports = router;