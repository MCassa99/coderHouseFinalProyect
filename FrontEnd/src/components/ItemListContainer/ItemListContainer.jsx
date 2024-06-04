import { collection, getDocs, getFirestore, where, query} from 'firebase/firestore'
import ItemList from '../ItemList/ItemList'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ItemListContainer = ({greeting}) => {

    const [product, setProduct] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        const queryDB = getFirestore();
        const queryCollection = collection(queryDB, 'destino');
        if (id) {
            const queryFilter = query(queryCollection, where('cat', '==', id));
            getDocs(queryFilter).then((response) => {
                setProduct(response.docs.map((item) => ({...item.data(), id: item.id})));
            });
        } else {
            getDocs(queryCollection).then((response) => {
                setProduct(response.docs.map((item) => ({...item.data(), id: item.id})));
            });
        }
    }, [id]);

    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <h2 className='greeting'>{greeting}</h2>
            </div>
            <div>
                <ItemList product={product} />
            </div>
        </div>
    )
}

export default ItemListContainer
