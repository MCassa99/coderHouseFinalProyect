import React from "react";
import { useCartContext } from "../CartContext/CartContext";
import { RxCross2 } from "react-icons/rx";
import { FaPlane } from "react-icons/fa";
import PassengerCard from "../PassengerCard/PassengerCard";
import { useUserContext } from "../UserContext/UserContext";

const ItemCart = ({ product, qty }) => {
  const { removeProductFromCart } = useCartContext();
  const { user } = useUserContext();

  if (!product) {
    return null; // or return some fallback UI
  }

  const { _id, title, category } = product;

  let titleClass = "text-center rounded-5 p-2 mb-3 ";
  titleClass += category === "vuelos" ? "bg-info" : category === "hoteles" ? "bg-warning" : "bg-success";

  const handleRemoveProduct = () => {
    removeProductFromCart(user.cart_id, _id);
  };

  return (
    <div>
      <button className="btn btn-danger cart-button" onClick={handleRemoveProduct}>
        <RxCross2 size={25} style={{ marginLeft: -0.6 + "rem", marginTop: -0.6 + "rem" }} />
      </button>
      <div className="row">
        <div className="bg-light p-4 rounded-5">
          <div id="item-info">
            <h3 className={titleClass}>{title.toUpperCase()}</h3>
          </div>
          <div id="passenger-info">
            <div className="d-flex justify-content-around mb-3">
              <div className="flex-column">
                <p>PASAJERO</p>
                <p className="cart-text"><strong>MCASSA99</strong></p>
              </div>
              <div className="flex-column">
                <p>VUELO</p>
                <p className="cart-text"><strong>AF1234</strong></p>
              </div>
              <div className="flex-column">
                <p>DIA</p>
                <p className="cart-text"><strong>12 DEC 2021</strong></p>
              </div>
              <div className="flex-column">
                <p>ASIENTO</p>
                <p className="cart-text"><strong>62</strong></p>
              </div>
            </div>
          </div>
          <div id="flight-info">
            <div className="d-flex justify-content-center flex-row mb-3">
              <p><strong className="m-5 h2">ORIGEN</strong></p>
              <FaPlane size={60} className="mx-5" />
              <p><strong className="m-5 h2">DESTINO</strong></p>
            </div>
          </div>
          <div id="flight-additional-info">
            <div className="d-flex justify-content-around mb-3">
              <div className="flex-column text-center">
                <p>HORA DE EMBARQUE</p>
                <p className="cart-text"><strong>21:30</strong></p>
              </div>
            </div>
            <div className="d-flex" style={{ marginInline: 5 + "rem", marginTop: -4 + "rem" }}>
              <div className="flex-column">
                <p>PUERTA</p>
                <p className="cart-text"><strong>53</strong></p>
              </div>
              <div className="flex-column ms-auto text-end">
                <p>VENDIDO POR AGENTE</p>
                <p className="cart-text"><strong>MATIAS CASSANELLO</strong></p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="dropdown-center d-flex justify-content-center" style={{ marginTop: -2.6 + "rem" }}>
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Agregar Información de Pasajero
            </button>
            <div className="dropdown-menu w-100">
              <div><PassengerCard passenger={user} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
