require('dotenv').config();

const express = require("express");
const cors = require('cors')

const { dbConnection } = require("./database/config");

// CREAR EL SERVIDOR DE EXPRESS
const app = express();

// CONFIGURAR EL CORS
app.use(cors());

// LECTURA Y PARSEO DEL BODY
app.use( express.json());

// BASE DE DATOS
dbConnection();

// RUTAS
app.use('/api/usuarios', require('./routes/usuarios'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto',
        +process.env.PORT);
})