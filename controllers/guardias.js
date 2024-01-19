const { response } = require('express');
const Guardia = require('../models/guardias');
const Abono = require('../models/abono');
const moment = require('moment-timezone');




const getGuardias = async (req, res) => {

    const guardias = await Guardia.find({}, 'fechaActual diaPagado abonando mantenimiento feriado valorPendiente')
        .populate('usuario', 'nombre')
        .populate('estado', 'nombre')
        .populate('vehiculo', 'nombre')

    

    // Obtener los abonos correspondientes a las guardias
    const abonosPromises = await Promise.all( guardias.map(async (guardia) => {
        const abonos = await Abono.find({ guardia: guardia._id }, 'fechaAbono valorAbono usuario');
        return { guardia, abonos };
    }));

    // Esperar a que todas las promesas de abonos se resuelvan
    const guardiasConAbonos = await Promise.all(abonosPromises);

    res.json({

        Mensaje: 'Consulta realizada correctamente',
        Objecto: guardiasConAbonos,
        Codigo: res.statusCode,
        Estado: "success"
    });

    //Modificar la estructura del JSON antes de enviar la respuesta


    // guardias.forEach(async (guardia) => {
    //     const abonos = await Abono.find({ guardia: guardia._id });
    //     console.log('Guardia:', guardia);

    //     if (abonos.length > 0) {
    //         console.log('Abonos correspondientes:');
    //         abonos.forEach((abono) => {
    //             res.json({
    //                 ok: true,
    //                 guardias,
    //                 abono
    //             });
    //         });
    //     } else {
    //         res.json({
    //             ok: true,
    //             guardias,

    //         });
    //     }
    // });



}
const getGuardiaById = async (req, res) => {
    const id = req.params.id;
    try {
        const guardia = await Guardia.findById(id)
            .populate('usuario', 'nombre usuario')
            .populate('estado', 'nombre ')
        res.json({
            ok: true,
            guardia,
            // uid: req.id
        });
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hable con el administrador',
            // uid: req.id
        });
    }

}

const crearGuardia = async (req, res = response) => {
    const uid = req.id;
    const { diaPagado, abonos } = req.body
    const fechaEcuador = moment().tz('America/Guayaquil'); // Zona horaria de Guayaquil
    console.log(fechaEcuador);
    const guardia = new Guardia(
        {
            usuario: uid,
            ...req.body
        });
    console.log(guardia);
    try {
        const existeData = await Guardia.findOne({ diaPagado });
        if (existeData) {
            return res.status(400).json({

                Mensaje: 'El dia pagado ya esta registrado',
                Objecto: null,
                Codigo: 400,
                Estado: "error"
            });
        }

        const guardiaGuardada = await guardia.save();

        if (abonos && Array.isArray(abonos) && abonos.length > 0) {
            // Crear un arreglo para almacenar las promesas de guardado de abonos
            const promesasAbonos = abonos.map(async (abono) => {
                // Crear una nueva instancia de Abono con la referencia a la guardia
                const nuevoAbono = new Abono({
                    guardia: guardiaGuardada._id,
                    fechaAbono: new Date(abono.fechaAbono),
                    valorAbono: abono.valorAbono,
                    valorPendiente: abono.valorPendiente,
                    usuario: guardiaGuardada.usuario,
                });

                // Guardar el abono en la base de datos y devolver la promesa resultante
                return nuevoAbono.save();
            });

            // Esperar a que se completen todas las promesas de guardado de abonos
            const abonosGuardados = await Promise.all(promesasAbonos);
            res.json({
                Mensaje: 'Se registro correctamente',
                Objecto: abonosGuardados,
                Codigo: res.statusCode,
                Estado: "success"
            });
        } else {
            res.json({
                Mensaje: 'Se registro correctamente',
                Objecto: guardiaGuardada,
                Codigo: res.statusCode,
                Estado: "success"
            });
        }


    } catch (error) {
        // console.log(error);
        res.status(500).json({

            Mensaje: error,
            Objecto: null,
            Codigo: res.statusCode,
            Estado: "error"
        });
    }

}
const actualizarGuardia = async (req, res = response) => {
    console.log(res)
    const id = req.params.id
    try {
        const guardiaDB = await Guardia.findById(id);
        if (!guardiaDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe guardia con ese id'
            });
        }

        // ACTUALIZACIONES
        const { ...diaPagado } = req.body;
        console.log(diaPagado)
        if (vehiculoDB === diaPagado) {
            const existediaPagado = await Vehiculo.findOne({ diaPagado });
            if (existediaPagado) {
                res.status(400).json({
                    ok: false,
                    msg: 'El dia de pago ya fue cancelado(pagado)'
                });
            }
        }

        const update = await Guardia.findByIdAndUpdate(id, diaPagado, { new: true })
        res.json({
            ok: true,
            update
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }
}

module.exports = { getGuardias, crearGuardia, actualizarGuardia, getGuardiaById };