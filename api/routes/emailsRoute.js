// Rutas para emails
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// para mandar los datos de la compra que hizo el usuario 
router.post('/', emailController.createEmail);

module.exports = router;