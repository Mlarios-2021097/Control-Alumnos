const { Schema, model } = require('mongoose');
 
const CursoSchema = Schema({
    nombreCurso: {
        type: String,
        required: [true , 'El nombre del curso es obligatorio']
    },
    
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    usuarioAlumno: [
        {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    ]
    
});

 
module.exports = model('Curso', CursoSchema);