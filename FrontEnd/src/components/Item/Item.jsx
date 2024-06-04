import { useState } from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";

const Item = ({ destino, children }) => {
  
  const { id, title, stay, rating, img } = destino;

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Link to={`/destino/${id}`} className="text-decoration-none">
      <div
        className="card round-5"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{ cursor: "pointer" }}
      >
        <div>
          <img src={img} className="card-img-top" />
        </div>
        <span className="stay">
          { destino.cat === 'vuelos' ? destino.transshipment : stay } Dias { destino.cat === 'vuelos' ? destino.transshipment <= 1 ? '' : `/ ${destino.transshipment-1} Noches` : stay <= 1 ? '' :  `/ ${stay-1} Noches` }
        </span>
        <div>
          <h5 className="text-center">
            {title}
            <StarRating rating={rating} />
          </h5>
          <div className="card-body">{children}</div>
          <div className="card-footer">
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
