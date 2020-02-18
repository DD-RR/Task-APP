// Cargamos las bibliotecas
//Todo lo que se necesita para conectarse a la BD con MongoDB
const mongoose = require('mongoose')
const validator = require('validator')

// Creación de Usuarios

const User = mongoose.model('User', {
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
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
    }
})

module.exports= User