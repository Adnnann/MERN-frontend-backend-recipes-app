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
        required:'Name of Recipe is required',
        match:[/^[a-zA-Z0-9\s]+$/, 'Only letters can be used for title']
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
        type: String
    },
    ingredients:{
        type: Array,
        Required: 'Enter at least on ingredient'
    },
    numberOfRaters:{
        type:Number
    }
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