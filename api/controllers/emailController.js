const nodemailer = require("nodemailer");
const Email = require('../models/Email');
const Product = require('../models/Product');

exports.createEmail = async (req, res) => {

  const { buyerEmail, buyerName, pickUp, deliveryDate, payMethod, deliveryHour, productsList } = req.body


  //Me trae los datos del producto con el post.
  let sales = [];
  console.log(req.body)
  const getProduct = async (prod) => {
    let products = await Product.findById(prod.productId);
    return products;
  };
  for (let j = 0; j < productsList.length; j++) {
    const item = productsList[j];
    const producto = await getProduct(item);
    sales.push({ producto, quantity: item.quantity });
  }


  //nueva venta
  const email = new Email(req.body);
  //guardar venta
  await email.save();


  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'nicomendoza.92@gmail.com', // generated gmail user
        pass: 'kqdiflvuejlomews', // generated gmail password (auth 2 pasos)
      },
    });
    transporter.verify().then(() => {
      console.log('listo para enviar')
    })
console.log(sales)
    const response = await transporter.sendMail({
      from: '"CocoMad Bakery" <nicomendoza.92@gmail.com>', // sender address
      to: buyerEmail, // list of receivers
      subject: `Confirmación de Compra `,
      html: `
      <h4> Hola ${buyerName}! Gracias por tu compra <h4>
      <p> Puedes presentar este correo como prueba <p>
     <ul>
         <li> Dia de Retiro/Envio : ${deliveryDate} </li>
         <li> Hora de Retiro/Envio : ${deliveryHour} </li>
         <li> Recoge de tienda? : ${pickUp} </li>
        <li> Metodo de Pago : ${payMethod} </li>
     </ul>
     <b> Tu pedido es: <b>
     ${sales.map(product => `
     <ul>
     <img style="width:300px;" src=" ${product.producto.image}"/>
         <li> ${product.producto.category} </li>
         <li> ${product.producto.name} </li>
         <li> Cantidad:  ${product.quantity} </li>
         <li> Pagas:  ${product.producto.price} </li>
         
     </ul>
     `)} 
     `
    });

    console.log(response)

      //Email de exito
  res.json({ msg: 'Email enviado  Correctamente' });
  }
  catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
  }

};
