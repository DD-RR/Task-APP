const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

//Creacion de endpoints (Rutas para los tareas)
//Creacion de nuevas tareas
// Cambiando las promesas por async / await
router.post('/task', auth, async (req, res) => { 
    //En este punto hay que asegurar de que cuando se crea la tarea esta asociada con el usuario actual
    const task = new Task({
      ...req.body,
      propietario: req.user._id  
    })
    //Podemos cambiar el estado del la respuesta para ser más especifico en el ingreso de datos
    try {
        await task.save()
        res.status(210).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Busqueda de todos las Tareas en la db
router.get('/task', auth, async (req, res) => {
    // Esto recupera todos las tareas almacenados en la bd
    try {
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Busqueda por ID de la DB
router.get('/task/:id', auth, async (req, res) => {
     //Creamos una variable para obtener el valor del id que se va a buscar
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, propietario: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (err) {
        res.status(500).send() 
    }

})

//Actualización de Tareas by Id
router.patch('/task/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    //Actualizaciones permitidas
    const allowedUpdates = ['descripcion', 'completada']
    //Determinar si las actualizaciones se pueden encontrar dentro de las permitidas 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(404).send({ error: 'Actualizaciones Invalidas!' })
    } 
    try {
        //Actualizaciones dinamicas
        const task = await Task.findOne({_id: req.params.id, propietario: req.user._id}) 
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Eliminación de Tareas
router.delete('/task/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, propietario: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router