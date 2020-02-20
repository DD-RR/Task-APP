// Cargamos las bibliotecas
//Todo lo que se necesita para conectarse a la BD con MongoDB
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Encriotar contraseña con bcrypt
//Recibe un objeto con todas las propiedades para este esquema.
const userSchema = new  mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Correo Electronico Invalido')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('La contraseña no se ah ingresado');
            }
        } 
    },
    edad: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('La edad debe de ser un Número Entero Positivo')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// Forma manual para obtener el perfil del usuario
// userSchema.methods.getPublicProfile = function () {
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
} 

//Generación de Tokens
userSchema.methods.generateAuthToken = async function () {
    const user= this 
    const token = jwt.sign({ _id: user._id.toString() }, 'jsonwebtoken')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
//Busqueda de usuario con el correo y contraseña
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}


/* Haciendo lo anterios se tiene aceso al esquema de usuario, 
teniendo lo anterior solo es pasarlo como el segundo argumento
Dentro de la constante usuario de nuestro modelo de mongoose.
En este caso estamos creando un esquema y un modelo por separado */

//se utiliza el esquema creado para la realización de un middleware
/* El pre se usa para usarlo antes de un evento y se pasarán dos arumentos
El primero es el nombre del evento y el segundo es una funcion standar para ser ejecutada
Ya que desesmpeña un papel importante */
// hash en el password

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports= User