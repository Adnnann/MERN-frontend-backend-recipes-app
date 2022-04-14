import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { getUserSigninData } from './features/recipesSlice'
import { useSelector } from 'react-redux'
import Signin from './components/user/Signin'
import Signup from './components/user/Signup'
import Home from './components/Home'
import Header from './components/core/Header'
import ViewRecipe from './components/ViewRecipe'
import EditRecipe from './components/EditRecipe'
import AddRecipe from './components/AddRecipe'
import ViewProfile from './components/ViewProfile'
import EditUser from './components/EditUser'
import UserRecipes from './components/UserRecipes'

const MainRouter = () => {

    const userSiginData = useSelector(getUserSigninData)

    return(
        <Router>
            {userSiginData.hasOwnProperty('token') ? <Header /> : null}
            <Signin />
            <Signup />
            <EditRecipe />
            <AddRecipe />
            <ViewProfile />
            <EditUser />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/viewRecipe' element={<ViewRecipe />}></Route>
                <Route path='/userRecipes' element={<UserRecipes />}></Route>
            </Routes>
   
        </Router>
    )
}

export default MainRouter