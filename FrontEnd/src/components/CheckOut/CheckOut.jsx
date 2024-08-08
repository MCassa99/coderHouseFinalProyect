import { useCartContext } from "../CartContext/CartContext";
import { useState } from "react";
import Swal from "sweetalert2";

const CheckOut = ({ children }) => {

  const [buyer, setBuyer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    confirmEmail: "",
  });
  console.log(buyer);

  const { getCartTotal, cartID, createTicket } = useCartContext();

  function success() {
    const pay = createTicket(cartID, buyer.email);
    console.log(pay);
  }

  function errorDatos() {
    Swal.fire({
      title: "Error",
      text: "Hubo un error en el pago, por favor verifique los datos ingresados.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }

  function paySuccess() {
    //console.log(nombre, apellido, email, telefono, confirmEmail);
    let verify = buyer.first_name != "" && buyer.last_name != "" && buyer.email != "" && buyer.phone != "" && buyer.email == buyer.confirmEmail;
    //console.log(verify);
    verify ? success() : errorDatos();
    
  }
  return (
    <div className="container w-50 mt-5">
      <div className="row justify-content-center">
        <h2> Complete el formulario para finalizar la compra </h2>
        <form >
          <div className="row">
            <div className="col">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Nombre"
                required
                value={buyer.first_name}
                onChange={(e) => setBuyer({ ...buyer, first_name: e.target.value })}
              />
            </div>
            <div className="col">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                placeholder="Apellido"
                required
                value={buyer.last_name}
                onChange={(e) => setBuyer({ ...buyer, last_name: e.target.value })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                required
                value={buyer.email}
                onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
              />
            </div>
            <div className="col">
              <label htmlFor="confirmEmail">Confirmar Email</label>
              <input
                type="email"
                className="form-control"
                id="confirmEmail"
                placeholder="Confirmar Email"
                required
                value={buyer.confirmEmail}
                onChange={(e) => setBuyer({ ...buyer, confirmEmail: e.target.value })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="telefono">Telefono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                placeholder="Telefono"
                required
                value={buyer.phone}
                onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="payment">Total a Pagar</label>
              <input
                type="text"
                className="form-control"
                id="payment"
                placeholder="Pago"
                required
                value={getCartTotal()*1.22}
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button
                className="btn btn-primary mt-5 w-100"
                id="payBtn"
                type="button" 
                onClick={paySuccess}
              >
                Pagar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
