//Todo lo que se necesita para conectarse a la BD con MongoDB
const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    correo:{
        type: String,
        required: true,
        trim: true,
        lowercase: true, 
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Correo Invalido')
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

const me = new User({
    nombre: '    Diego     ',

    correo: 'MIEMAIL@AOL.IO     '
})

me.save().then(() => {
    console.log(me);
}).catch((err) => {
    console.log('Error!', err);
})

const Task = mongoose.model('Task', {
    descripcion: {
        type: String,
        required: true
    },
    completada: {
        type: Boolean
    }
})

/* const task = new Task({
    descripcion: 'Aprender Como usar la libreria de Mongoose',
    completada: true
})

task.save().then(() => {
    console.log(task);
}).catch((err) => {
    console.log('Erro!', err);   
}) */