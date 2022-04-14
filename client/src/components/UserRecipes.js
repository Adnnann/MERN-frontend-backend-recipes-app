
import BootstrapTable from 'react-bootstrap-table-next';
import TableHeaderColumn from 'react-bootstrap-table-next';
import { useDispatch, useSelector } from 'react-redux';
import dateFormat from 'dateformat'

import { getAllRecipes } from '../features/recipesSlice';
import RatingStars from './RatingStars';

import Container from 'react-bootstrap/esm/Container';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import _ from 'lodash'
import { setSortedRating, getSortedRating } from '../features/recipesSlice';




const UserRecipes = () => {

const allRecipes = useSelector(getAllRecipes)
let recipes = []
let test = []
const sortRating = useSelector(getSortedRating)
const dispatch = useDispatch()

for(let i=0; i<Object.values(allRecipes).length;i++){
    recipes.push({
        status: Object.values(allRecipes)[i].status,
        title: Object.values(allRecipes)[i].title,
        ratingNum: [Object.values(allRecipes)[i].rating],
        rating: <div index={i} style={{pointerEvents:"none"}}><RatingStars rating={Number(Object.values(allRecipes)[i].rating)} /></div>,
        date: dateFormat(new Date(Object.values(allRecipes)[i].created), "dd.mm.yyyy hh:mm"),
        category: Object.values(allRecipes)[i].category,
        actions: <div key={Object.values(allRecipes)[i]._id}>

           
            <svg onClick={()=>console.log(Object.values(allRecipes)[i]._id)} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"  className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                     

            
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" style={{marginLeft:'20px'}}  className="bi bi-pen" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                        </svg>
           

             
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" style={{marginLeft:'20px'}} className="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
              

                </div>

    })

  test.push(Number(Object.values(allRecipes)[i].rating))
    
}


console.log(recipes)


const columns = [{
    dataField: 'title',
    text: 'Title',
    sort:true
  }, 
  {
    dataField: 'rating',
    text: 'Rating',
    sort:true,
    headerEvents: {
        onClick: (e, column, columnIndex) => dispatch(setSortedRating({sortBy:'ratingNum', 
        order: sortRating.order === 'desc' ? 'asc' : 'desc'}))
      }
  }, 
  {
    dataField: 'date',
    text: 'Date',
    sort:true
  },
  {
    dataField: 'category',
    text: 'Category'
  },
  {
    dataField: 'actions',
    text: 'Action'
  },
  
];


  
    return (
        <Container className={'justify-content-center'}>
         <BootstrapTable 
         keyField='title' 
         data={ sortRating?.sortBy ? _.orderBy(recipes,[sortRating.sortBy],[sortRating.order]) : recipes} 
         columns={ columns } 
         striped />
      </Container>
    );

    
 
}

export default UserRecipes