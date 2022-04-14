const mongoose = require('mongoose');
const { ModuleFilenameHelpers } = require('webpack');

const ImageSchema = new mongoose.Schema({
    image:{
        type: String
    },
    imageUrl:{
        type:String
    }, 
    bookTitle:{
        
    }
})

const Image =  mongoose.model('Image', ImageSchema);
module.exports = Image