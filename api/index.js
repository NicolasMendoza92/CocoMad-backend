// Importación de módulos de versiones anteriores
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan');
const bodyParser = require("body-parser");

// importamos las rutas que necesitamos.
const usersRoute = require('./routes/usersRoute')
const productsRoutes = require('./routes/productsRoute');
const authRoutes = require('./routes/authRoute');
const messagesRoutes = require('./routes/messagesRoute');
const profileRoutes = require('./routes/profileRoute');
const salesRoutes = require('./routes/salesRoute');
const deliveriesRoutes = require('./routes/deliveriesRoute');
const emailsRoutes = require('./routes/emailsRoute');

// Importante el orden de las funciones!!!
const whiteList = ["http://localhost:4000", "https://coco-mad-react.vercel.app", "http://localhost:3000"]
var corsOptions = {origin:whiteList}
// crear el servidor
const app = express();
// permitir acceso al serividor, para poder usarlo como una API y llamarlo de otra app react mia
app.use(cors(corsOptions));
app.use(morgan('dev'));

// Conectar a mongodb
mongoose.connect(process.env.MONGO_URL);

// Habilitar express.json (tambien se puede usar body parser)
app.use(express.json({ extended: true }));

// Habilitar urlencoded, para consultas desde postman en este formato
app.use(express.urlencoded({ extended: true }));

// codigos para la subida de imagen
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(express.json());

//importar rutas
app.use('/api/users', usersRoute)
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/emails', emailsRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/deliveries', deliveriesRoutes);


// puerto y arranque del servidor
app.listen(process.env.PORT || 4000, () => {
    console.log('Servidor Funcionando');
  })