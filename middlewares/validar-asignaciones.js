const { response, request } = require('express');
const { validationResul } = require('express-validator');

const Curso = require('../models/curso');

const asignacion = async( req = request, res = response, next)=>{

    const paths = req.originalUrl; 
    const ruta = paths.split('/');
    const idCurso = ruta.pop();

    const _id=req.usuario.id

    const query = {_id:idCurso, usuarioAlumno:_id}; 

        const existeAsignacion = await Curso.find(query);
        if(existeAsignacion.length !=0){
            res.json({
                msg:`El id:${_id} ya esta registrado en esta db`,
                existeAsignacion
            })

        }else{
            next();
        }
}



const asignacionMasDeTres = async(req = request, res = response, next)=>{
    console.log("entramos");
    const _id=req.usuario.id

    const query = { usuarioAlumno:_id}; 

    const existeAlumno = await Curso.countDocuments(query);

    console.log(existeAlumno);
    if(existeAlumno >=3){
        res.json({
            msg:`El id:${_id} ya sobre paso su limite de curso`,
         
        })

    }else{
        next();
    }
   

    
}


module.exports = {
    asignacion,
    asignacionMasDeTres
}