const Curso = require('../models/curso');
const Usuario = require('../models/usuario');
 
const bcrypt = require('bcryptjs');
//agrega el usuarui  
const postProfesores = async (req = request, res = response) => {
   
    const { nombre, correo, password} = req.body;
    const UsuarioGuardadoDB = new Usuario({nombre, correo, password, rol:"PROFESOR_ROL" });


    const salt = bcrypt.genSaltSync();
    UsuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

    await UsuarioGuardadoDB.save();
 

    res.json({
        msg: 'Profesor Agregado',
        UsuarioGuardadoDB,
        
        
    });

}
const putAgregarCursos = async (req = request, res = response) => {
    
    const { id } = req.params;
    
    const {nombreCurso,jornada,estado,usuario,...restoData } = req.body;
  
    
    
    
    const CursoAgregado = await Curso.findByIdAndUpdate(id,{ $push:  { usuarioAlumno: req.usuario.id }}, { new: true });
  

    res.status(201).json(CursoAgregado);
}
//muestra los cursos segun el id el profe
const getCursoById = async (req = request, res = response) => {
    
    _id = req.usuario.id;
    const query = { estado: true ,usuario:_id};    

    const listaCursos = await Promise.all([
       Curso.countDocuments(query),
       Curso.find(query)
    ]);

    res.json({
        msg: 'Listado de cursos',
        listaCursos
    });
    
}

//agrega curso
const postCursos = async (req = request, res = response) => {

     const {  ...body } = req.body;
 
     const data = {
        ...body,
        usuario: req.usuario._id
    }
    const cursoAgregado = await Curso( data );
     //Guardar en BD
     await cursoAgregado.save();
 
     res.status(201).json(cursoAgregado);
 
}

const putCursos = async (req = request, res = response) => {

      const { id } = req.params;
      const {_id,...resto } = req.body;
    
      resto.usuario = req.usuario._id;

   
      //Editar al alumno por el id
      const Cursos = await Curso.findByIdAndUpdate(id, resto, { new: true });
      
      res.status(201).json(Cursos);
 
}

const deleteCurso = async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

     const cursoDelete = await Curso.findByIdAndUpdate(id, { estado: false });

     res.status(201).json(cursoDelete);
}

module.exports = {
    getCursoById,
    postCursos,
    putCursos,
    deleteCurso,
    postProfesores,
    putAgregarCursos
}
