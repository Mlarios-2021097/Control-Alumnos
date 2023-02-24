const { Router } = require('express');
const { check } = require('express-validator');
const { postAlumnos,putUsuarios,deleteUsuario,getCursoById} = require('../controllers/alumnos');
const {  existeCurso ,existeUsuarioPorId,emailExiste} = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdmin,esUser } = require('../middlewares/validar-rol');


const router = Router();
 

router.get('/mostrarCurso',[
    validarJWT,
    validarCampos,
],getCursoById);

router.post('/agregarAlumno',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(  emailExiste ),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos,
],postAlumnos);


router.put('/editar/:id',[
    validarJWT,
    esUser,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeUsuarioPorId ),
    check('correo').custom(  emailExiste ),
    check('correo', 'El correo no es valido').isEmail(),
],putUsuarios);

router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],deleteUsuario );


module.exports = router;