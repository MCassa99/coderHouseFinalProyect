import { useState } from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";

const Item = ({ destino }) => {
  let _id, title, description, price, thumbnail, category, status, code, transshipment, stay_time, rating, image;

  if (destino.category === 'vuelos') {
    ({ _id, title, description, price, thumbnail, category, status, code, transshipment, rating, image } = destino);
  } else if (destino.category === 'hoteles') {
    ({ _id, title, description, price, thumbnail, category, status, code, stay_time, rating, image } = destino);
  } else {
    ({ _id, title, description, price, thumbnail, category, status, code, transshipment, stay_time, rating, image } = destino);
  }

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    status === false ? null :
    <Link to={`/destino/${_id}`} className="text-decoration-none">
      <div
        className="card h-100"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{ cursor: "pointer" }}
      >
        <div className="position-relative">
          <img src={image} className="card-img-top" alt={title} />
          <span className="stay">
            { category === 'vuelos' ? transshipment : stay_time } Días { category === 'vuelos' ? transshipment <= 1 ? '' : `/ ${transshipment-1} Noches` : stay_time <= 1 ? '' :  `/ ${stay_time-1} Noches` }
          </span>
        </div>
        <div className="card-body d-flex flex-column">
          <h4 className="text-center">
            {title}
            <StarRating rating={rating} />
          </h4>
          <p className="flex-grow-1 text-center">{description}</p>
        </div>
        <div className="card-footer">
          <div className="d-flex align-items-center justify-content-center">
            <span className="price">Desde: ${price}</span>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            Más Información
            {isHovering && <div style={{ marginLeft: '1rem' }}>➜</div>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
  