// Importación de módulos de versiones anteriores
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan');
// importamos las rutas que necesitamos.
const usersRoute = require('./routes/usersRoute')
const productsRoutes = require('./routes/productsRoute');
const authRoutes = require('./routes/authRoute');
const messagesRoutes = require('./routes/messagesRoute');
const profileRoutes = require('./routes/profileRoute');
const salesRoutes = require('./routes/salesRoute');


// Importante el orden de las funciones!!!

// crear el servidor
const app = express();
// permitir acceso al serividor, para poder usarlo como una API y llamarlo de otra app react mia
app.use(cors());

app.use(morgan('dev'));

// Conectar a mongodb
mongoose.connect(process.env.MONGO_URL);

// Habilitar express.json (tambien se puede usar body parser)
app.use(express.json({ extended: true }));

// Habilitar urlencoded, para consultas desde postman en este formato
app.use(express.urlencoded({ extended: true }));

//importar rutas
app.use('/api/users', usersRoute)
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/sales', salesRoutes);

// puerto y arranque del servidor
app.listen(process.env.PORT || 4000, () => {
    console.log('Servidor Funcionando');
  })