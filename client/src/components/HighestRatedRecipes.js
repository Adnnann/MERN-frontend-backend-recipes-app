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
import { fetchRecipes, getAllRecipes } from '../features/recipesSlice'
import _ from 'lodash'
const HighestRatedRecipes = () => {


const dispatch = useDispatch()
const navigate = useNavigate()

const allRecipes = useSelector(getAllRecipes)

//if user gets token from server during login login status will be set
//to true and will enable displaying of components that only signedin user
//can see
//const userSigninStatus = useSelector(getUserSigninStatus)

// const selectedDough = (name) => {
//     dispatch(setSelectedDough(Doughs.data.filter(item=>item.name === name)))
//     dispatch(setModal(true))
// }

return(

    <Col xs={12} md={5} lg={5}  xl={5} style={{borderStyle:'solid', borderColor:'black'}}>   

        <Row style={{marginTop:'2%', marginBottom:'5%', borderBottomStyle:'solid'}}>
            <Col>
                <h3>Top Ratings</h3>
            </Col> 
        </Row>
                
        {Object.keys(allRecipes).length !== 0 ? 

        _.chain(Object.values(allRecipes)
        .filter(item => item.numberOfRaters > 2)
        
        )
        .orderBy('rating', 'desc')
        .slice(0,4)
        
        .value()
        .map((item, index)=>{
            
                return(
                <Row style={{borderBottomStyle:'solid', marginBottom:'10px'}} key={index}>

                    <Col xs={7} md={7} lg={7} xl={7}>
                            <h4>{item.title}</h4>
                    </Col> 
    
                    <Col xs={5} md={5} lg={5} xl={4} style={{pointerEvents:'none'}}>
                            <RatingStars 
                                rating={Number(item.rating)}
                            />
                    </Col> 
                   
                </Row> 
                )
    
            
            })
   
       : 'Loading..' }
    </Col>
) 
}

export default HighestRatedRecipes