import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RatingStars from './RatingStars'
import { useEffect } from 'react'
import {fetchRecipes, 
        getAllRecipes, 
        editRecipe, 
        getFilterRecipes, 
        getUserSigninData, 
        setRecipe, 
        getEditRecipeStatus, 
        clearEditRecipeMessageStatus 
} from '../features/recipesSlice'
import FilterRecipes from './FilterRecipes'
import '../assets/styles/main.css'
const AllRecipes = () => {

const dispatch = useDispatch()
const navigate = useNavigate()

const allRecipes = useSelector(getAllRecipes)
const filter = useSelector(getFilterRecipes)
const userData = useSelector(getUserSigninData)
const editRecipeStatus = useSelector(getEditRecipeStatus)

const rate = useSelector(getEditRecipeStatus)


useEffect(()=>{
    if(rate.hasOwnProperty('message')){
        dispatch(fetchRecipes())
        dispatch(clearEditRecipeMessageStatus())
    }
    
    
},[rate])

//if user gets token from server during login login status will be set
//to true and will enable displaying of components that only signedin user
//can see
//const userSigninStatus = useSelector(getUserSigninStatus)

// const selectedDough = (name) => {
//     dispatch(setSelectedDough(Doughs.data.filter(item=>item.name === name)))
//     dispatch(setModal(true))
// }

const handleRating = (event, id, ingredients) => {
    
    const recipe = {
        param: id,
        data: {
            ingredients: ingredients,
            userRating: event,
            userRater:userData.user._id
        }
    }

    dispatch(editRecipe(recipe))

}

const getRecipe = (id) => {
    dispatch(setRecipe(Object.values(allRecipes).filter(item=>item._id === id)))
    navigate('/viewRecipe')
}

return(

        <Col 
        className='recipes' 
        xs={12} 
        md={{span:5,offset:1}} 
        lg={{span:5,offset:1}}  
        xl={{span:5, offset:1}} 
        style={{borderStyle:"solid",
        borderBottomStyle:'solid', 
        paddingLeft:'2%', paddingRight:'2%', marginRight:'10px', overflowY:'scroll'}}>

            {//enable user to see errors during rating of recipes
                editRecipeStatus.hasOwnProperty('error') && (
                    <Col xs={12} md={12} lg={12} xl={12}>
                        <Row>
                            <p style={{textAlign:'center', color:"red"}}>{editRecipeStatus.error}</p>
                        </Row>
                    </Col>
                )
            }
            

            <Row style={{marginTop:'2%', marginBottom:'2%', borderBottomStyle:'solid'}}>
                
                <Col>
                    <FilterRecipes /> 
                </Col> 

            </Row>
                
        {//display only recipes that have status active in db - SOFT DELETE
        Object.values(allRecipes)
        .filter(item => item.status==='active')
        //case insenstive filtering of data based on user input
        .filter(
            item=>item.title.toLowerCase().includes(filter.toLowerCase()))
        .map((item, index)=>{
            return(
                <Row 
    
                style={{borderBottomStyle:'solid', marginBottom:'10px'}} 
                key={index}>

                    <Col xs={7} md={6} lg={7} xl={7}>
                        <span>
                            <h4 onClick={()=>getRecipe(item._id)}>{item.title}</h4>
                            <p style={{fontSize:"12px"}}>{item.ingredients.map(item=>item + ', ')}</p>
                        </span>
                    </Col> 
    
                    <Col xs={5} md={6} lg={5} xl={5}>
                            <RatingStars
                                //check if user has rated recipe. If yes display his rating for given recipe. User is enabled
                                //to revise his rating. Average rating is calculated in updateRecipe controller on server
                                handleRating={(event, id, ingredients)=> handleRating(event, item._id, item.ingredients)} 
                                rating={item.userRaters.includes(userData.user._id) ? item.userRatings[item.userRaters.indexOf(userData.user._id)] : 0}
                            />
                        <p 
                        style={{fontSize:"12px", marginTop:'10px', textAlign:"right", marginRight:"20px"}}>{item.mealType}</p>
                          
                    </Col>  

                </Row> 
                )
            })
        }
    </Col>
) 
}

export default AllRecipes