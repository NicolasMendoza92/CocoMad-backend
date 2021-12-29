// Rutas para mensajes
const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const { check } = require('express-validator');

// Crear un mensaje
// api/messages
router.post(
    '/',
    [
        check('buyerShipping.buyerAddress1', 'Direccion Obligatoria').not().isEmpty().isLength({ max: 40 }),
        check('buyerShipping.buyerCity', 'Ciudad obligatoria').not().isEmpty().isLength({ max: 20 }),
        check('buyerShipping.buyerState', 'Dato ogligatorio').not().isEmpty().isLength({ max: 20 }),
        check('buyerShipping.buyerZip', 'Codigo postal Obligatorio').not().isEmpty().isLength({ max: 10 }),
    ],
    deliveryController.createDelivery);
    
router.get('/', deliveryController.getDeliverys);
router.get('/:id', deliveryController.getDelivery);
router.delete('/:id', deliveryController.deleteDelivery);

module.exports = router;