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
import '../assets/styles/main.css'
const HighestRatedRecipes = () => {


const dispatch = useDispatch()
const navigate = useNavigate()

const allRecipes = useSelector(getAllRecipes)


return(

    <Col className='highestRatedRecipes' 
    style={{ borderStyle:'solid', borderColor:'black', overflowY:'scroll', paddingLeft:'10px'}}>
        <Row style={{marginTop:'2%', marginBottom:'5%', borderBottomStyle:'solid'}}>
            <Col>
                <h3>Highest rated recipes</h3>
            </Col> 
        </Row>
                
        {Object.keys(allRecipes).length !== 0 ? 

        _.chain(Object.values(allRecipes)
        .filter(item=>Number(item.numberOfRaters) > 2 && item.status==='active'))
        .orderBy('rating', 'desc')
        .slice(0,10)
        
        .value()
        .map((item, index)=>{
            
                return(
                <Row style={{borderBottomStyle:'solid', marginBottom:'10px'}} key={index}>


                    <Col xs={7} md={7} lg={7} xl={7} >
                            <h4>{item.title.length > 17 ? item.title.substr(0, 17 ) + '...' : item.title}</h4>
                    </Col> 
    
                    <Col xs={5} md={5} lg={5} xl={4} style={{pointerEvents:'none'}}>
                            <RatingStars 
                                rating={Number(item.rating)}
                            />
                    </Col> 
    
                   
                </Row> 
                )
    
            
            })
   
       : 'No data to display' }
       </Col>
) 
}

export default HighestRatedRecipes