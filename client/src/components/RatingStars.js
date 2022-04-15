import ReactStarsRating from 'react-awesome-stars-rating';

const RatingStars = ({rating, handleRating}) => {

  
    return(
   
      <ReactStarsRating 
            onChange={handleRating} 
            value={rating}
            size={25}
             /> 
            
    )
}

export default RatingStars