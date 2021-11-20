const User = require("../models/User");
const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    // revisamos errores 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
    }
    // desectructuracion de prop del objeto
    const { email, password} = req.body;

    try {
        // Revisando q el email sea unico
        let userfind = await User.findOne({ email });
        if (userfind) {
            return res.status(400).send('Ya existe cuenta con este Email');
        }

        // nuevos usuarios, hacemos que todos los logeados sean user comunes
        const bodyUser = { ...req.body, role: 'user', register: new Date() };

        // nuevo usuario
        let user = new User(bodyUser);

        //hashear el password
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

// funcion para logearse y validarse 
exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        // desesctructuramos las prop, esto es lo que se le pedira al usuario cuando se logee 
        const { email, password } = req.body;

        // vemos las validaciones, busca si ya existe algno registrado con el metodo findOne en el user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json('usuario no existe');
        }
        // codigo para revisar password y encriptarla 
        const passCorrect = await bcryptjs.compare(password, user.password);
        if (!passCorrect) {
            return res.status(400).json('Password incorrecto');
        }

        // Si todo es correcto en las validaciones Crear y firmar JWT (el token - alfanumerico de datos) - codigo para realizarlo
        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        jwt.sign(
            payload,
            // usamos la vble de entorno como el url de mongo 
            process.env.SECRET,
            {
                expiresIn: 360000, //1 hora
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token, name: user.name });
            }
        );

    } catch (error) {
        res.status(400).send('error de conexion');
    }
};

// funcion para obtener usuario autenticado 

exports.getUserAuthentic = async (req, res) => {
    // Leer token - esto lo hacemos en header ( es una parte de la request como el body donde podemos enviar datos )
    const token = req.header('x-auth-token');

    // Revisar Token
    if (!token) {
        // esto es para cuando el usuario no esta logeado
        return res.status(401).json('No hay Token, permiso no valido');
    }
    // Validar Token
    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        // aca hacemos como un cifrado y le indicamos que es lo que queremos que muestre cuando llamo a la response.data de la API.
        const user = await User.findById(cifrado.user.id).select('name role email');
        res.send(user);
    } catch (error) {
        res.status(401).json('Token no valido');
    }
};


