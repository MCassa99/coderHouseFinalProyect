import { useState, useContext, createContext, useEffect } from "react";
import { useUserContext } from "../UserContext/UserContext";
import Swal from 'sweetalert2';


const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useUserContext();

   // console.log(user);
    useEffect(() => {
        if (user && user.cart_id) {
            fetch(`http://localhost:3000/api/cart/${user.cart_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setCartItems(data.products);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, [user]);

    const addToCart = (product, userID) => {
        fetch(`http://localhost:3000/api/cart/${userID}/${product._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quantity: 1,
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    Swal.fire({
                        title: 'Destino Habilitado!',
                        text: 'Ha quedado habilitado el destino en tu carrito',
                        icon: 'success'
                    }).then(() => {
                        window.location.replace(`http://localhost:5173/cart/${user.cart_id}`);
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: data.message,
                        icon: 'error'
                    });
                }
            })

    };

    const removeProductFromCart = (cartID, itemID) => {
        fetch(`http://localhost:3000/api/cart/${cartID}/${itemID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            include: "credentials"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    Swal.fire({
                        title: 'Producto Eliminado!',
                        text: 'El producto ha sido eliminado de tu carrito',
                        icon: 'success'
                    }).then(() => {
                        window.location.replace(`http://localhost:5173/cart/${user.cart_id}`);
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: data.message,
                        icon: 'error'
                    });
                }
            })
    };

    const clearCart = () => {
        
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.id_prod.price * item.quantity, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                addToCart,
                removeProductFromCart,
                clearCart,
                getCartTotal,
                getCartCount,
                cartItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
