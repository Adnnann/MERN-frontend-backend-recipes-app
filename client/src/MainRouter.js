import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { getUserSigninData } from './features/recipesSlice'
import { useSelector } from 'react-redux'
import Signin from './components/user/Signin'
import Signup from './components/user/Signup'
import Home from './components/Home'
import Header from './components/core/Header'

const MainRouter = () => {

    const userSiginData = useSelector(getUserSigninData)

    return(
        <Router>
            {userSiginData.hasOwnProperty('token') ? <Header /> : null}
            <Signin />
            <Signup />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                
            </Routes>
   
        </Router>
    )
}

export default MainRouter