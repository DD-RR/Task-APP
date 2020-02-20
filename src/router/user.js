const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

//Creacion de endpoints (Rutas para los usuarios)
router.post('/users', async (req, res) => {
    // Creamos una nueva instancia de Usuario dentro del controlador de ruta
    const user = new User(req.body) //Pasamos un objeto con todos los atributos que deseamos configurar
    // Ponemos la variable await y así podra salvar todo el objeto usuario.
    //Esta linea se ejecuta si se cumple con la promesa anterior
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
}) 

//Inicio de Sesión Usuarios
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        //Forma manual para obtener el perfil del usuario
        // res.send({user: user.getPublicProfile(), token})
        res.send({user: user, token}) 
    } catch (e) {
        res.status(400).send()
    }
})

//Cerrar seisón usuarios
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }

})

//Cerrar todas las sesiones de los usuarios
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send
    } catch (e) {
        res.status(500).send()
    }

})


//Busqueda de todos los Usuarios de la db
router.get('/users/me', auth , async (req, res) => {
    res.send(req.user)
})

//Actualización de un unico usuario
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    //Actualizaciones permitidas
    const allowedUpdates = ['nombre', 'email', 'edad', 'password']
    //Determinar si las actualizaciones se pueden encontrar dentro de las permitidas 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones Invalidas!' })
    } 

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Eliminación de Usuarios
router.delete('/users/:me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router