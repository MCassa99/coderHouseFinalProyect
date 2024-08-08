import { useState, useContext, createContext, useEffect } from "react";
import { useUserContext } from "../UserContext/UserContext";
import Swal from 'sweetalert2';


const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartID, setCartID] = useState(null);
    const { user } = useUserContext();

   // console.log(user);
    useEffect(() => {
        if (user && user.cart_id) {
            setCartID(user.cart_id);
            fetch(`http://localhost:3000/api/cart/${user.cart_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 200) {
                        setCartItems(data.cart.products);
                    } else {
                        console.error(data.message);
                    }
                })
            .catch((error) => {
                console.error(error);
            });
        }
    }, [user]);

    const handleSendTicket = (data) => {
        fetch(`http://localhost:3000/api/mail/sendMail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                subject: "Ticket de Compra",
                text: `Gracias por su compra, su ticket de compra es: ${data.ticket}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    Swal.fire({
                        title: 'Ticket Enviado!',
                        text: 'Se ha enviado el ticket de compra a su correo',
                        icon: 'success'
                    }).then(() => {
                        location.replace(`http://localhost:5173/`);
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: data.message,
                        icon: 'error'
                    });
                }
            });
    };

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

    const clearCart = (cartID) => {
        fetch(`http://localhost:3000/api/cart/${cartID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            include: "credentials"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    Swal.fire({
                        title: 'Carrito Vacio!',
                        text: 'El carrito ha sido vaciado',
                        icon: 'success'
                    }).then(() => {
                        window.location.replace(`http://localhost:5173/`);
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

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.id_prod.price * item.quantity, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const createTicket = async (cartID, email) => {
        try {
            const response = await fetch(`http://localhost:3000/api/cart/${cartID}/purchase`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                include: "credentials",
                body: JSON.stringify({ email: email })
            });
            const data = await response.json();
            console.log(data);
            if (data.status === 200) {
                handleSendTicket(data);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: data.message,
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CartContext.Provider
            value={{
                cartID,
                addToCart,
                removeProductFromCart,
                clearCart,
                createTicket,
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
