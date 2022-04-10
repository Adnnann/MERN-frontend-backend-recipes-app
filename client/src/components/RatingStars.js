import ReactStarsRating from 'react-awesome-stars-rating';
import { useState } from 'react';


const RatingStars = ({rating, handleRating}) => {

//const [rating, setRating] = useState()

    // const onChange = (event) => {
    //     setRating(event)
    //   };
    
    return(
   
      <ReactStarsRating 
            onChange={handleRating} 
            //style={{pointerEffect:'none'}}
            value={rating}
            size={25}
             /> 
            
    )
}

export default RatingStars