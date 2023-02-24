const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');
 
class Server {
    constructor(options) {
        //configuracion Inicial
        this.app = express();
        this.port = process.env.PORT;  
        this.authPath = '/api/inicio'
        this.usuariosPath = '/api/alumnos';
        this.profesorPath = '/api/profesor';
       
        //Conectar a base de datos
        this.conectarDB();
 
        this.middlewares();
            //cors
            this.app.use(cors());

            //Conversion de json a js
            //lectura y parse del body que mandamos en json
            this.app.use(express.json());
            this.app.use(express.static('public'));
            
        //Rutas de mi app
        this.routes();
    } 

    //Funcion de conexion
    async conectarDB() {
        await dbConection();
    }
    //Un middleware es una funcion que se ejecuta ante de las rutas
    middlewares() {
        //DIrectorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require ('../routes/usuario'));
        this.app.use(this.profesorPath, require ('../routes/cursos'));
      
    }

    listen() {
        this.app.listen(this.port, () =>{
            console.log(`Servidor corriendo en el puerto `, this.port );
        })
    }
 }

 //Exportamos la clase server
 module.exports = Server;