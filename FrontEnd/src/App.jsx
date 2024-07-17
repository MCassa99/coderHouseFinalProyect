import "./App.scss"; // Se importan estilos de scss
import React, { useEffect, useState } from "react"; // Se importa useState
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Se importan las rutas
import Home from "./components/Hero/Hero.jsx"; // Se importa el componente Home
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx"; // Se importa el componente ItemListContainer
import NavbarComponent from "./components/Navbar/Navbar.jsx"; // Se importa el componente Navbar
import Error from "./components/Error/Error.jsx"; // Se importa el componente Error
import ProductDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import ProcessPurchase from "./components/ProcessPurchase/ProcessPurchase.jsx";
import Cart from "./components/Cart/Cart.jsx"
import CartProvider from "./components/CartContext/CartContext.jsx";
import CheckOut from "./components/CheckOut/CheckOut.jsx";
import UserSettings from "./components/User/UserSettings.jsx";
import Login from "./components/Login/Login.jsx";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    fetch("/api/session/current", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Usuario logeado:") {
          setLogin(true);
        }
      });
  }, []);
  
  if (login) {
    console.log("Usuario logeado");
  } else {
    console.log("Usuario no logeado");
  }
  
  return (
    !login ? // Si no hay login se renderiza el componente Login
      <Login />
    :
    // Se renderiza el componente App
    <div className="App">
      <div className="bg">
        <BrowserRouter>
          <CartProvider>
            <NavbarComponent />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/travelvip" element={<ItemListContainer />} />
              <Route path="/category/:id" element={<ItemListContainer />} />
              <Route path="/destino/:id" element={<ProductDetailContainer />} />
              <Route path="/process/:id" element={<ProcessPurchase />} />
              <Route path="/process/:id/:qty" element={<ProcessPurchase />} />
              <Route path="/cotizador" element={<Error />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/profile/:id" element={<UserSettings />} />
              <Route path="/settings/:id" element={<UserSettings />} />
              <Route path="/logout" element={<Error />} />
              <Route path="/error/:id" element={<Error />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </CartProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
