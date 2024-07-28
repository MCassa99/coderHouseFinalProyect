import "./App.scss"; // Se importan estilos de scss
import React, { useEffect, useState } from "react"; // Se importa useState
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"; // Se importan las rutas
import Home from "./components/Hero/Hero.jsx"; // Se importa el componente Home
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx"; // Se importa el componente ItemListContainer
import NavbarComponent from "./components/Navbar/Navbar.jsx"; // Se importa el componente Navbar
import Error from "./components/Error/Error.jsx"; // Se importa el componente Error
import ProductDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import ProcessPurchase from "./components/ProcessPurchase/ProcessPurchase.jsx";
import Cart from "./components/Cart/Cart.jsx";
import CartProvider from "./components/CartContext/CartContext.jsx";
import CheckOut from "./components/CheckOut/CheckOut.jsx";
import UserSettings from "./components/User/UserSettings.jsx";
import Login from "./components/Login/Login.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import AddProduct from "./components/AddProduct/AddProduct.jsx";

function App() {
  
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState('User');
  const [id, setID] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/api/session/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        setRole(res.user.role); // Se setea el usuario
        setID(res.user._id); // Se setea el id del usuario
        setLogin(true); // Si hay un usuario logeado se setea login en true
      } else {
        setLogin(false); // Si no hay un usuario logeado se setea login en false
        if (window.location.pathname !== "/login") window.location.replace(`http://localhost:5173/login`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    // Se renderiza el componente App
    <div className="App">
      <div className="bg">
        <BrowserRouter>
          <CartProvider>
            <NavbarComponent role={ role } id={ id } />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login setLogin={ setLogin } />} />
              <Route path="/travelvip" element={<ItemListContainer />} />
              <Route path="/category/:id" element={<ItemListContainer user={ role } />} />
              { role === 'Admin' ?
                <>
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/updateProduct/:id" element={<AddProduct />} />
                <Route path="/cotizador" element={<Error />} />
                </>
                :
                null
              }
              <Route path="/destino/:id" element={<ProductDetailContainer />} />
              <Route path="/process/:id" element={<ProcessPurchase />} />
              <Route path="/process/:id/:qty" element={<ProcessPurchase />} />
              <Route path="/resetPassword/:token/success" element={<ResetPassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/profile/:id" element={<UserSettings />} />
              <Route path="/settings/:id" element={<UserSettings />} />
              <Route path="/logout" element={<LogoutHandler setLogin={setLogin} />} />
              <Route path="/error/:id" element={<Error />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </CartProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

const LogoutHandler = ({ setLogin }) => {
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/api/session/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    })
    .then((res) => {
      if (res.status === 200) {
        setLogin(false); // Si no hay un usuario logeado se setea login en false
        navigate("/login"); // Redirigir a la página de login
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, [navigate, setLogin]);

  return null; // No renderiza nada, solo ejecuta el logout
};

export default App;
