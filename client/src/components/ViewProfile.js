
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import Modal from 'react-bootstrap/Modal'
import Container from "react-bootstrap/esm/Container"
import Form from 'react-bootstrap/esm/Form'
import { useSelector, useDispatch } from "react-redux"
import { getDeletedUserStatus, getUserProfileModalStatus, 
        getUserSigninData,
        resetStore,
        setUserEditProfileModal,
        signoutUser, 
        removeUser,
        setUserProfileModalStatus
 } from "../features/recipesSlice"
import '../assets/styles/main.css'
import { useEffect } from "react"



const ViewProfile = () => {

    const userData = useSelector(getUserSigninData)
    const dispatch = useDispatch()
    const userProfileModalStatus = useSelector(getUserProfileModalStatus)
    const deletedUserStatus = useSelector(getDeletedUserStatus)

    useEffect(()=>{
        
        if(deletedUserStatus.hasOwnProperty('message')){
            dispatch(resetStore())
            dispatch(signoutUser())
        }

    },[deletedUserStatus])

    const edit = () => {
        dispatch(setUserProfileModalStatus(false))
        dispatch(setUserEditProfileModal(true))
    }

    const remove = () => {
        dispatch(removeUser(userData.user._id))
    }

   
    return(

<Modal
    show={userProfileModalStatus}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Container  style={{marginTop:'5%'}} fluid>

    {
        deletedUserStatus.hasOwnProperty('error') && (
            <Col xs={12} md={12} lg={12} xl={12}>
                <Row>
                    <p style={{textAlign:'center', color:"red"}}>{deletedUserStatus.error}</p>
                </Row>
            </Col>
        )
    }


   

      
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

    

        {Object.keys(userData).length !== 0 && userData.hasOwnProperty('user') ?

            <Col xs={12} md={12} lg={12} xl={12} style={{marginTop:'20px'}}>

            <Row className="justify-content-center">

            <Col xs={12} md={4} lg={4} xl={4}>

            
                <p style={{marginLeft:'5px', textAlign:"right"}}>Username</p>
                

            </Col>
                
                <Col xs={12} md={8} lg={8} xl={8}>


                    <Form.Control 
                        readOnly 
                        defaultValue={userData.user.name} 
                        style={{maxWidth:"300px", paddingTop:'0', marginTop:'0', marginBottom:'10px', marginRight:'5px'}}/>


                </Col>

            </Row>

                <Row className="justify-content-center">

                <Col xs={12} md={4} lg={4} xl={4}>

                   
                    <p style={{marginLeft:'5px', textAlign:"right"}}>{`User email `}</p>
                    

                </Col>
                    
                    <Col xs={12} md={8} lg={8} xl={8}>

            
                        <Form.Control 
                            readOnly 
                            defaultValue={userData.user.email} 
                            style={{maxWidth:"300px", paddingTop:'0', marginTop:'0', marginBottom:'10px', marginRight:'5px'}}/>
        

                    </Col>

                </Row>

            </Col>
        : null} 

        
       
    </Container>
 </Modal>
 )
}

export default ViewProfile