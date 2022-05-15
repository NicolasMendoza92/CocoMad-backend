const nodemailer = require("nodemailer");
const Email = require('../models/Email');
const Product = require('../models/Product');

exports.createEmail = async (req, res, next) => {

  const { buyerEmail, buyerName, pickUp, deliveryDate, deliveryHour, productsList, sendPrice, discount } = req.body

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

  let subTotal = sales.reduce((total, { producto, quantity }) => total + producto.price * quantity, 0);
  let total = sendPrice + subTotal - discount

  //nueva venta
  const email = new Email(req.body);
  //guardar venta
  await email.save();


  try {

    const transporter = nodemailer.createTransport({
      host: process.env.PASS_HOST,
      port: process.env.PASS_PORT,
      secure: true,
      auth: {
        user: process.env.PASS_USER, // generated gmail user
        pass: process.env.PASS_GMAIL, // generated gmail password (auth 2 pasos)
      },
      proxy: process.env.HTTP_PROXY,
    });
    transporter.verify().then(() => {
      console.log('listo para enviar')
    })
    console.log(sales)
    const response = await transporter.sendMail({
      from: '"CocoMad Bakery" <nmapi2022@gmail.com>', // sender address
      to: buyerEmail, // list of receivers
      subject: `Datos de Pedido `,
      html: `
    <div class="d-flex justify-content-start">
       <h4> Hola ${buyerName}! Muchas Gracias por tu pedido! </h4>
       <h4> ¡Ya casi terminamos! </h4>
       <h5> Recuerda que para finalizar el pedido es necesario coordinar el pago por <a href="https://wa.me/c/34635790277" target="blank"> WhatsApp </a> </h5>
      <ul >
         <li> Dia de Retiro/Envio : ${deliveryDate} </li>
         <li> Rango Horario: ${deliveryHour} </li>
         <li> ¿Recoge de Tienda? : ${pickUp} </li>
         <li> SubTotal : ${subTotal.toFixed(2)} EUR </li>
         <li> Envio: ${sendPrice} EUR </li>
         <li> Descuento: ${discount} EUR </li>
         <li> Pagas: ${total.toFixed(2)} EUR </li>
      </ul>
      <hr style="width:30%;text-align:left;margin-left:0" >
     <b> Detalle del Pedido: </b>
     <table class="table">
     <thead>
      <tr class="text-center" >
         <th>Imagen</th>
         <th>Producto</th>
         <th>Precio</th>
         <th>Cantidad</th>
         <th>Sub Total</th>
      </tr>
     </thead>
     <tbody>
        ${sales.map(product => `
        <tr class="text-center " >
         <td><img style="width:80px;" src=" ${product.producto.image}"/></td>
         <td> ${product.producto.name} </td>
         <td> ${product.producto.price} € </td>
         <td>${product.quantity} un </td>
         <td> ${(product.producto.price * product.quantity).toFixed(2)} € </td>
        </tr>
        `)} 
     </tbody>
     </table>
     <hr style="width:30%;text-align:left;margin-left:0" >
     <p> No te quedes sin tus productos CocoMad!</p>
     <p> Gracias por confiar en CocoMad Bakery </p>
    </div>
    `});

    console.log(response)
    // next();
    //Email de exito
    res.json({ msg: 'Email enviado  Correctamente' });
    // res.header('Access-Control-Allow-Origin', "*");
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');     
    // res.header('Access-Control-Allow-Headers', 'Content-Type');

  }
  catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
  }

};
