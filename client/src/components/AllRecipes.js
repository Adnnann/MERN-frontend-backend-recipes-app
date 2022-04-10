import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button'
import { useDispatch, useSelector } from 'react-redux'
//import { getUserSigninStatus, setModal, setSelectedDough } from '../../features/pizzaSlice'
import { useNavigate } from 'react-router-dom'
import Categories from '../assets/recipeCategories/recipeCategories'
import RatingStars from './RatingStars'
import Form from 'react-bootstrap/Form'
import { useEffect } from 'react'
import { fetchRecipes, getAllRecipes, editRecipe, getFilterRecipes, getUserSigninData } from '../features/recipesSlice'
import FilterRecipes from './FilterRecipes'
const AllRecipes = () => {

const dispatch = useDispatch()
const navigate = useNavigate()

const allRecipes = useSelector(getAllRecipes)
const filter = useSelector(getFilterRecipes)


// useEffect(()=>{
//     dispatch(fetchRecipes())
    
// },[dispatch])

//if user gets token from server during login login status will be set
//to true and will enable displaying of components that only signedin user
//can see
//const userSigninStatus = useSelector(getUserSigninStatus)

// const selectedDough = (name) => {
//     dispatch(setSelectedDough(Doughs.data.filter(item=>item.name === name)))
//     dispatch(setModal(true))
// }

const handleRating = (event, id) => {
    
    const recipe = {
        param: id,
        data: {
            userRating: event,
            userRater:id
        }
    }

    dispatch(editRecipe(recipe))

}

return(

        <Col  
        xs={12} 
        md={{span:5, offset:1}} 
        lg={{span:5, offset:1}}  
        xl={{span:5, offset:1}} 
        style={{borderStyle:"solid",
        borderBottomStyle:'solid', 
        paddingLeft:'2%', paddingRight:'2%', marginRight:'10px'}}>
            

        <Row style={{marginTop:'2%', marginBottom:'2%', borderBottomStyle:'solid'}}>
            <Col>
                <FilterRecipes /> 
            </Col> 
        </Row>
                
        {Object.values(allRecipes)
        .filter(
            item=>item.title.includes(filter.toUpperCase())
            || item.title.includes(filter.toLowerCase()))
        .map((item, index)=>{
            return(
                <Row style={{borderBottomStyle:'solid', marginBottom:'10px'}} key={index}>

                    <Col xs={7} md={7} lg={7} xl={7}>
                        <span>
                            <h4>{item.title}</h4>
                            <p style={{fontSize:"12px"}}>{item.ingredients.map(item=>item + ', ')}</p>
                        </span>
                    </Col> 
    
                    <Col xs={5} md={5} lg={5} xl={4}>
                            <RatingStars
                                handleRating={(event, id)=> handleRating(event, item._id)} 
                                rating={item.userRaters.includes(item._id) ? item.userRatings[item.userRaters.indexOf(item._id)] : 0}
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