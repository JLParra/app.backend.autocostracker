const { response } = require('express');
const Feriado = require('../models/feriados');
const FechasFeriados = require('../models/fechas');





const getFeriados = async (req, res) => {
    try {
        // Busca todos los feriados en la base de datos
        const feriados = await Feriado.find();


        // Obtener los abonos correspondientes a las guardias
        const fechasPromises = await Promise.all(feriados.map(async (feriado) => {
            const fechas = await FechasFeriados.find({ feriado: feriado._id }, 'fecha descripcion comentario estado');

            // Crear un nuevo objeto que incluya la información de 'guardia' y 'abonos'
            const feriadoConFechas = {
                ...feriado.toObject(), // Puedes usar toObject() para obtener un objeto plano de Mongoose
                fechas,
            };
            return feriadoConFechas
        }));

        // Esperar a que todas las promesas de abonos se resuelvan
        const feriadosConFechas = await Promise.all(fechasPromises);

        res.json({

            Mensaje: 'Consulta realizada correctamente',
            Objecto: feriadosConFechas,
            Codigo: res.statusCode,
            Estado: "success"
        });


       
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Mensaje: 'Hubo un error al buscar los feriados',
            Objecto: null,
            Codigo: 500,
            Estado: "error"
        });
    }
};

const buscarFeriadosPorAnio = async (req, res) => {
    const { anio } = req.params;

    try {
        // Busca los feriados para el año dado
        const feriados = await Feriado.findOne({ anio }).populate('fechas');

        if (!feriados) {
            return res.status(404).json({
                Mensaje: 'No se encontraron feriados para el año especificado',
                Objecto: null,
                Codigo: 404,
                Estado: "error"
            });
        }

        res.status(200).json({
            Mensaje: 'Feriados encontrados',
            Objecto: feriados,
            Codigo: 200,
            Estado: "success"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Mensaje: 'Hubo un error al buscar los feriados',
            Objecto: null,
            Codigo: 500,
            Estado: "error"
        });
    }
};

const crearFeriado = async (req, res) => {
    const { anio, fechas } = req.body;

    try {
        // Verifica si ya existe un feriado con el mismo año
        const existeFeriado = await Feriado.findOne({ anio });
        if (existeFeriado) {
            return res.status(400).json({
                Mensaje: 'El año ya tiene feriados registrados',
                Objecto: null,
                Codigo: 400,
                Estado: "error"
            });
        }

        // Crea un nuevo feriado con el año
        const nuevoFeriado = new Feriado({ anio });

        // Guarda el feriado en la base de datos
        const feriadoGuardado = await nuevoFeriado.save();

        // Si hay fechas de feriados, las guarda en la tabla de detalles
        if (fechas && fechas.length > 0) {
            const fechasFeriadoGuardadas = await Promise.all(fechas.map(async (fecha) => {
                const nuevaFechaFeriado = new FechasFeriados({
                    feriado: feriadoGuardado._id,
                    fecha: fecha.fecha,
                    descripcion: fecha.descripcion,
                    comentario: fecha.comentario,
                    estado: fecha.estado
                });
                return nuevaFechaFeriado.save();
            }));
            feriadoGuardado.fechas = fechasFeriadoGuardadas;
            await feriadoGuardado.save();
        }

        res.json({
            Mensaje: 'Feriado creado correctamente',
            Objecto: feriadoGuardado,
            Codigo: res.statusCode,
            Estado: "success"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Mensaje: 'Hubo un error al crear el feriado',
            Objecto: null,
            Codigo: res.statusCode,
            Estado: "error"
        });
    }
};

const actualizarFeriado = async (req, res) => {
    const { id } = req.params;
    const { anio, fechas } = req.body;
    try {
        // Busca y obtiene la cabecera existente por su ID
        const feriadoExistente = await Feriado.findById(id);
        if (!feriadoExistente) {
            return res.status(404).json({
                Mensaje: 'Feriado no encontrado',
                Objecto: null,
                Codigo: 404,
                Estado: "error"
            });
        }

        // Elimina los detalles asociados a la cabecera existente
        await FechasFeriados.deleteMany({ feriado: id });

        // Actualiza la información de la cabecera
        feriadoExistente.anio = anio;
        // Guarda la cabecera actualizada
        await feriadoExistente.save();

        // Crea y guarda los nuevos detalles asociados a la cabecera
        const nuevosFechasFeriado = fechas.map(fecha => new FechasFeriados({
            feriado: id,
            fecha: fecha.fecha,
            descripcion: fecha.descripcion,
            comentario: fecha.comentario,
            estado: fecha.estado
        }));
        await FechasFeriados.insertMany(nuevosFechasFeriado);

        res.status(200).json({
            Mensaje: 'Feriado actualizado correctamente',
            Objecto: feriadoExistente,
            Codigo: 200,
            Estado: "success"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Mensaje: 'Hubo un error al actualizar el feriado',
            Objecto: null,
            Codigo: 500,
            Estado: "error"
        });
    }
};

module.exports = { getFeriados, crearFeriado, actualizarFeriado, buscarFeriadosPorAnio };