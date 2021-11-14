const bcryptjs = require('bcryptjs');
// Importamos el User modelo por que lo vamos a nombrar
const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

// funcion para crear usuarios y guardarlos en array 
exports.createUser = async (req, res) => {
  // revisamos errores 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  // definimos lo que queremos que el usuario coloque para crear su usuario 
  const { email, password } = req.body;

  try {
    // revisamos email unico 
    let userfind = await User.findOne({ email });
    if (userfind) {
      return res.status(400).send('Ya existe cuenta con este Email');
    }

    let user = new User(req.body);

    //hashear el password - codigo para poner el password no visible
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //guardar usuario
    await user.save();

    //mensaje de exito
    res.send("Usuario Creado Correctamente");
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(400).send('Hubo un error en la conexion a la base de datos');
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email');
    res.send(user);
  } catch (error) {
    res.status(400).send('Hubo un error en la conexion a la base de datos');
  }
};

exports.modifyUser = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ msg: errores.array() });
  }
  try {
    const user = await User.findById(req.params.id);
    // en esta linea estamos diciendo que el body del "input" este completo si o si-
    if (!req.body.role) {
      return res.status(400).send('Dato  incompleto');
    }
    user.role = req.body.role;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send('Hubo un error en la conexion a la base de datos');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('usuario eliminado');
  } catch (error) {
    res.status(400).send('Hubo un error en la conexion a la base de datos');
  }
};
