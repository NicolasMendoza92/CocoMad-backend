// Rutas para memes 
const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productController')

// cuando recibamos una consulta de tipo (post,get, ... se va a llamar a la funcion que esta en productController)
router.post('/', productControllers.createProduct);
router.get('/', productControllers.getProducts);
// cuando pongo /:xx - estoy diciendo que despues de la / sera ese xx que defini
router.put('/:id', productControllers.modifyProduct);
router.get('/:id', productControllers.getProduct);
router.delete('/:id', productControllers.deleteProduct);

module.exports = router;