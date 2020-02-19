// Librerias que se van a usar
const express = require('express')
// No deseamos tomar nada de aqui solo se desa conectar a la base de datos 
require('./db/mongoose')
// Cargamos el Usuario y Tareas
const User = require('./models/user')
const Task = require('./models/task')
// Cargamos los enrutadores
const userRouter= require('./router/user')
const taskRouter= require('./router/task')

// Creando nuevas aplicaciones en express
const app = express()
const port = process.env.PORT || 3000

// Configuración de Post para pasar los json
app.use(express.json())

//Aqui se ingresan todas las rutas exportadas de archivos externos
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Servidor levantado en el puerto: ' + port);
})

const bcrypt = require('bcryptjs')
const myFunction = async () =>{
    const password = 'Red12345'
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare('Red12345/', hashedPassword)
    console.log(isMatch);
}

myFunction()