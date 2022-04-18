import React from 'react'
import Row from 'react-bootstrap/Row'
import AllRecipes from './AllRecipes'
import HighestRatedRecipes from './HighestRatedRecipes'
import LatestPublishedRecipes from './LatestPublishedRecipes'
import { getUserSigninData } from '../features/recipesSlice'
import { useSelector } from 'react-redux'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/Container'
const Home = () => {
    
    const userSigninData = useSelector(getUserSigninData)

    return(

       
        <Col style={{overflowY:'unset', overflowX:'unset'}} xs={12} md={12} lg={12}  xl={12}>
       
            { userSigninData.hasOwnProperty('token') ?
                <Row>
                <AllRecipes />  
                
                <Col xs={12} md={5} lg={5}  xl={5} style={{paddingLeft:'2px', paddingRight:'2px'}}>   
                    <HighestRatedRecipes />   
                    <LatestPublishedRecipes /> 
                </Col>
            </Row>
            : null}
            </Col>
            
  
    )
}

export default Home