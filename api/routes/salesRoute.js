// Rutas para Ventas
const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const { check } = require('express-validator');

// Crear un venta
// api/sales
router.post(
    '/',
    [
        check('buyerData.buyerEmail', 'Agrega un Email Valido').isEmail().isLength({ max: 20 }),
        check('buyerData.buyerName', 'Nombre obligatorio').not().isEmpty().isLength({ max: 40 }),
        check('buyerData.buyerLastName', 'Apellido obligatorio').not().isEmpty().isLength({ max: 30 }),
        check('buyerShipping.buyerCity', 'Ciudad Obligatoria').not().isEmpty(),
        check('buyerShipping.buyerState', 'Estado Obligatorio').not().isEmpty(),
        check('buyerShipping.buyerZip', 'Zip Code obligatorio').not().isEmpty(),
        check('buyerCard.buyerCardNumber', 'Numero obligatorio').not().isEmpty(),
        check('buyerCard.buyerCardName', 'Nombre obligatorio').not().isEmpty().isLength({ max: 40 }),
        check('buyerCard.buyerCardDate', 'Fecha obligatoria').not().isEmpty(),
        check('buyerCard.buyerCardCode', 'Codigo Seguridad obligatorio').not().isEmpty(),
    ],
    saleController.createSale
);
router.get('/', saleController.getSales);
router.get('/:id', saleController.getSale);
router.delete('/:id', saleController.deleteSale);

router.get('/', () => {});

module.exports = router;