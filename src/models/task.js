// Cargamos las bibliotecas
//Todo lo que se necesita para conectarse a la BD con MongoDB
const mongoose = require('mongoose')

// La tarea se almanecara el id de Usuario que la creo
const Task = mongoose.model('Task', {
    descripcion: {
        type: String,
        required: true
    },
    completada: {
        type: Boolean,
        default: false
    },
    // Los datos almacenados y el propietario van hacer un objeto id
    propietario: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
    }
})

module.exports = Task


/* Existen dos maneras en que podemos tener una relación entre los usuarios y las tareas
 1. Se podra almacenar con el id, de toas las tareas que ah creado 
 2. La tarea individual se ingresara por id de Usuario (Este es el mejor efoque para la resolución de este problema)
*/