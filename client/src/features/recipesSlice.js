import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchAsyncUser = createAsyncThunk('recipe/userProfile', async(user)=>{
  return await axios.post('api/users/', user, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const loginUser = createAsyncThunk('recipe/userLoginData', async(user)=>{
  return await axios.post('/auth/signin', user, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const saveUserAdress = createAsyncThunk('recipe/userAddress', async(address)=>{
  return axios.put(`/api/users/${address.id}`, {addressData:address}, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const removeUserAdress = createAsyncThunk('recipe/userAddress', async(removeAddress)=>{
  return axios.put(`/api/users/removeAddress/${removeAddress.param}`, {index:removeAddress.index}, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const readUserData = createAsyncThunk('recipe/userData', async(param)=>{
  return axios.get(`/api/users/${param}`, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const createRecipe = createAsyncThunk('recipe/addRecipe', async(recipe)=>{
  return axios.post('/api/recipes',recipe,{
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const fetchRecipes = createAsyncThunk('recipe/allRecipes', async()=>{
  return axios.get('/api/recipes',{
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const editRecipe = createAsyncThunk('recipe/editedRecipe', async(recipe)=>{
  return axios.put(`/api/recipes/${recipe.param}`, recipe.data, {
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const userToken = createAsyncThunk('users/protected', async()=>{
  return await axios.get('/protected', { 
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response=>response.data)
  .catch(error=>error.message)
})

export const signoutUser = createAsyncThunk('users/user', async()=>{
  const response = await axios.post('/auth/signout')
  return response.data
})

const initialState = {
  //user data
  signinModal: true,
  signupModal: false,
  userProfile:{},
  userSigninData:{},
  signedInUser: false,
  userAddress:{},
  userData:{},
  userToken:{},
  signedOut:{},
  //recipes
  addRecipe:{},
  allRecipes:{},
  recipeWindowModal:false,
  selectedRecipe: [],
  showModal: false,
  recipe:[],
  filterRecipes:''
}

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState, 

  reducers: {
    setSigninModal:(state, action) => {
      state.signinModal = action.payload
    },
    setSignupModal:(state, action) => {
      state.signupModal = action.payload
    },
    setUserSiginStatus: (state, action) => {
      state.signedInUser = action.payload
    },
    setSelectedDough: (state, action) => {
      state.selectedRecipe = action.payload 
    },
    setModal:(state, action) => {
      state.showModal = action.payload
    },
    setRecipe:(state, action) => {
      return {
        ...state, 
        recipe: state.recipe.concat(action.payload)
      }
    },
    setFilterRecipes: (state, action) => {
        state.filterRecipes = action.payload
    },
    resetStore:()=> initialState
  
  },
  //fetching from server
  extraReducers: {
    [fetchAsyncUser.fulfilled]:(state, {payload})=>{
        return {...state, userProfile:payload}
    },
    [loginUser.fulfilled]:(state, {payload})=>{
        return {...state, userSigninData:payload}
    },
    [saveUserAdress.fulfilled]:(state, {payload})=>{
      return {...state, userAddress:payload}
    },
    [readUserData.fulfilled]:(state, {payload})=>{
      return {...state, userData:payload}
    },
    [createRecipe.fulfilled]:(state, {payload})=>{
      return {...state, addRecipe:payload}
    },
    [fetchRecipes.fulfilled]:(state, {payload})=>{
      return {...state, allRecipes:payload}
    },
    [userToken.fulfilled]:(state,{payload})=>{
      return {...state, userToken:payload}
    },
    [signoutUser.fulfilled]: (state, {payload}) => {
      return {...state, signedOut:payload}
    },
  }
   
});

export const getSigninModal = (state) => state.recipes.signinModal
export const getSignupModal = (state) => state.recipes.signupModal
export const getUserProfile = (state) => state.recipes.userProfile
export const getUserSigninData = (state) => state.recipes.userSigninData
export const getUserAddress = (state) => state.recipes.userAddress
export const getUserData = (state) => state.recipes.userData
export const getUserSigninStatus = (state) => state.recipes.signedInUser
export const getUserToken = (state) => state.recipes.userToken

//recipes
export const getCreatedRecipeData = (state) => state.recipes.addRecipe
export const getAllRecipes = (state) => state.recipes.allRecipes
export const getRecipeWindowModal = (state) => state.recipes.recipeWindowModal
export const getSelectedDough = (state) => state.recipes.selectedRecipe
export const getModal = (state) => state.recipes.showModal
export const getRecipe = (state) => state.recipes.recipe
export const getFilterRecipes = (state) => state.recipes.filterRecipes


export const {setSigninModal,
              setSignupModal,
              setUserSiginStatus, 
              setSelectedDough, 
              setModal, 
              setRecipe,
              removeRecipe,
              setRecipeWindowModal,
              clearRecipe,
              resetStore,
              setFilterRecipes
} = recipesSlice.actions

export default recipesSlice.reducer;