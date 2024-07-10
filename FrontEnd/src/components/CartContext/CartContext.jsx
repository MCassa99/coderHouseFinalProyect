import { useState, useContext, createContext } from "react";

const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [itemQuantity, setItemQuantity] = useState(1);
    const storedCartItems = localStorage.getItem('cartItems');
    const [cartItems, setCartItems] = useState(JSON.parse(storedCartItems) || []);

    // En el addToCart la estrategia elegida es otra, pero con fines practicos sera usada como en las clases
    // Aqui lo que se va a buscar es poder Separar el carrito por viajes.
    const addToCart = (item, people, information) => {
        console.log(information);
        const isItemInCart = cartItems.find((cartItem) => cartItem.product.id === item.product.id);

        if (isItemInCart) {
            console.log('Esta en carrito')
            setCartItems(
                cartItems.map((cartItem) => // if the item is already in the cart, increase the quantity of the item
                {
                    if (cartItem.product.id === item.product.id && cartItem.people < cartItem.product.people) {
                        return { ...cartItem, people: parseInt(cartItem.people) + 1}
                    // } else if (cartItem.id === item.id) {
                    //     return { ...cartItem, people: parseInt(cartItem.people) }
                    // SE LE AGREGARA FUNCION PARA CUANDO LLEGUE AL MAXIMO DE PERSONAS,
                    // AGREGUE UNA NUEVA INSTANCIA DEL PRODUCTO AL CARRITO.
                    } else {
                        return cartItem
                    }
                }
                )
            );
        } else if (parseInt(people) > 0 && parseInt(people) <= item.product.people ) {
            setCartItems([...cartItems, { ...item, people: parseInt(people), information: information }]); // if the item is not in the cart, add the item to the cart
        } else {
            setCartItems([...cartItems, { ...item, people: 1, information: information }]); // if the item is not in the cart, add the item to the cart
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log(localStorage.getItem('cartItems'));
    };
    
    const increment = (itemQuantity, itemPeople) => {
        if (itemQuantity < itemPeople) {
            setItemQuantitytemQuantity = itemQuantity + 1;
        }
      };
    
      const decrement = (itemQuantity) => {
        if (itemQuantity > 1) {
            setItemQuantitytemQuantity = itemQuantity - 1;
        }
      };
    

const removeFromCart = (item) => {
    const isItemInCart = Products.find((product) => product.id === item.id);

    if (isItemInCart.people === 1) {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id)); // if the quantity of the item is 1, remove the item from the cart
    } else {
        setCartItems(
            cartItems.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, people: cartItem.people - 1 } // if the quantity of the item is greater than 1, decrease the quantity of the item
                    : cartItem
            )
        );
    }
};

const removeProductFromCart = (itemID) => {
    setCartItems(cartItems.filter((product) => product.product.id !== itemID));
};

const clearCart = () => {
    setCartItems([]); // set the cart items to an empty array
    localStorage.removeItem('cartItems');
};

const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.people, 0); // calculate the total price of the items in the cart
};

const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.people, 0); // calculate the total number of items in the cart
};

return (
    <CartContext.Provider
        value={{
            addToCart,
            removeFromCart,
            removeProductFromCart,
            clearCart,
            getCartTotal,
            getCartCount,
            increment,
            decrement,
            cartItems,
        }}
    >
        {children}
    </CartContext.Provider>
);
};

export default CartProvider;
