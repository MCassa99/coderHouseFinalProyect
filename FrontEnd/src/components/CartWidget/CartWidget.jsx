import { useCartContext } from "../CartContext/CartContext"

const CartWidget = () => {
    const { getCartCount } = useCartContext();

    return (
        <div>
            <i className="fa-solid fa-cart-shopping fa-xl me-2"></i>
            <span className="position-absolute top-2 start-75 translate-middle badge rounded-pill bg-danger"> { getCartCount() || 0 } </span>
        </div>
    )
}

export default CartWidget
