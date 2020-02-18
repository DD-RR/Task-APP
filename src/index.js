// Librerias que se van a usar
const express = require('express')
// No deseamos tomar nada de aqui solo se desa conectar a la base de datos 
require('./db/mongoose')
// Cargamos el Usuario y Tareas
const User = require('./models/user')
const Task = require('./models/task')

// Creando nuevas aplicaciones en express
const app = express()
const port = process.env.PORT || 3000

// Configuración de Post para pasar los json
app.use(express.json())

//Creacion de endpoints (Rutas para los usuarios)
app.post('/users', async (req, res) => {
    // Creamos una nueva instancia de Usuario dentro del controlador de ruta
    const user = new User(req.body) //Pasamos un objeto con todos los atributos que deseamos configurar
    // Ponemos la variable await y así podra salvar todo el objeto usuario.
    //Esta linea se ejecuta si se cumple con la promesa anterior
    try {
        await user.save()
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err)
    }
    
    
}) 
//Busqueda de todos los Usuarios de la db
app.get('/users', async (req, res) => {
    // Esto recupera todos los usuarios almacenados en la bd
    try {
        const user = await User.find({})
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Busqueda por ID de la DB
app.get('/users/:id', async (req, res) => {
     //Creamos una variable para obtener el valor del id que se va a buscar
    const _id = req.params.id
    try {
        const user = await User.findById({_id})
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (err) {
        res.status(500).send() 
    }

})


//Creacion de endpoints (Rutas para los tareas)
// Cambiando las promesas por async / await
app.post('/task', async (req, res) => {
    const task = new Task(req.body)
    //Podemos cambiar el estado del la respuesta para ser más especifico en el ingreso de datos
    try {
        await task.save()
        res.status(210).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Busqueda de todos las Tareas de la db
app.get('/task', async (req, res) => {
    // Esto recupera todos las tareas almacenados en la bd
    try {
        const task = await Task.find({})
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Busqueda por ID de la DB
app.get('/task/:id', async (req, res) => {
     //Creamos una variable para obtener el valor del id que se va a buscar
    const _id = req.params.id

    try {
        const task = await Task.findById({_id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (err) {
        res.status(500).send() 
    }

})

app.listen(port, () => {
    console.log('Servidor levantado en el puert: ' + port);
})

