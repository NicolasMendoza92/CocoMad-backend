// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const profileController = require("../controllers/profileController");
const { check } = require('express-validator');

// Crear un usuario

// api/profile
router.put('/:id', profileController.modifyProfile);

module.exports = router;