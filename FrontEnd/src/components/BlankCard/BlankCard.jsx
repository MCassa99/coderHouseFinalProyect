import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlankCard = () => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };


    return (
        <Link to={`/addProduct`} className="text-decoration-none">
            <div
                className="card round-5 h-100"
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                style={{ cursor: "pointer" }}
            >
                <div>
                    <img src='https://wumbo.net/symbols/plus/feature.png' className="card-img-top" />
                </div>
                <div>
                    <h4 className="text-center">Add Product</h4>
                    <div className="card-body mb-4 text-center">Click here to add a new product to the inventory.</div>
                    <div className="card-footer">
                        <div className="d-flex align-items-center justify-content-center">
                            <span className="price">Click Aqui</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            Para agregar un nuevo producto
                            {isHovering && <div style={{ marginLeft: 1 + "rem" }}>➜</div>}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlankCard;