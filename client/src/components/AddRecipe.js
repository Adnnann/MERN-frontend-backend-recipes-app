
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import Form from 'react-bootstrap/esm/Form'
import Button from "react-bootstrap/esm/Button"
import { useDispatch, useSelector } from "react-redux"
import {getAddRecipeModalStatus, 
         getRecipeToEdit, 
         getUploadImageStatus, 
         getUserSigninData, 
         setAddRecipeModal, 
         uploadRecipeImage, 
         getAddRecipeStatus,
        createRecipe,
        fetchRecipes,
        clearAddRecipeMessageStatus,
        getAllRecipes,
        clearUploadImageStatus,
        setFilterIcon
} from "../features/recipesSlice"
import RatingStars from "./RatingStars"
import '../assets/styles/main.css'
import { useState } from "react"
import { useEffect } from "react"
import Categories from "../assets/recipeCategories/recipeCategories"
import Modal from 'react-bootstrap/Modal'
import uploadImageIcon from '../assets/icons/uploadImage.jpeg'

const AddRecipe = () => {

    const recipe = useSelector(getRecipeToEdit)
    const userData = useSelector(getUserSigninData)
    const dispatch = useDispatch()
    const uploadImageStatus = useSelector(getUploadImageStatus)
    const addRecipeModalStatus = useSelector(getAddRecipeModalStatus)
    const addRecipeStatus = useSelector(getAddRecipeStatus)
    const allRecipes = useSelector(getAllRecipes)

    useEffect(()=>{


        if(addRecipeStatus.hasOwnProperty('message')){
            dispatch(fetchRecipes())
            dispatch(clearAddRecipeMessageStatus())
            dispatch(clearUploadImageStatus())

            setValues({
                title:'', 
                image:'',
                description:'',
                category:'', 
                instructions: '',
                ingredients: []
            })
            dispatch(setFilterIcon(true))
            dispatch(setAddRecipeModal(false))
        }

    },[addRecipeStatus])

    const [values, setValues] = useState({
        title:'', 
        image:'',
        description:'',
        category:'', 
        instructions: '',
        ingredients: []
    })
 
    const handleChange = name => event => {
  
        setValues({
            ...values, 
            //in case user enters ingredients store them as array.
            [name]: name === 'ingredients' ? [event.target.value] : event.target.value
        })
    }

    const add = () => {
        const recipe = {
                createdBy: userData.user._id,
                title:values.title, 
                image:values.image,
                description:values.description,
                category:values.category === '' ? Categories[0] : values.category, 
                instructions: values.instructions,
                ingredients: values.ingredients,
                image: uploadImageStatus.hasOwnProperty('imageUrl') ? 
                uploadImageStatus.imageUrl
                : values.image
        }
       dispatch(createRecipe(recipe))
    }

    const uploadImage = () => {
        document.getElementById('uploadImage').click()
    }

    const handleUpload = event => {
    
        let formData = new FormData()
        console.log(Object.values(allRecipes).length+1)
    
        //all files will be named image{allRecipes.lenght+1}.jpg
        formData.append('test', event.target.files[0], `image${Object.values(allRecipes).length+1}-${Date.now()}.${event.target.files[0].name.split('.')[1]}`)
        dispatch(uploadRecipeImage(formData))
    }
    
    const cancel = () => {
        dispatch(setFilterIcon(true))
        setValues({
            createdBy: '',
            title:'', 
            image:'',
            description:'',
            category:'', 
            instructions: '',
            ingredients: []
        })
        dispatch(clearUploadImageStatus())
        dispatch(setAddRecipeModal(false))
    }
   

    return(
        <Modal
        show={addRecipeModalStatus}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >


<input type='file' style={{display:'none', visibility:'hidden'}} id='uploadImage' onChange={handleUpload}/>
  
    <Col xs={12} md={12} lg={12} xl={12}>
    
    
    
        <Row className="justify-content-end">
                <Col xs={8} md={3} lg={3} xl={3} style={{marginRight:'10px',marginBottom:'10px', pointerEvents:'none'}}>
                    <RatingStars
                        rating={0}
                    />
                </Col>
            </Row>
    
    
            <Row className="justify-content-center">

                <Col xs={12} md={3} lg={3} xl={3} style={{marginRight:'10px',marginBottom:'10px'}}>
                    <div style={{width:'100%', marginLeft:'5px'}}>
                        <img style={{width:'100%'}}  
                        src={
                        //if image uploaded dispay selected image, else display uploadImage placeholder image
                        Object.keys(uploadImageStatus).length !== 0 && uploadImageStatus.hasOwnProperty('imageUrl')
                        ? uploadImageStatus.imageUrl : uploadImageIcon
                        }
                        onClick={uploadImage}></img> 
                    </div>
                </Col>

                <Col xs={12} md={6} lg={6} xl={6}>

                    <Form.Control 
                    onChange={handleChange('title')} 
                    style={{marginBottom:'10px'}} 
                    placeholder='Title of the recipe...'/>
                    
                    <div className="form-group" style={{width:'100%', marginBottom:'10px'}}>
                        <textarea 
                        placeholder="Description..."
                        onChange={handleChange('description')}
                        value={values.description}
                        className="form-control" id="exampleFormControlTextarea1" rows="7" 
                        style={{width:'100%'}}></textarea>
                   </div>

                </Col>

            </Row>
            
            <Row className="justify-content-center">

                <Col xs={12} md={3} lg={3} xl={3} style={{marginLeft:'10px'}}>
                    <p style={{fontSize:'20px', marginLeft:'10px', fontStyle:'italic'}}>{`Author: ${userData.hasOwnProperty('user') ? userData.user.name : ''}`}</p>
                </Col>

                <Col xs={12} md={6} lg={6} xl={6}>
                    <span style={{display:'inline-flex'}}>
                        <p style={{fontSize:'20px'}}>Categories</p>
                        <Form.Select 
                        onChange={handleChange('category')}
                        value={values.category} 
                        style={{width:'90%', marginBottom:'20px', marginLeft:'10px'}}
                        >
                        
                        
                      
                        {
                            Categories.map((item, index)=>{
            
                                return(
                                    
                                <option style={{marginRight:"200px"}} 
                                key={index} 

                                >{item}</option>
                                
                                )
                            })
                            
                        }
                       
                        </Form.Select>
                    </span>
                </Col>
            </Row>
        
            
            <Row className="justify-content-center">

                <Col xs={12} md={3} lg={3} xl={3} style={{marginLeft:'10px', marginBottom:'10px'}}>
                
                    <div className="form-group" style={{width:'100%'}}>
                        <textarea 
                        placeholder="Ingredients..."
                        onChange={handleChange('ingredients')}
                        value={values.ingredients}
                        className="form-control" id="exampleFormControlTextarea1" rows="5" 
                        style={{width:'98%'}}></textarea>
                    </div>

                </Col>

                <Col xs={12} md={6} lg={6} xl={6} >
                    <div className="form-group" style={{width:'100%'}}>
                        <textarea 
                        placeholder="Instructions..."
                        onChange={handleChange('instructions')}
                        value={values.instructions}
                        className="form-control" 
                        id="exampleFormControlTextarea1" 
                        rows="8" style={{width:'100%'}}>
                        </textarea>
                    </div>

                    <div style={{paddingLeft:'10px'}}>
                        <Button style={{marginLeft:'auto', minWidth:'120px', marginTop:'10px', marginBottom:'10px'}}
                        onClick={cancel}>Cancel</Button>
                        <Button style={{marginLeft:'auto', minWidth:'120px', marginTop:'10px', marginLeft:'5px', marginBottom:'10px'}}
                        onClick={add}>Save</Button>
                    </div>
                
                </Col>
                
            </Row>

            {
                uploadImageStatus.hasOwnProperty('Error') && (
                    <Col xs={12} md={12} lg={12} xl={12}>
                        <Row>
                            <p style={{textAlign:'center', color:"red"}}>{uploadImageStatus.Error}</p>
                        </Row>
                    </Col>
                )
            }
           
            {
                addRecipeStatus.hasOwnProperty('error') && (
                    <Col xs={12} md={12} lg={12} xl={12}>
                        <Row>
                            <p style={{textAlign:'center', color:"red"}}>{addRecipeStatus.error}</p>
                        </Row>
                    </Col>
                )
            }
 
            </Col>
            
        </Modal>
    )
}

export default AddRecipe