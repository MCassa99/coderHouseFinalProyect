import "./App.scss";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Hero/Hero.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import NavbarComponent from "./components/Navbar/Navbar.jsx";
import Error from "./components/Error/Error.jsx";
import ProductDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import ProcessPurchase from "./components/ProcessPurchase/ProcessPurchase.jsx";
import Cart from "./components/Cart/Cart.jsx";
import CartProvider from "./components/CartContext/CartContext.jsx";
import CheckOut from "./components/CheckOut/CheckOut.jsx";
import UserSettings from "./components/User/UserSettings.jsx";
import Login from "./components/Login/Login.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import AddProduct from "./components/AddProduct/AddProduct.jsx";
import { UserProvider, useUserContext } from "./components/UserContext/UserContext.jsx";

function App() {
  const navigate = useNavigate();
  const { user, loggedIn } = useUserContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loggedIn) {
        navigate("/login");
      }
    }, 200); // Redirect to login after 200ms if user is not logged in

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="App">
      <div className="bg">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/travelvip" element={<ItemListContainer />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/destino/:id" element={<ProductDetailContainer />} />
          <Route path="/process/:id" element={<ProcessPurchase />} />
          <Route path="/process/:id/:qty" element={<ProcessPurchase />} />
          <Route path="/resetPassword/:token/success" element={<ResetPassword />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/profile/:id" element={<UserSettings />} />
          <Route path="/settings/:id" element={<UserSettings />} />
          <Route path="/logout" element={<LogoutHandler />} />
          <Route path="/error/:id" element={<Error />} />
          <Route path="*" element={<Error />} />
          {getAdminRoutes()}
        </Routes>
      </div>
    </div>
  );
}

const getAdminRoutes = () => {
  const { user } = useUserContext();

  if (user?.role === 'Admin') {
    return (
      <React.Fragment>
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/updateProduct/:id" element={<AddProduct />} />
        <Route path="/cotizador" element={<Error />} />
      </React.Fragment>
    );
  }
  return null;
};

const LogoutHandler = () => {
  const { logoutUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [logoutUser, navigate]);

  return null;
};

export default function Root() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
