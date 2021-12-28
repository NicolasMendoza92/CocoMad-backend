const Sale = require('../models/Sale');
const { validationResult } = require('express-validator');
const Product = require('../models/Product');


exports.createSale = async (req, res) => {
    // revisamos los errores
    //middleware
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }

    try {
        let sale = req.body;

        //Me trae los datos del producto con el post.
        let sales = [];
        const getProduct = async (prod) => {
            let products = await Product.findById(prod.productId);
            return products;
        };
        for (let j = 0; j < sale.productsList.length; j++) {
            const item = sale.productsList[j];
            const producto = await getProduct(item);
            sales.push({ producto, quantity: item.quantity });
        }
        sale.productsList = sales;
       
        //nueva venta
        sale = new Sale(req.body);
        //guardar venta
        await sale.save();

        //venta de exito
        res.json({ msg: 'Venta realizada Correctamente' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};

exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.find();
        res.send(sales);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};
exports.getSale = async (req, res) => {
    try {
        const sales = await Sale.findById(req.params.id).select('buyerData buyerShipping productsList buyerCard');
        res.send(sales);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};

exports.deleteSale = async (req, res) => {
    try {
        await Sale.findByIdAndDelete(req.params.id);
        res.send('venta eliminada');
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};