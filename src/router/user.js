const express = require('express')
const router = new express.Router()
const User = require('../models/user')

//Creacion de endpoints (Rutas para los usuarios)
router.post('/users', async (req, res) => {
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
router.get('/users', async (req, res) => {
    // Esto recupera todos los usuarios almacenados en la bd
    try {
        const user = await User.find({})
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Busqueda por ID de la DB
router.get('/users/:id', async (req, res) => {
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

//Actualización de Usuarios by Id
router.patch('/users/:id', async (req, res) => {
    //
    const updates = Object.keys(req.body)
    //Actualizaciones permitidas
    const allowedUpdates = ['nombre', 'correo', 'edad', 'password']
    //Determinar si las actualizaciones se pueden encontrar dentro de las permitidas 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(404).send({ error: 'Actualizaciones Invalidas!' })
    } 
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Eliminación de Usuarios
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router