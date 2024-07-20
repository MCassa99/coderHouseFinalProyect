//import { collection, getDocs, getFirestore, where, query} from 'firebase/firestore'
import ItemList from '../ItemList/ItemList'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ItemListContainer = ({ user }) => {

    const [product, setProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = id
                    ? await fetch(`http://localhost:3000/api/products/?filter=${id}`)
                    : await fetch('http://localhost:3000/api/products');
                const data = await response.json();
                setProduct(data.products);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [id]); // Incluye `id` como dependencia aquí
    
    /*useEffect(() => {
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
    }, [id]);*/

    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <h2 className='greeting'></h2>
            </div>
            <div>
                <ItemList product={product} id={id ? user === 'Admin' ? true : false : false}/>
            </div>
        </div>
    )
}

export default ItemListContainer
