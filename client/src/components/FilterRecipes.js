import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import { setFilterRecipes } from '../features/recipesSlice'
const FilterRecipes = () => {
    
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(setFilterRecipes(event.target.value))
    }
    
    return(
        <InputGroup
        style={{marginBottom:'20px', width:'40%', marginLeft:'auto', marginTop:"20px"}}>
            <Form.Control 
            placeholder='Search'
            style={{height:"30px", borderRadius:'20px', paddingLeft:'20px'}} 
            onChange={(e)=>handleChange(e)}/>
            <div 
                style={{
                position:'absolute',
                paddingLeft:'5px', 
                zIndex:'9999'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </div>
        </InputGroup>
    )
}

export default FilterRecipes

