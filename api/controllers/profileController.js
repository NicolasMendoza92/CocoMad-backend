const bcryptjs = require('bcryptjs');
// Importamos el User modelo por que lo vamos a nombrar
const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');


exports.modifyProfile = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ msg: errores.array() });
  }
  try {
    const user = await User.findById(req.params.id);
    // en esta linea estamos diciendo que el body del "input" este completo si o si-
    if (!req.body.name) {
        return res.status(400).send('Dato de nombre incompleto');
    }
    user.name = req.body.name;
    if (!req.body.lastName) {
        return res.status(400).send('Dato de apellido incompleto');
    }
    user.lastName = req.body.lastName;
    if (!req.body.email) {
        return res.status(400).send('Dato de email incompleto');
    }
    user.email = req.body.email;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send('Hubo un error en la conexion a la base de datos');
  }
};