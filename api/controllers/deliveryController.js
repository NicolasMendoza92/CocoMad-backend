const Delivery = require('../models/Delivery');
const { validationResult } = require('express-validator');
const Product = require('../models/Product');

exports.createDelivery = async (req, res) => {
    // revisamos los errores
    //middleware
    const errorFormatter = ({ msg }) => {
        // es para darle el formato al JSON del error 
        return `${msg}`;
      };
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
    try {
        let delivery = req.body;

          //Me trae los datos del producto con el post.
          let entregas = [];
          const getProduct = async (prod) => {
              let products = await Product.findById(prod.productId);
              return products;
          };
          for (let j = 0; j < delivery.productsList.length; j++) {
              const item = delivery.productsList[j];
              const producto = await getProduct(item);
              entregas.push({ producto, quantity: item.quantity });
          }
          delivery.productsList = entregas;

        //nueva direccion
        delivery = new Delivery(req.body);

        //guardar direccion
        await delivery.save();

        //mensaje de exito
        res.json({ msg: 'Direccion Completada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};

exports.getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.send(deliveries);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};

exports.getDelivery = async (req, res) => {
    try {
        const deliveries = await Delivery.findById(req.params.id).select('buyerData productsList buyerConditions buyerShipping');
        res.send(deliveries);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};

exports.deleteDelivery = async (req, res) => {
    try {
        await Delivery.findByIdAndDelete(req.params.id);
        res.send('venta eliminada');
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};