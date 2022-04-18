
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import Form from 'react-bootstrap/esm/Form'
import Button from "react-bootstrap/esm/Button"
import { useDispatch, useSelector } from "react-redux"
import { clearEditRecipeMessageStatus, editRecipe, 
         fetchRecipes, 
         getAllRecipes, 
         getEditRecipeModalStatus, 
         getEditRecipeStatus, 
         getRecipeToEdit, 
         getUploadImageStatus, 
         getUserSigninData, 
         setEditRecipeModal, 
         uploadRecipeImage, 
        setRecipe, 
        clearUploadImageStatus} from "../features/recipesSlice"
import RatingStars from "./RatingStars"
import '../assets/styles/main.css'
import { useState } from "react"
import { useEffect } from "react"
import Categories from "../assets/recipeCategories/recipeCategories"
import Modal from 'react-bootstrap/Modal'
import noImg from '../assets/images/noImg.png'
const EditRecipe = () => {

    const recipe = useSelector(getRecipeToEdit)
    const userData = useSelector(getUserSigninData)
    const dispatch = useDispatch()
    const uploadImageStatus = useSelector(getUploadImageStatus)
    const editRecipeModalStatus = useSelector(getEditRecipeModalStatus)
    const editRecipeStatus = useSelector(getEditRecipeStatus)
    const allRecipes = useSelector(getAllRecipes)

    const [values, setValues] = useState({
        createdBy: '',
        title:'', 
        image:'',
        description:'',
        category:'', 
        instructions: '',
        ingredients: []
    })


    useEffect(()=>{

        if(Object.keys(recipe).length !== 0){
            setValues({
                createdBy: recipe[0].createdBy,
                title:recipe[0].title, 
                image:recipe[0].image,
                description:recipe[0].description,
                category:recipe[0].category, 
                instructions: recipe[0].instructions,
                ingredients: [recipe[0].ingredients]
                })
        }

        if(editRecipeStatus.hasOwnProperty('message')){
            dispatch(fetchRecipes())
            dispatch(clearEditRecipeMessageStatus())
            dispatch(clearUploadImageStatus())
            dispatch(setRecipe(Object.values(allRecipes).filter(item=>item.title === values.title)))
            dispatch(setEditRecipeModal(false))
        }
        
    
       },[editRecipeModalStatus, editRecipeStatus])

 
    
    
    const handleChange = name => event => {
        setValues({
            ...values, 
            [name]: name === 'ingredients' ? [event.target.value] : event.target.value
        })
    }

    const edit = () => {
        const editedRecipe = {
            param: recipe[0]._id,
            data:{
                createdBy: values.createdBy,
                title:values.title, 
                image:values.image,
                description:values.description,
                category:values.category, 
                instructions: values.instructions,
                ingredients: values.ingredients,
                image: uploadImageStatus.hasOwnProperty('imageUrl') ? 
                uploadImageStatus.imageUrl
                : values.image
            }
            
        }
        
       dispatch(editRecipe(editedRecipe))
    }

    const uploadImage = () => {
        document.getElementById('uploadImage').click()
    }

   
    const handleUpload = event => {
    
        let formData = new FormData()
        //If image for any book is already changed and includes timestamp get only root name and add
        //timestamp and extension
        if(recipe[0].image === ''){
            formData.append('test', event.target.files[0], `image${Object.values(allRecipes).findIndex(item=>item.title === recipe[0].title)+1}-${Date.now()}.${event.target.files[0].name.split('.')[1]}`)
        }else if(recipe[0].image.includes('/') && recipe[0].image.includes('images')){
            formData.append('test', event.target.files[0], `${recipe[0].image.split('/')[2].split('-')[0].split('.')[0]}-${Date.now()}.${event.target.files[0].name.split('.')[1]}`)
        }else{
            //if new image uploaded name it by using original name of the first image and add
            //timestamp. Timestamp used to prevent caching error
            formData.append('test', event.target.files[0], `${values.image}-${Date.now()}.${event.target.files[0].name.split('.')[1]}`)   
        }

        dispatch(uploadRecipeImage(formData))
    }
    
    const cancel = () => {
        setValues({
            createdBy: '',
            title:'', 
            image:'',
            description:'',
            category:'', 
            instructions: '',
            ingredients: []
        })
        
        dispatch(setEditRecipeModal(false))
    }
   

    return(

        <Modal
        show={editRecipeModalStatus}
        animation={false}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >


    {
        Object.keys(recipe).length !== 0 ?
        
        <Col xs={12} md={12} lg={12} xl={12}>
        
            <input type='file' style={{display:'none'}} id='uploadImage' onChange={handleUpload}/>
  
            <Row className="justify-content-end">
                <Col xs={8} md={3} lg={3} xl={3} 
                style={{marginRight:'10px',marginBottom:'10px', pointerEvents:'none'}}>
                    <RatingStars
                    rating={Number(recipe[0].rating)}
                    />
                </Col>
            </Row>
    
    
            <Row className="justify-content-center">

                <Col xs={12} md={3} lg={3} xl={3} style={{marginRight:'10px',marginBottom:'10px'}}>
                    <div style={{width:'100%', marginLeft:'5px'}}>
                        <img style={{width:'100%'}}  
                        src={
                        Object.keys(uploadImageStatus).length !== 0 && uploadImageStatus.hasOwnProperty('imageUrl')
                        ? uploadImageStatus.imageUrl 
                        : recipe[0].image === '' 
                        ? noImg : recipe[0].image}
                          onClick={uploadImage}></img> 
                    </div>
                </Col>

                <Col xs={12} md={6} lg={6} xl={6}>

                    <textarea  
                         onChange={handleChange('title')}
                         value={values.title}
                         className="form-control" id="exampleFormControlTextarea1" rows="1" style={{width:'100%', marginBottom:'10px'}}>
                         </textarea>
                    
                    <div className="form-group" style={{width:'100%', marginBottom:'10px'}}>
                        <textarea 
                         onChange={handleChange('description')}
                         value={values.description}
                         className="form-control" id="exampleFormControlTextarea1" rows="7" style={{width:'100%'}}>
                        </textarea>
                    </div>

                </Col>
            </Row>
            
            <Row className="justify-content-center">

                <Col xs={12} md={3} lg={3} xl={3} style={{marginLeft:'10px'}}>
                    <p style={{fontSize:'20px', marginLeft:'10px', fontStyle:'italic'}}>{`Author: ${userData.user.name}`}</p>
                </Col>

                <Col xs={12} md={6} lg={6} xl={6}>

                    <span style={{display:'inline-flex'}}>

                        <p style={{fontSize:'20px'}}>Categories</p>

                        <Form.Select 
                        onChange={handleChange('category')}
                        value={values.category} style={{width:'90%', marginBottom:'20px', marginLeft:'10px'}}>
                        {
                            Categories.map((item, index)=>{
                                return(
                                <option style={{marginRight:"200px"}} key={index} value={item}>{item}</option>
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
                         onChange={handleChange('ingredients')}
                         value={values.ingredients.join()}
                         className="form-control" id="exampleFormControlTextarea1" rows="5" style={{width:'98%'}}>
                         </textarea>
                    </div>
                </Col>

                <Col xs={12} md={6} lg={6} xl={6}>

                    <div className="form-group" style={{width:'100%'}}>
                        <textarea 
                         onChange={handleChange('instructions')}
                         value={values.instructions}
                         className="form-control" 
                         id="exampleFormControlTextarea1" 
                         rows="8" style={{width:'100%'}}>
                        </textarea>
                    </div>

                    <div style={{paddingLeft:'10px'}}>
                        <Button style={{marginLeft:'auto', minWidth:'120px', marginTop:'10px', marginBottom:'10px'}}
                        onClick={cancel}>
                        Cancel
                        </Button>
                        <Button style={{marginLeft:'auto', minWidth:'120px', marginTop:'10px', marginLeft:'5px', marginBottom:'10px'}}
                        onClick={edit}>
                        Save
                        </Button>
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
                editRecipeStatus.hasOwnProperty('error') && (
                    <Col xs={12} md={12} lg={12} xl={12}>
                        <Row>
                            <p style={{textAlign:'center', color:"red"}}>{editRecipeStatus.error}</p>
                        </Row>
                    </Col>
                )
            }
             
            </Col>
            
            :null} 
            
        </Modal>
    )
}

export default EditRecipe