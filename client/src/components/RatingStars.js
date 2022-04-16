import ReactStarsRating from 'react-awesome-stars-rating';

const RatingStars = ({rating, handleRating, size,edit}) => {

  
    return(
   
      <ReactStarsRating
        count={5}
        isHalf={true}
        onChange={handleRating} 
        value={rating}
        size={size}
        isEdit={edit}
      /> 
            
    )
}

export default RatingStars