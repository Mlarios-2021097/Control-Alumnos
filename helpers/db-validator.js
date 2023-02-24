
const Usuario = require('../models/usuario');
const Curso = require('../models/curso');
const { request, response } = require('express');
const url = require('url');
const existeUsuarioPorId = async(id) => {

    //Verificar si el ID existe
    const existeUser = await Usuario.findById(id);

    if ( !existeUser ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }
    return id

}

const existeCurso = async(id)=>{
    //Verificar si el ID existe
    const existe = await Curso.findById(id);

    if ( !existe ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }
}
const emailExiste = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Usuario.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}

const cursoExiste = async(nombre='')=>{
    const existe = await Curso.findOne({nombre});
    if ( existe ) {
        throw new Error(`El  ${ nombre } ya está registrado en la DB`);
    }
}







module.exports = {
    existeUsuarioPorId,
    emailExiste,
    cursoExiste,
    existeCurso,

}