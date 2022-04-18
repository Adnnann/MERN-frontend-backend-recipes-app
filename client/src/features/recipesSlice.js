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

export const editUser = createAsyncThunk('recipe/editedUser', async(editedUser)=>{
  return await axios.put(`api/users/${editedUser.param}`, editedUser.data, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const removeUser = createAsyncThunk('recipe/deletedUser', async(param)=>{
  return await axios.delete(`api/users/${param}`, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const uploadRecipeImage = createAsyncThunk('library/uploadImageStatus', async(file)=>{
  return await axios.post('/uploadImage', file)
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

export const editRecipe = createAsyncThunk('recipe/editedRecipe', async(editedRecipe)=>{
  return axios.put(`/api/recipes/${editedRecipe.param}`, editedRecipe.data, {
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const userToken = createAsyncThunk('users/token', async()=>{
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
  userData:{},
  token:{},
  signedOut:{},
  editedUser:{},
  //recipes
  addRecipe:{},
  allRecipes:{},
  recipeToEdit:{},
  recipeWindowModal:false,
  selectedRecipe: [],
  showModal: false,
  recipe:[],
  filterRecipes:'',
  uploadImageStatus:{},
  editRecipeModal: false,
  addRecipeModal:false,
  recipeToAdd:{},
  editedRecipe:{},
  userProfileModal:false,
  editUserProfile:false,
  deletedUser:{},
  sortedRating:{},
  filterIcon:true
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
      state.recipe = action.payload
    },
    setFilterRecipes: (state, action) => {
      console.log(state.filterRecipes)
        state.filterRecipes = action.payload
    },
    setRecipeToEdit:(state, action) => {
      state.recipeToEdit = action.payload
    },
    setEditRecipeModal:(state, action) =>{
      state.editRecipeModal = action.payload
    },
    setAddRecipeModal:(state, action) =>{
      state.addRecipeModal = action.payload
    },
    setRecipeToAdd: (state, action) => {
      state.recipeToAdd = action.payload
    },
    clearEditRecipeMessageStatus: (state, action) => {
      state.editedRecipe = {}
    },
    clearAddRecipeMessageStatus: (state, action) => {
      state.addRecipe = {}
    },
    setUserProfileModalStatus: (state, action) => {
      state.userProfileModal = action.payload
    },
    setUserEditProfileModal: (state, action) => {
      state.editUserModal = action.payload
    },
    clearEditUserMessageStatus: (state, action) => {
      state.editedUser = {}
    },
    clearDeletUserMessageStatus: (state, action) => {
      state.deletedUser = {}
    },
    clearEditUserMessageStatus: (state, action) => {
      state.editedUser = {}
    },
    setSortedRating:(state,action) => {
      state.sortedRating = action.payload
    },
    clearUploadImageStatus: (state, action) => {
      state.uploadImageStatus = {}
    },
    clearUsingLoginStatus: (state, action) => {
      state.userSigninData = {}
    },
    setNewUserData: (state, action) => {
      state.userSigninData = action.payload
    },
    setFilterIcon: (state, action) => {
      state.filterIcon = action.payload
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
      return {...state, token:payload}
    },
    [signoutUser.fulfilled]: (state, {payload}) => {
      return {...state, signedOut:payload}
    },
    [uploadRecipeImage.fulfilled]: (state, {payload}) => {
      return {...state, uploadImageStatus: payload}
    },
    [editRecipe.fulfilled]: (state, {payload}) => {
      return {...state, editedRecipe: payload}
    },
    [createRecipe.fulfilled]: (state, {payload}) => {
      return {...state, addRecipe: payload}
    },
    [editUser.fulfilled]: (state, {payload}) => {
      return {...state, editedUser:payload}
    },
    [removeUser.fulfilled]: (state, {payload}) => {
      return {...state, deletedUser: payload}
    }
    
  }
   
});

export const getSigninModal = (state) => state.recipes.signinModal
export const getSignupModal = (state) => state.recipes.signupModal
export const getUserProfile = (state) => state.recipes.userProfile
export const getUserSigninData = (state) => state.recipes.userSigninData
export const getUserData = (state) => state.recipes.userData
export const getUserSigninStatus = (state) => state.recipes.signedInUser
export const getUserToken = (state) => state.recipes.token
export const getUserProfileModalStatus = (state) => state.recipes.userProfileModal
export const getEditUserModalStatus = (state) => state.recipes.editUserModal
export const getEditedUserStatus = (state) => state.recipes.editedUser
export const getDeletedUserStatus = (state) => state.recipes.deletedUser
//recipes
export const getCreatedRecipeData = (state) => state.recipes.addRecipe
export const getAllRecipes = (state) => state.recipes.allRecipes
export const getRecipeWindowModal = (state) => state.recipes.recipeWindowModal
export const getSelectedDough = (state) => state.recipes.selectedRecipe
export const getModal = (state) => state.recipes.showModal
export const getRecipe = (state) => state.recipes.recipe
export const getRecipeToEdit = (state) => state.recipes.recipeToEdit
export const getFilterRecipes = (state) => state.recipes.filterRecipes
export const getUploadImageStatus = (state) => state.recipes.uploadImageStatus
export const getEditRecipeModalStatus = (state) => state.recipes.editRecipeModal
export const getEditRecipeStatus = (state) => state.recipes.editedRecipe
export const getRecipeToAdd = (state) => state.recipes.recipeToAdd
export const getAddRecipeStatus = (state) => state.recipes.addRecipe
export const getAddRecipeModalStatus = (state) => state.recipes.addRecipeModal
export const getSortedRating = (state) =>state.recipes.sortedRating
export const getFilterIcon = (state) => state.recipes.filterIcon

export const {
              setSigninModal,
              setSignupModal,
              setUserSiginStatus, 
              setSelectedDough, 
              setModal, 
              setRecipe,
              removeRecipe,
              setRecipeWindowModal,
              clearRecipe,
              resetStore,
              setFilterRecipes,
              setEditRecipeModal,
              setRecipeToEdit,
              setAddRecipeModal,
              setRecipeToAdd,
              clearAddRecipeMessageStatus,
              clearEditRecipeMessageStatus,
              setUserProfileModalStatus,
              setUserEditProfileModal,
              clearEditUserMessageStatus,
              clearDeletUserMessageStatus,
              setSortedRating,
              clearUploadImageStatus,
              clearUsingLoginStatus,
              setNewUserData,
              setFilterIcon
} = recipesSlice.actions


export default recipesSlice.reducer;