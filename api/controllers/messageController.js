const Message = require('../models/Message');
const { validationResult } = require('express-validator');

exports.createMessage = async (req, res) => {
    // revisamos los errores
    //middleware
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }

    try {
        let message;

        //nuevo mensaje
        message = new Message(req.body);

        //guardar mensaje
        await message.save();

        //mensaje de exito
        res.json({ msg: 'Mensaje enviado Correctamente' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.send(messages);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};
exports.getMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id).select('senderName senderEmail message');
        res.send(message);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.send('usuario eliminado');
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};