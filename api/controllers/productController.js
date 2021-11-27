// Importo el esquema del modelo objeto (meme)
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

exports.createProduct = async (req, res) => {
  try {
    //nuevo producto
    const product = new Product(req.body);
    res.send('Producto creado');
    //guardar producto
    await product.save();
} catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
}
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
} catch (error) {
    res.status(400).send('Hubo un error en la conexion a la base de datos');
}
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.send('Producto eliminado');
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.modifyProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // validamos si se envia un dato que no es acorde, no lo modifique 
    if (req.body.hasOwnProperty('name')) {
      product.name = req.body.name;
    }
    if (req.body.hasOwnProperty('image')) {
      product.image = req.body.image;
    }
    if (req.body.hasOwnProperty('imageDetail')) {
      product.imageDetail = req.body.imageDetail;
    }
    if (req.body.hasOwnProperty('price')) {
      product.price = req.body.price;
    }
    if (req.body.hasOwnProperty('category')) {
      product.price = req.body.category;
    }
    await product.save();
    res.send(product)
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);

  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};