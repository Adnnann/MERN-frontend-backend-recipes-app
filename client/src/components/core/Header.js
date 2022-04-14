import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/esm/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Avatar from '../../assets/images/avatar.svg'
import CookbookIcon from '../../assets/images/CookbookIcon.png'
import AddRecipeIcon from '../../assets/images/AddRecipeIcon.svg'
import {useDispatch, useSelector} from "react-redux"
import {getSigninModal, 
        getUserSigninData, 
        getUserSigninStatus,
        resetStore,
        setAddRecipeModal,
        setSigninModal,
        setUserProfileModalStatus,
        signoutUser,
        
} from '../../features/recipesSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const dispatch = useDispatch()
    const signinModal = useSelector(getSigninModal)

    const userSigninData = useSelector(getUserSigninData)
    const navigate = useNavigate()

    const signinUser = () => {
        dispatch(setSigninModal(true))
    }

    const signout = () => {
        dispatch(resetStore())
        dispatch(signoutUser())
        navigate('/')
    }

    return(
        <>
        <Nav className="justify-content-start" 
        style={{marginBottom:"2%", borderBottomStyle:'solid', borderBottomWidth:'1px', marginTop:'2%', width:"98%", marginLeft:'1%'}}>
            
            <Nav.Item style={{marginLeft:"2%"}}>
                <Image src={CookbookIcon} width={'50px'} onClick={()=>navigate('/')}/>
            </Nav.Item>

            <Nav.Item style={{marginLeft:"2%"}}>
                <h1>Cookbook</h1>
            </Nav.Item>

            <Nav.Item style={{marginLeft:'auto', marginBottom:'2px'}} onClick={()=>dispatch(setAddRecipeModal(true))}>
               {<Image src={AddRecipeIcon} width={'50px'} /> } 
            </Nav.Item>

            
                
            {userSigninData.hasOwnProperty('token') ?
            <Nav.Item style={{marginLeft:"1%", marginRight:"2%"}}>
                <Dropdown>

                    <Dropdown.Toggle style={{backgroundColor:"white", borderStyle:'none'}}>
                        <Image src={Avatar} as={ButtonGroup} style={{backgroundColor:"white"}} width={'50px'} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>dispatch(setUserProfileModalStatus(true))}>My Profile</Dropdown.Item>
                        <Dropdown.Item onClick={()=>navigate('/userRecipes')}>My Recepies</Dropdown.Item>
                        <Dropdown.Item onClick={signout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>

            </Nav.Item>
            
            : <Nav.Item style={{marginLeft:"1%", marginRight:"2%", marginTop:'7px'}}>
                    <Button onClick={()=>signinUser()}>Sign in</Button>
                </Nav.Item>
            }

      </Nav>
     
    </>
    )
}

export default Header