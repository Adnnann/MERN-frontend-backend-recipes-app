import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import AllRecipes from './AllRecipes'
import HighestRatedRecipes from './HighestRatedRecipes'
import { getUserSigninData } from '../features/recipesSlice'
import { useSelector } from 'react-redux'
const Home = () => {
    
    const userSigninData = useSelector(getUserSigninData)

    return(

        <Container>
            { userSigninData.hasOwnProperty('token') ?
                <Row>
                <AllRecipes />  
                <HighestRatedRecipes /> 
            </Row>
            : null}
        </Container>   
    )
}

export default Home