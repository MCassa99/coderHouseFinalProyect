import ProductDetail from "../ItemDetail/ItemDetail";

const ProductDetailList = ({ product }) => {
    return (
        <div>
            <ProductDetail destino={product} />
        </div>
    )
}

export default ProductDetailList;