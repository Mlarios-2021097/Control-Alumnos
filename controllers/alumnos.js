const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const Curso = require('../models/curso');

const { Promise } = require('mongoose');
//muestra los cursos asignados a un usuario
const getCursoById = async (req = request, res = response) => {

    const _id = req.usuario.id;


    const query = { estado: true, usuarioAlumno: _id };
    const listaCurso = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query),

    ]);

    res.json({
        msg: 'Se agrego exitoso',
        listaCurso,


    });
}
//agrega el usuarui  
const postAlumnos = async (req = request, res = response) => {


    const { nombre, correo, password } = req.body;
    const UsuarioGuardadoDB = new Usuario({ nombre, correo, password, rol: "ALUMNO_ROL" });


    const salt = bcrypt.genSaltSync();
    UsuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

    await UsuarioGuardadoDB.save();


    res.json({
        msg: 'Alumno Agregado',
        UsuarioGuardadoDB,


    });

}
//agrega cursos al usuario

//edita un usario
const putUsuarios = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;

    if (resto.password) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }


    const UsuarioEdi = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Usuario agregado correctamente',
        UsuarioEdi
    });
}

const deleteUsuario = async (req = request, res = response) => {

    const { id } = req.params;

    const usuarioDelete = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'Usuario eliminado correctamente',
        usuarioDelete
    });
}

module.exports = {
    postAlumnos,
    putUsuarios,
    deleteUsuario,
    getCursoById
}