const { response, request } = require('express');


const esAdmin = async( req = request, res= response,next ) => {
     const rol = req.usuario.rol;
    if(rol==="PROFESOR_ROL"){
       
        next();
        
    }else{
        return res.status(500).json({
            msg: `El rol: ${rol} no tiene los permisos`
        })
    }
    

   
}

const esUser = async( req = request, res= response,next ) => {
    const rol = req.usuario.rol;
   if(rol==="ALUMNO_ROL"){
      
       next();
       
   }else{
       return res.status(500).json({
           msg: `El rol: ${rol} no tiene los permisos`
       })
   }
   

  
}

module.exports = {
    esAdmin, 
    esUser
}