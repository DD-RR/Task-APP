// Cargamos las bibliotecas
//Todo lo que se necesita para conectarse a la BD con MongoDB
const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    descripcion: {
        type: String,
        required: true
    },
    completada: {
        type: Boolean
    }
})

module.exports = Task