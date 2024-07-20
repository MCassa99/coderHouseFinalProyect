import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ProductDetailList from '../ItemDetailList/ItemDetailList';
//import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Error from '../Error/Error';

const ProductDetailContainer = () => {
    
    const [product, setProduct] = useState([]);
    // bring product from backend port 3000
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3000/api/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data   ))
            .catch(error => <Error />)
    }, [id])

    return (
        <div>
            <ProductDetailList product={product} />
        </div>
    )
}

export default ProductDetailContainer