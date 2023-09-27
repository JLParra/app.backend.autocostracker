require('dotenv').config();

const express = require("express");
const cors = require('cors')

const { dbConnection } = require("./database/config");

// CREAR EL SERVIDOR DE EXPRESS
const app = express();

// CONFIGURAR EL CORS
app.use(cors());

// BASE DE DATOS
dbConnection();

// RUTAS
app.get('/', (req, res) => {
    res.json({
        ok: true, msg: 'Hola Mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto',
        +process.env.PORT);
})