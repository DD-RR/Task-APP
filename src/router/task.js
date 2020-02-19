const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

//Creacion de endpoints (Rutas para los tareas)

// Cambiando las promesas por async / await
router.post('/task', async (req, res) => {
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
router.get('/task', async (req, res) => {
    // Esto recupera todos las tareas almacenados en la bd
    try {
        const task = await Task.find({})
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Busqueda por ID de la DB
router.get('/task/:id', async (req, res) => {
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

//Actualización de Tareas by Id
router.patch('/task/:id', async (req, res) => {
    //
    const updates = Object.keys(req.body)
    //Actualizaciones permitidas
    const allowedUpdates = ['descripcion', 'completada']
    //Determinar si las actualizaciones se pueden encontrar dentro de las permitidas 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(404).send({ error: 'Actualizaciones Invalidas!' })
    } 
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Eliminación de Tareas
router.delete('/task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router