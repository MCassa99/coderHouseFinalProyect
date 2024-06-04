import { Link } from "react-router-dom";
import { createPortal } from 'react-dom'
import { useCartContext } from '../CartContext/CartContext';

import { useState } from 'react'
import Swal from 'sweetalert2'

const Brief = () => {
  const { getCartTotal } = useCartContext();

  function pay() {
    Swal.fire({
      title: "Pasarela de Pago",
      text: "Al presionar el boton sera redireccionado a la pasarela de pago segura.",
      icon: "success",
      confirmButtonText: "Genial!",
    })
  }

  return (
    <div>
      <div className="row justify-content-between">
        <p className="col-auto">Subtotal:</p>
        <p className="col-3">${getCartTotal()}</p>
      </div>
      <div className="row justify-content-between">
        <p className="col-auto">Total:</p>
        <p className="col-3">${getCartTotal() * 1.22}</p>
      </div>
      <div className="">
      <Link to="/checkout">
        <button onClick={pay} className="w-100 btn btn-primary">PAGAR</button>
      </Link> 
      </div>
    </div>
  );
};

export default Brief;
