//Operaciones CRUD (ABC) para la aplicación de Administrador de Tareas 

const { MongoClient, ObjectID } = require('mongodb')

//Definimos la URl para la coneción con la BD de mongo
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('No se ah podido Conectar con la Base de Datos (Intente Nuevamente)');
    }
    const db = client.db(databaseName)
    
   

})