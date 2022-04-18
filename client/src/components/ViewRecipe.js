
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import Container from "react-bootstrap/esm/Container"
import Form from 'react-bootstrap/esm/Form'
import Card from 'react-bootstrap/esm/Card'
import { useSelector, useDispatch } from "react-redux"
import {getAllRecipes, 
        getRecipe, 
        getUserSigninData, 
        getUserToken, 
        userToken, 
        resetStore, 
        setEditRecipeModal,
        setRecipe,
        setRecipeToEdit,
        editRecipe,
        getEditRecipeStatus,
        fetchRecipes,
        clearEditRecipeMessageStatus
} from "../features/recipesSlice"
import RatingStars from "./RatingStars"
import '../assets/styles/main.css'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import noImg from '../assets/images/noImg.png'

const ViewRecipe = () => {

    const recipe = useSelector(getRecipe)
    const userData = useSelector(getUserSigninData)
    const token = useSelector(getUserToken)
    const allRecipes = useSelector(getAllRecipes)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const editRecipeStatus = useSelector(getEditRecipeStatus)

    useEffect(()=>{
        //check if user token exists. 
        dispatch(userToken())
        //redirect user in case token doesn't exist
        if(token === 'Request failed with status code 500'
        || token ==='Request failed with status code 401'){
        dispatch(resetStore())
        navigate('/') 
        }

        if(editRecipeStatus.hasOwnProperty('message')){
            dispatch(fetchRecipes())
            dispatch(clearEditRecipeMessageStatus())
            navigate('/')
        }


    },[token.length, editRecipeStatus])

    const edit = () => {
        dispatch(setRecipeToEdit(recipe))
        dispatch(setEditRecipeModal(true))
    }

    const remove = () => {

        const editedRecipe = {
            param: recipe[0]._id,
            data:{
                ingredients:recipe[0].ingredients,
                status:'inactive'
            }
        }

        dispatch(editRecipe(editedRecipe))
    }

    const getSimilarRecipe = (id) => {
        dispatch(setRecipe(Object.values(allRecipes).filter(item=>item._id === id)))
    }

    return(
    <Container  style={{marginTop:'5%'}} fluid>

    {//if soft delete fails, display error
        editRecipeStatus.hasOwnProperty('error') && (
            <Col xs={12} md={12} lg={12} xl={12}>
                <Row>
                    <p style={{textAlign:'center', color:"red"}}>{editRecipeStatus.error}</p>
                </Row>
            </Col>
        )
    }
   
   { Object.keys(userData).length !== 0 && Object.keys(recipe).length !== 0 ?
       userData.user._id === recipe[0].createdBy && (
        <>
            <div className="d-flex justify-content-end">
                <span onClick={edit}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                </svg></span>
                <span onClick={remove} style={{marginLeft:'10px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                </span>
            </div>

    
        </>
    )
    :null}
    
    <Col xs={12} md={12} lg={12} xl={12}>

    {Object.keys(recipe).length !== 0 ?
    <>
        <Row className="justify-content-end">

            <Col xs={12} md={3} lg={3} xl={3} style={{marginBottom:'10px'}}>
                    
                <RatingStars
                rating={Number(recipe[0].rating)}
                size={25}
                edit={userData.user._id === recipe[0].createdBy ? false : true}
                />
            
            </Col>
            
        </Row>
    
            <Row className="justify-content-center">
                
                <Col xs={12} md={3} lg={3} xl={3} style={{marginRight:'10px',marginBottom:'10px'}}>
                   
                    <Card style={{borderStyle:'none'}}>
                        <Card.Img 
                        
                        style={{marginTop:'5px', width:'220px', height:'220px', margin:'0 auto'}}
                        src={recipe[0].image === '' ? noImg : recipe[0].image} />
                        
                    </Card>
                    
                    
                </Col>

                <Col xs={12} md={6} lg={6} xl={6}>

                    <h3 style={{marginTop:'0', marginLeft:'15px'}}>{recipe[0].title}</h3>
                    
                    <div className="form-group" style={{width:'100%', marginBottom:'10px'}}>
                       
                        <textarea 
                        readOnly
                        value={`Description:\n${recipe[0].description}`}
                        className="form-control" id="exampleFormControlTextarea1" rows="7" style={{width:'100%'}}></textarea>
                    
                    </div>
                </Col>

                
            </Row>
            
            <Row className="justify-content-center">
                <Col xs={12} md={3} lg={3} xl={3} style={{marginLeft:'10px'}}>
                    <p 
                    style={{fontSize:'20px', marginLeft:'20px', fontStyle:'italic', textAlign:'right'}}>
                    {`Author: ${userData.user.name}`}
                    </p>
                </Col>

                <Col xs={3} md={3} lg={3} xl={3}>
                    <p style={{textAlign:'right'}}>Category:</p>
                </Col>

                <Col xs={9} md={5} lg={5} xl={5}>

                <Form.Control plaintext readOnly defaultValue={recipe[0].category} style={{maxWidth:"160px", paddingTop:'0'}}/>
                </Col>
               
            </Row>
        
            
            <Row className="justify-content-center">
                <Col xs={12} md={3} lg={3} xl={3} style={{marginLeft:'10px', marginBottom:'10px'}}>
                    <div className="form-group" style={{width:'100%'}}>
                        <textarea 
                        readOnly
                        value={`Ingredients:\n${recipe[0].ingredients.join(`\n`)}`}
                        className="form-control" id="exampleFormControlTextarea1" rows="5" style={{width:'100%'}}></textarea>
                    </div>
                </Col>

                <Col xs={12} md={6} lg={6} xl={6}>
                    <div className="form-group" style={{width:'100%'}}>
                        <textarea 
                        readOnly
                        value={`Intructions:\n${recipe[0].instructions}`}
                        className="form-control" 
                        id="exampleFormControlTextarea1" 
                        rows="8" style={{width:'100%'}}></textarea>
                    </div>
                </Col>
            </Row>

            
            <Col xs={12} md={10} lg={10} xl={12}>
           
                <Row className="justify-content-start">

                <Row >
                
                <h3 className={'similarRecipesTitle'}>More like this:</h3>
                </Row>

            {//filter values with same catogory and filter out recipe being viewed
                Object.values(allRecipes)
                .filter(item=>item.category === recipe[0].category 
                && item.title !== recipe[0].title)
                .map((item, index)=>{
                return(

                    
                <Col xs={12} md={4} lg={4} xl={2} style={{marginBottom:'10px'}} className='similarRecipes' key={index}>
             
                    <Card onClick={()=>getSimilarRecipe(item._id)} style={{paddingTop:'20px'}}>
                        <Card.Img 
                            variant="top"
                            style={{ width:'120px', height:'120px', margin:'0 auto', marginTop:'20px'}}
                            src={item.image !== '' ? item.image : noImg} />
                            
                            <Card.Body style={{margin:'0 auto', marginTop:'5px'}}>
                                
                                <Card.Title>{item.title.length > 9 ? item.title.substr(0,9)+'...' : item.title}</Card.Title>
                                
                                <RatingStars 
                                rating={Number(item.rating)}
                                />

                            </Card.Body>
                    </Card>
                        
               </Col>
               
            )
            })
        }
                
            
          </Row>
        </Col>     
        </>
        :null}
     
     </Col>
       
    </Container>
    )
}

export default ViewRecipe