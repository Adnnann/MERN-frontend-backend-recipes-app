const mongoose = require('mongoose')
const Recipes = require('./src/models/recipe.model')
const Users = require('./src/models/user.model')
const Images = require('./src/models/image.model')
const config = require('./src/config/config')


mongoose
.connect(config.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB successfully connected...'))
.catch((e) => console.log(e))

const deleteSeed = async() => {
    await Users.deleteMany({})
    await Recipes.deleteMany({})
    await Images.deleteMany({})
}

deleteSeed()
.then(()=>{
    mongoose.connection.close()
})
.catch((err) => console.log(err))