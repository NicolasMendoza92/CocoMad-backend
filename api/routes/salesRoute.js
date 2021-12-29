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
        check('buyerData.buyerEmail', 'Agrega un Email Valido').isEmail().isLength({ max: 40 }),
        check('buyerData.buyerName', 'Nombre obligatorio').not().isEmpty().isLength({ max: 40 }),
        check('buyerData.buyerLastName', 'Apellido obligatorio').not().isEmpty().isLength({ max: 40 }),
        check('buyerConditions.pickUp', 'Elija Opcion').not().isEmpty(),
        check('buyerConditions.deliveryDate', '48hs de anticipacion').not().isEmpty(),
        check('buyerConditions.payMethod', 'Condicion obligatoria').not().isEmpty(),
    ],
    saleController.createSale
);
router.get('/', saleController.getSales);
router.get('/:id', saleController.getSale);
router.delete('/:id', saleController.deleteSale);

router.get('/', () => {});

module.exports = router;