require('../src/db/mongoose')
const Task = require('../src/models/task')

/* Task.findByIdAndDelete('5e4c16b51bb6c108a7931524').then((task) => {
    console.log(task)
    return Task.countDocuments({ completada: true })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
}) */

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completada: false })
    return count
}

deleteTaskAndCount('5e4c16b51bb6c108a7931524').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})