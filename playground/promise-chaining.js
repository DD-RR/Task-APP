require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5e4b2f1f40a4cf082fdce744', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, edad) => {
    const user = await User.findByIdAndUpdate(id, { edad })
    const count = await User.countDocuments({ edad })
    return count
}

updateAgeAndCount('5e4b2f1f40a4cf082fdce744', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})