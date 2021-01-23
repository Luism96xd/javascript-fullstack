if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
    console.log(process.env.NODE_ENV);
}

const express = require('express');
//Morgan nos permite ver por consola lo que las aplicaciones clientes van pidiendo: Peticion GET o POST - status - tiempo de respuesta- peso
const morgan = require('morgan');
//Multer nos permite procesar imagenes, funciona como middleware
const multer = require('multer');
//Trabajar con rutas y direcciones del proyecto
const path = require('path');
//cors permite que dos servidores se puedan comunicar
const cors = require('cors');

//Initializations
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares: todos los middlewares de express son funciones
app.use(morgan('dev'));
//Toda peticion que pide el cliente pasa por el middleware

const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'), //donde colocar la imagen subida por el frontend
    filename(request, file, callback){
        callback(null, new Date().getTime() + path.extname(file.originalname)); //extension name
    } 
});
app.use(multer({storage}).single('image'));

//Permite interpretar los datos del formulario como un JSON
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/books/',require('./routes/books'));


//Static files

app.use(express.static(path.join(__dirname, 'public')))


//Start the server
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});