import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Image from "react-bootstrap/esm/Image";
import CookbookIcon from '../../assets/images/CookbookIcon.png'
import { useDispatch, useSelector } from "react-redux";
import {fetchRecipes, getSigninModal, 
        getUserData,
        getUserSigninData, 
        loginUser, 
        setSigninModal, 
        setSignupModal, 
        setUserSiginStatus
} from "../../features/recipesSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {

    const signinModalStatus = useSelector(getSigninModal)
    const signinUserData = useSelector(getUserSigninData)
    const dispatch = useDispatch()
    const userData = useSelector(getUserData)
    const navigate = useNavigate()

    useEffect(()=>{
      if(signinUserData.hasOwnProperty('token')){
        dispatch(setSigninModal(false))
        //dispatch(setUserSiginStatus(true))
        dispatch(fetchRecipes())
      }
    },[signinUserData])

    const [userLoginData, setUserLoginData] = useState({
      name:'',
      password:'',
    })

    const handleChange = name => event => {
      setUserLoginData({...userLoginData, [name]: event.target.value})
    }

    const signinUser = () => {
      const user = {
        name: userLoginData.name,
        password: userLoginData.password
      }
     dispatch(loginUser(user))
    }

    const redirectToSignup = () => {
        dispatch(setSigninModal(false))
        dispatch(setSignupModal(true))
    }

    return (
      <Modal
        show={signinModalStatus}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        
      <Row className="justify-content-center">
      {/* left side signin modal */}
 
          <Col xs={12} md={6} lg={6} xl={6}>
             <Image src={CookbookIcon} width={'150px'} style={{marginLeft:'30%', marginTop:'10%', marginBottom:'10%'}} />
          </Col>

          <Col xs={12} md={6} lg={6} xl={6} style={{paddingTop:'5%'}}>

           <Row style={{paddingRight:"20px", paddingLeft:'20px'}}>
                <Col xs={3} md={3} lg={3} xl={3} >
                    <p style={{fontSize:'14px', textAlign:'right'}}>Username:</p>
                </Col>

                <Col xs={8} md={8} lg={8} xl={8} style={{marginBottom:'10px'}} onChange={handleChange('name')}>
                   <Form.Control type="text" style={{height:"30px"}}/>
                </Col>
                
                <Col xs={3} md={3} lg={3} xl={3} >
                    <p style={{fontSize:'14px', textAlign:'right'}}>Password:</p>
                </Col>

                <Col xs={8} md={8} lg={8} xl={8} style={{marginBottom:'10px'}}>
                   <Form.Control type="password" style={{height:"30px"}} onChange={handleChange('password')}/>
                </Col>
                <hr />
                
                {signinUserData.hasOwnProperty('error') && (
                <Row className='justify-content-center'>
                   <p style={{display:'inline', textAlign:'center', color:'red', fontSize:'20px'}}>
                     {signinUserData.error}
                  </p>
                </Row>)}
              

            </Row>
          
            <Row className='justify-content-center' style={{marginBottom:'2%'}}>
                <Col xs={4} md={4} lg={4} xl={4} >
                   <Button onClick={signinUser}>SIGN IN</Button>
                </Col>
            </Row>

              <Row className='justify-content-center'>
                   <p style={{display:'inline', textAlign:'center'}}>No account <a href="#" onClick={()=>redirectToSignup()}>Sign up</a> </p>
            </Row> 
        
          </Col>
        </Row>
      </Modal>
    );
  }

  export default Signin