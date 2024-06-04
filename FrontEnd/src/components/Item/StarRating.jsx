import { IoStar } from "react-icons/io5";

const StarRating = ({ rating }) => {

  function convertirProporcion(Real) {
    let Integer = parseInt(Real);
    let Prop = (Integer / 2);
    return Prop;
  }

  const displayedStars = Array.from({ length: convertirProporcion(rating) });

  return (
    <div className="rating">
      <div>
        {displayedStars.map((_, index) => (
          <span key={index} className="text-warning"><IoStar /></span>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
