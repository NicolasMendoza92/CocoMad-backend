// Rutas para emails
const express = require('express');
const cors = require('cors')
const router = express.Router();
const emailController = require('../controllers/emailController');

// para mandar los datos de la compra que hizo el usuario 
router.post('/',cors(), emailController.createEmail);

module.exports = router;