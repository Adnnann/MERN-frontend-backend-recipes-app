import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Image from "react-bootstrap/esm/Image";
import CookbookIcon from '../../assets/images/CookbookIcon.png'
import { useSelector, useDispatch } from "react-redux";
import {getSignupModal, 
        setSigninModal, 
        setSignupModal,
        fetchAsyncUser,
        getUserProfile
} from "../../features/recipesSlice";
import { useState } from "react";
import { useEffect } from "react";
import InputGroup from 'react-bootstrap/InputGroup'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';


const Signup= () => {

    const signupModalStatus = useSelector(getSignupModal)
    const userProfile = useSelector(getUserProfile)
    const dispatch = useDispatch()

    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [repeatedPasswordVisibility, setRepeatedPasswordVisibility] = useState(false)
 

    useEffect(()=>{
      if(userProfile.hasOwnProperty('message')){
        dispatch(setSignupModal(false))
        dispatch(setSigninModal(true))
      }
    },[userProfile])

    const [userData, setUserData] = useState({
      name:'',
      email:'',
      password:'',
      repeatedPassword:'',
      error:''
    })

    const redirectToSignin = () => {
        dispatch(setSigninModal(true))
        dispatch(setSignupModal(false))
    }

    const handleChange = name => event => {
      setUserData({...userData, [name]: event.target.value})
    }

    const createProfile = () => {
      const user = {
        name: userData.name,
        email: userData.email,
        password: userData.password
      }

      if(userData.password === userData.repeatedPassword){
        setUserData({...userData, error:'' })
        dispatch(fetchAsyncUser(user))
      }else if(userData.password == '' || userData.repeatedPassword == ''){
        setUserData({...userData, error:'Enter data in both password fields' })  
      }else if(userData.password !== userData.repeatedPassword){
        setUserData({...userData, error:'Passwords do not match' })
      }
  
    }

    return (
      <Modal
        show={signupModalStatus}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        
      <Row className="justify-content-center">
      {/* left side signin modal */}
 
          <Col xs={12} md={6} lg={6} xl={6}>
             <Image src={CookbookIcon} width={'150px'} style={{marginLeft:'30%', marginTop:'15%', marginBottom:'10%'}} />
          </Col>

          <Col xs={12} md={6} lg={6} xl={6} style={{paddingTop:'5%'}}>
            {/* USERNAME */}
           <Row style={{paddingRight:"20px", paddingLeft:'20px'}}>
                <Col xs={3} md={3} lg={3} xl={3} >
                    <p style={{fontSize:'14px', textAlign:'right'}}>Username:</p>
                </Col>

                <Col xs={8} md={8} lg={8} xl={8} style={{marginBottom:'10px'}}>
                   <Form.Control type="text" id='name' style={{height:"30px"}} 
                   onChange={handleChange('name')}/>
                </Col>
            {/* EMAIL */}
                <Col xs={3} md={3} lg={3} xl={3} >
                    <p style={{fontSize:'14px', textAlign:'right'}}>Email:</p>
                </Col>

                <Col xs={8} md={8} lg={8} xl={8} style={{marginBottom:'10px'}}>
                   <Form.Control type="email" style={{height:"30px"}} onChange={handleChange('email')}/>
                </Col>

                {/* PASSWORD */}
                <Col xs={3} md={3} lg={3} xl={3} >
                    <p style={{fontSize:'14px', textAlign:'right'}}>Password:</p>
                </Col>

                <Col xs={8} md={8} lg={8} xl={8} style={{marginBottom:'10px'}}>
                <InputGroup>
                    <Form.Control type={passwordVisibility ? "text" : "password"} style={{height:"30px"}} 
                    onChange={handleChange('password')}/>
                    <div style={{position:'absolute', right:'5px',zIndex:'9999'}}>
                      {!passwordVisibility ? <BsFillEyeSlashFill onClick={()=>setPasswordVisibility(passwordVisibility ? false : true)}/>
                      : <BsFillEyeFill onClick={()=>setPasswordVisibility(passwordVisibility ? false : true)}/>}
                      </div>
              </InputGroup>
                </Col>
                {/* REPEATED PASSWORD */}
                <Col xs={3} md={3} lg={3} xl={3} >
                    <p style={{fontSize:'14px', textAlign:'right'}}>Repeat password:</p>
                </Col>

                <Col xs={8} md={8} lg={8} xl={8} style={{marginBottom:'10px'}}>
                    <InputGroup>
                      <Form.Control type={repeatedPasswordVisibility ? "text" : "password"} style={{height:"30px"}} 
                      onChange={handleChange('repeatedPassword')}/>
                      <div style={{position:'absolute', right:'5px',zIndex:'9999'}}>
                      {!repeatedPasswordVisibility ? <BsFillEyeSlashFill onClick={()=>setRepeatedPasswordVisibility(repeatedPasswordVisibility ? false : true)}/>
                      : <BsFillEyeFill onClick={()=>setRepeatedPasswordVisibility(repeatedPasswordVisibility ? false : true)}/>}
                      </div>
                  </InputGroup>
                </Col>
                <hr />
            
             { userProfile.hasOwnProperty('error') || userData.error !== '' ? 
                <Row className='justify-content-center'>
                   <p style={{display:'inline', textAlign:'center', color:'red', fontSize:'20px'}}>
                     {userData.error !== '' ? userData.error : userProfile.error}
                  </p>
              </Row> : null }
              
            
            </Row>
          
            <Row className='justify-content-center' style={{marginBottom:'2%'}}>
                <Col xs={4} md={4} lg={4} xl={4} >
                   <Button onClick={createProfile}>SIGN UP</Button>
                </Col>
            </Row>

              <Row className='justify-content-center'>
                   <p style={{display:'inline', textAlign:'center'}}>
                   Already have an account <a href="#" onClick={()=>redirectToSignin()}>Sign in</a> 
                  </p>
            </Row> 
            
      
          </Col>
        </Row>
      </Modal>
    );
  }

  export default Signup