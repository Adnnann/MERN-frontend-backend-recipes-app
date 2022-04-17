import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
import RatingStars from './RatingStars'
import { getAllRecipes } from '../features/recipesSlice'
import _ from 'lodash'
import '../assets/styles/main.css'
const LatestPublishedRecipes = () => {

const allRecipes = useSelector(getAllRecipes)

return(

<Col className='highestRatedRecipes'
style={{ borderStyle:'solid', borderColor:'black', overflowY:'scroll', marginTop:'5px',paddingLeft:'10px'}}>
        <Row style={{marginTop:'2%', marginBottom:'5%', borderBottomStyle:'solid'}}>
            <Col>
                <h3>Latest</h3>
            </Col> 
        </Row>
                
        {Object.keys(allRecipes).length !== 0 ? 

        _.chain(Object.values(allRecipes).filter(item=>item.status ==='active'))
        .orderBy('created', 'desc')
        .slice(0,5)
        .value()
        .map((item, index)=>{
            
                return(
                <Row style={{borderBottomStyle:'solid', marginBottom:'10px'}} 
                key={index}>


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
   
       : 'No data to display' }
</Col>
) 
}

export default LatestPublishedRecipes