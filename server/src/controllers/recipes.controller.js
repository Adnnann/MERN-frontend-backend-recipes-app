import Recipe from '../models/recipe.model'
import _, { indexOf } from 'lodash'
import dbErrorHandlers from './helpers/dbErrorHandlers'
const createRecipe = (req, res) => {

    const recipe = new Recipe(req.body) 
    recipe.save((err)=>{
    
        if(err){
          return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }

      return res.send({message: 'Recipe successfuly created'})
    })
}
const getRecipes = (req, res) => {
    
    Recipe.find({})
    .exec((err, Recipes) => {
        if(err){
          return res.send({error:dbErrorHandlers.getErrorMessage(err)})
        }
     return res.send(Recipes)
    })
}

const getRecipe =  (req, res) => {
   res.status(200).json(req.profile)
}
const updateRecipe = (req, res, next) => {

    let Recipe = req.profile

    Recipe = _.extend(Recipe, req.body);

    //if user is not rating same produce for the first time push his rating in array
    //otherwise change his previous rating 
    if(Recipe.userRaters.includes(req.body.userRater)){
       let index = Recipe.userRaters.indexOf(req.body.userRater)
       Recipe.userRatings[index] = req.body.userRating
    }else{
        Recipe.userRaters.push(req.body.userRater)
        Recipe.userRatings.push(req.body.userRating)
    }
    //calculate rating - sum of all elements in userRatting arr divided by number of raters
    Recipe.rating = Recipe.userRatings.reduce((prev, curr)=>prev+curr) / Recipe.userRaters.length
    Recipe.numberOfRaters = Recipe.userRaters.length

    Recipe.updated = Date.now()
    Recipe.save(err=>{
        if(err){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
      return res.send({message: 'Data updated'})
    })
}

const removeRecipe = (req, res, next) => {
    
    let Recipe = req.profile
    Recipe.remove((err)=>{
        if(err){
            return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
       return res.send({message:'Recipe deleted'})
    })
}
  

const recipeByID = (req, res, next, id) => {
    Recipe.findById(id).exec((err, Recipe) => {
        if(err || !Recipe){
          return res.send({error: dbErrorHandlers.getErrorMessage(err)})
        }
    req.profile = Recipe;

    next()
    
    })
}

export default {
    createRecipe,
    getRecipes,
    updateRecipe,
    removeRecipe,
    getRecipe, 
    recipeByID
}
