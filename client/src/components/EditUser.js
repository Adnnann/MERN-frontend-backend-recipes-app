import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import Modal from 'react-bootstrap/Modal'
import Container from "react-bootstrap/esm/Container"
import Form from 'react-bootstrap/esm/Form'
import Button from "react-bootstrap/esm/Button"
import { useSelector, useDispatch } from "react-redux"
import {clearEditUserMessageStatus, 
        editUser, 
        getEditedUserStatus, 
        getEditUserModalStatus,  
        getUserSigninData,
        setUserEditProfileModal, 
        setEd,
        setNewUserData
 } from "../features/recipesSlice"
import '../assets/styles/main.css'
import { useEffect } from "react"
import { useState } from "react"



const EditUser = () => {
    
    const userData = useSelector(getUserSigninData)
    const dispatch = useDispatch()
    const userProfileModalStatus = useSelector(getEditUserModalStatus)
    const editUserStatus = useSelector(getEditedUserStatus)

    
    useEffect(()=>{
      if(!editUserStatus?.error){
        setValues({
            ...values,
            newName:userData?.user ? userData.user.name : ''
        })
      }
       
        if(editUserStatus?.message){
            setValues({
                newName:'',
                password:'',
                newPassword:'',
                repeatedPassword:'',
                error:''
            })
         
            dispatch(setNewUserData({
                token: userData.token,
                user: editUserStatus.data}))
            dispatch(clearEditUserMessageStatus())
            dispatch(setUserEditProfileModal(false))
        }


    },[userProfileModalStatus, editUserStatus])

    const [values, setValues] = useState({
        newName:'',
        password:'',
        newPassword:'',
        repeatedPassword:'',
        error:''
    })
    const edit = () => {

        if(values.password !== '' && (values.newPassword === '' || values.repeatedPassword === '')){
            setValues({
                ...values, 
                error:'Enter old, new and repated password!'})
                return
        }else if(values.newPassword !== values.repeatedPassword){
            setValues({
                ...values, 
                error:'New and repeated password do not match!'})
                return
        }else{
            setValues({
                ...values, 
                error:''})
        }

        let editedUser = {}
        //update username only if user enters different than his current username
        if(values.newName !== userData.user.name){
            editedUser = {
                param: userData.user._id,
                data:{
                    name: values.newName,
                    password: values.password,
                    newPassword: values.newPassword
                }
            }
        }else{
            editedUser = {
                param: userData.user._id,
                data:{
                    name: values.newName,
                    password: values.password,
                    newPassword: values.newPassword
                }
            }
        }

    
        dispatch(editUser(editedUser))


    }

    const cancel = () => {
        dispatch(clearEditUserMessageStatus())
        setValues({
            newName:'',
            password:'',
            newPassword:'',
            repeatedPassword:'',
            error:''
        })
        dispatch(setUserEditProfileModal(false))
    }

    const handleChange = name => event => {
        setValues({...values, [name]:event.target.value})
    }

  
    return(

<Modal
    show={userProfileModalStatus}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Container  style={{marginTop:'5%'}} fluid>

        <Col xs={12} md={12} lg={12} xl={12}>
            <Row>
                <p style={{textAlign:'center', color:'green'}}>To update only username, enter new username. For updating password enter old, new and repearted password</p>
            </Row>
        </Col>
    
  

    {
        editUserStatus.hasOwnProperty('error') && (
            <Col xs={12} md={12} lg={12} xl={12}>
                <Row>
                    <p style={{textAlign:'center', color:"red"}}>{editUserStatus.error}</p>
                </Row>
            </Col>
        )
    }

    {
        values.error !== '' && (
            <Col xs={12} md={12} lg={12} xl={12}>
                <Row>
                    <p style={{textAlign:'center', color:"red"}}>{values.error}</p>
                </Row>
            </Col>
        )
    }




        {Object.keys(userData).length !== 0 ?

            <Col xs={12} md={12} lg={12} xl={12}>

            <Row className="justify-content-center">

<Col xs={12} md={4} lg={4} xl={4}>


    <p style={{marginLeft:'5px', textAlign:"right"}}>Username</p>
    

</Col>
    
    <Col xs={12} md={8} lg={8} xl={8}>


        <Form.Control 
            onChange={handleChange('newName')}
            value={values.newName} 
            style={{maxWidth:"300px", paddingTop:'0', marginTop:'0', marginBottom:'10px', marginRight:'5px'}}/>


    </Col>

</Row>

                

<Row className="justify-content-center">

<Col xs={12} md={4} lg={4} xl={4}>


    <p style={{marginLeft:'5px', textAlign:"right"}}>Old Password</p>
    

</Col>
    
    <Col xs={12} md={8} lg={8} xl={8}>


        <Form.Control 
        type='password'
            onChange={handleChange('password')}
            values={values.password} 
            style={{maxWidth:"300px", paddingTop:'0', marginTop:'0', marginBottom:'10px', marginRight:'5px'}}/>


    </Col>

</Row>

<Row className="justify-content-center">

<Col xs={12} md={4} lg={4} xl={4}>


    <p style={{marginLeft:'5px', textAlign:"right"}}>New Password</p>
    

</Col>
    
    <Col xs={12} md={8} lg={8} xl={8}>


        <Form.Control 
            type='password'
            onChange={handleChange('newPassword')}
            values={values.newPassword}  
            style={{maxWidth:"300px", paddingTop:'0', marginTop:'0', marginBottom:'10px', marginRight:'5px'}}/>


    </Col>

</Row>

<Row className="justify-content-center">

<Col xs={12} md={4} lg={4} xl={4}>


    <p style={{marginLeft:'5px', textAlign:"right"}}>Repeat Password</p>
    

</Col>
    
    <Col xs={12} md={8} lg={8} xl={8}>


        <Form.Control 
        type='password'
            onChange={handleChange('repeatedPassword')}
            values={values.repeatedPassword} 
            style={{maxWidth:"300px", paddingTop:'0', marginTop:'0', marginBottom:'10px', marginRight:'5px'}}/>


    </Col>

</Row>


                <Row className="justify-content-center">

                    <Col xs={12} md={6} lg={6} xl={6}>

                            <span style={{display:'inline-flex'}}><Button style={{marginLeft:'auto', minWidth:'120px', marginTop:'10px', marginBottom:'10px'}}
                            onClick={cancel}>
                            Cancel
                            </Button>

                            <Button style={{marginLeft:'auto', minWidth:'120px', marginTop:'10px', marginLeft:'5px', marginBottom:'10px'}}
                            onClick={edit}>
                            Save
                            </Button>
                            </span>

                    </Col>
                
                </Row>


            </Col>
        : null} 

        
       
    </Container>
 </Modal>
 )
}

export default EditUser