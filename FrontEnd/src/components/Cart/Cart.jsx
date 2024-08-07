import React from "react";
import { useCartContext } from "../CartContext/CartContext.jsx";
import ItemCart from "../ItemCart/ItemCart.jsx";
import { Link } from "react-router-dom";
import Brief from "../Brief/Brief.jsx";

const Cart = () => {
  const { getCartCount, cartItems } = useCartContext();

  if (getCartCount() === 0) {
    return (
      <div className="d-flex flex-column justify-content-center text-center p-5 background-details" style={{ backgroundColor: "lightgrey" }}>
        <h1 className="mb-3"> NO HAY PRODUCTOS EN EL CARRITO </h1>
        <h4> ¡Agrega Productos al Carrito 😁!</h4>
        <div className="mb-2">
          <Link to={`/`} className="text-decoration-none">
            <button className="btn btn-lg btn-primary">
              Volver a la Tienda
            </button>
          </Link>
        </div>
      </div>
    );
  }
  console.log(cartItems);

  return (
    <div className="d-flex justify-content-evenly mt-5">
      <div className="col-8 rounded-5">
        {cartItems.map((product) => (
          <ItemCart
            key={product._id}
            product={product.id_prod}
            qty={product.quantity}
          />
        ))}
      </div>
      <div className="col-3 bg-light rounded-5 mt-4 h-100 d-inline-block">
        <div className="h-100 p-4 d-flex flex-column justify-content-center">
          <div className="row align-items-start">
            <h3>Resumen del Pedido</h3>
            <p className="col">
              <strong>Cantidad de Productos: {getCartCount()}</strong>
            </p>
            <hr />
          </div>

          <div className="col">
            {cartItems.map((product) => (
              <div key={product._id}>
                {Array.from({ length: product.quantity }, (_, index) => (
                  <div key={index + product._id}>
                    <div className="row justify-content-between">
                      <p className="col-auto">{product.id_prod.title}</p>
                      <p className="col-3">${product.id_prod.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <hr className="mt-5" />
          <Brief />
        </div>
      </div>
    </div>
  );
};

export default Cart;
