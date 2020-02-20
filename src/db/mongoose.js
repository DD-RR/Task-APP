//Todo lo que se necesita para conectarse a la BD con MongoDB
const mongoose = require('mongoose')

// Definimos la URl y el nombre de la base de datos para la coneción con MongoDb
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})