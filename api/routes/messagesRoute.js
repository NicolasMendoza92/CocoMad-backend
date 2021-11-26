// Rutas para mensajes
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { check } = require('express-validator');

// Crear un mensaje
// api/messages
router.post(
    '/',
    [
        check('senderName', 'El nombre es obligatorio').not().isEmpty().isLength({ max: 30 }),
        check('senderEmail', 'Agrega un Email Valido').isEmail().isLength({ max: 35 }),
        check('message', 'El messege debe tener como mínimo de 15 caracteres').isLength({ min: 15 }),
        check('message', 'El messege debe tener como maximo de 250 caracteres').isLength({ max: 250 }),
    ],
    messageController.createMessage);
    
router.get('/', messageController.getMessages);
router.get('/:id', messageController.getMessage);
router.delete('/:id', messageController.deleteMessage);

router.get('/', () => {});

module.exports = router;