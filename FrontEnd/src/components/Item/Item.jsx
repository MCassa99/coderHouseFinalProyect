import { useState } from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";

const Item = ({ destino }) => {
  // Declarar todas las constantes fuera del bloque if
  let _id, title, description, price, thumbnail, category, status, code, transshipment, stay_time, rating, image;

  // Asignar valores en función de la categoría
  if (destino.category === 'vuelos') {
    ({ _id, title, description, price, thumbnail, category, status, code, transshipment, rating, image } = destino);
  } else {
    ({ _id, title, description, price, thumbnail, category, status, code, stay_time, rating, image } = destino);
  }

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    // Si el status es false, no se muestra el destino
    status === false ? null :
    <Link to={`api/products/${_id}`} className="text-decoration-none">
      <div
        className="card round-5"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{ cursor: "pointer" }}
      >
        <div>
          <img src={thumbnail} className="card-img-top" />
        </div>
        <span className="stay">
          { category === 'vuelos' ? transshipment : stay_time } Días { category === 'vuelos' ? transshipment <= 1 ? '' : `/ ${transshipment-1} Noches` : stay_time <= 1 ? '' :  `/ ${stay_time-1} Noches` }
        </span>
        <div>
          <h5 className="text-center">
            {title}
            <StarRating rating={rating} />
          </h5>
          <div className="card-body">{description}</div>
          <div className="card-footer">
            <div className="d-flex align-items-center justify-content-center">
              <span className="price">Desde: ${price}</span>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              Más Información
              {isHovering && <div style={{ marginLeft: 1 + "rem" }}>➜</div>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;