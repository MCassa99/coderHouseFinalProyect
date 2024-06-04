import { useCartContext } from "../CartContext/CartContext";
import { useState } from "react";
import Swal from "sweetalert2";

const CheckOut = ({ children }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState(false);
  const [orderID, setOrderID] = useState("");

  const { getCartTotal, clearCart } = useCartContext();

  function success() {
    Swal.fire({
      title: "Pago Exitoso",
      text: "Su pago fue exitoso, sera redireccionado a la pagina de inicio.",
      icon: "success",
      confirmButtonText: "Genial!",
    });
    new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
      clearCart();
      window.location.href = "/";
    });
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
    console.log(nombre, apellido, email, telefono, confirmEmail);
    let verify = nombre != "" && apellido != "" && email != "" && telefono != "" && email == confirmEmail;
    console.log(verify);
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
                onChange={(e) => setNombre(e.target.value)}
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
                onChange={(e) => setApellido(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setConfirmEmail(e.target.value)}
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
                onChange={(e) => setTelefono(e.target.value)}
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
