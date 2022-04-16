const mongoose = require('mongoose')

const RecipesSchema = new mongoose.Schema({
    createdBy:{
        type:String
    },
    authorId:{
        type:String
    },
    title:{
        type: String,
        required:'Recipe title is required',
    },
    description:{
        type: Object,
        required:'Address is required',
        match:[/^[a-zA-Z\s]+$/, 'Only letters can be used for description']

    },
    category:{
        type:String,
        required:'Category'    
    },
    instructions:{
        type:String,
        required:'Intructions are required',
    },
    userRatings:{
        type:Array
    },
    userRaters:{
        type:Array
    },
    rating:{
        type: String,
        default:0
    },
    ingredients:{
        type: Array,
        required: 'Enter at least on ingredient'
    },
    created:{
        type: Date,
        default: Date.now
    },
    numberOfRaters:{
        type:Number,
        default:0
    },
    image:{
        type:String
    },
    status:{
        type:String,
        default:'active'
    },
    updated: Date
})

RecipesSchema.path("title").validate(async function (title) {
    
    const Recipe = await this.constructor.findOne({ title });    
    
    if (Recipe) {    
        
        if (this.id === Recipe.id) {    
            return true;    
        }    
     
        return false;    
    
    }   

    return true;   

}, `Please use different title.!`);

// RecipesSchema.pre('updateOne', function (next) {
//     const update = this.getUpdate();
//     // this is where it gets ugly (i would also have to check the .$set...
//     this.update({}, { rating: this.userRatings.reduce((prev, curr)=>prev+curr) / this.userRaters.length });
//     next()
// })




const Recipe = mongoose.model('Recipe', RecipesSchema)
module.exports = Recipe