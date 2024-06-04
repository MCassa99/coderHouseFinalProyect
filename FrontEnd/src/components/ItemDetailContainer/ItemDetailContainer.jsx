import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ProductDetailList from '../ItemDetailList/ItemDetailList';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Error from '../Error/Error';

const ProductDetailContainer = () => {
    
    const [product, setProduct] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        const queryDB = getFirestore();
        const queryDoc = doc(queryDB, 'destino', id);
        getDoc(queryDoc).then((response) => {
            if (!response.exists()) {
                window.location.href = `/error/500`;
            }
            setProduct({id: response.id, ...response.data()});
        });

    }, [id]);

    return (
        <div>
            <ProductDetailList product={product} />
        </div>
    )
}

export default ProductDetailContainer