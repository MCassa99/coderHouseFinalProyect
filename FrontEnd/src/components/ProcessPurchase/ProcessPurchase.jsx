import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import wppLogo from '../../assets/WhatsApp_icon.webp'
import agentLogo from '../../assets/Agent_icon.png'
import { useCartContext } from '../CartContext/CartContext';
import CartPassangerForm from '../CartPassengerForm/CartPassengerForm';
import { useUserContext } from '../UserContext/UserContext';

const ProcessPurchase = () => {

    const { addToCart } = useCartContext();
    const [product, setProduct] = useState([]);
    const { user } = useUserContext();
    const { id, qty } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/api/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
    }, [id])

    const handlePunchase = () => {
        addToCart(product, user.cart_id);
    }

    /*if (qty > product.stock) {
        navigate('/error/410')
    }

    useEffect(() => {
        const queryDB = getFirestore();
        const queryDoc = doc(queryDB, 'destino', id);
        getDoc(queryDoc).then((response) => {
            setProduct({id: response.id, ...response.data()});
        });
    }, [id]);*/

    let botonWpp = () => {
        // LO QUE HARIA PARA QUE EL OPERADOR TE HABILITE LA COMPRA AL CARRITO
        let mensaje = `Hola TravelVIP ! Me contacto porque queria averiguar por una cotizacion a ${product.title}  por la cantidad de ${product.category === 'hoteles' ? product.stay_time : product.transshipmentbi} dias. Muchas Gracias!`;
        let telefono = "+59896327431";
        let url = `https://api.whatsapp.com/send?phone=${telefono}&text=${mensaje}&source=&data=`;
        window.open(url, "_blank", "noreferrer");
    }

    /*let information = [];

    function renderinfo() {
        for (let i = 0; i < qty; i++) {
            let nombre = document.getElementById(`nombre${i+1}`).value;
            let apellido = document.getElementById(`apellido${i+1}`).value;
            let tipoDocumento = document.getElementById(`tipoDocumento${i+1}`).value;
            let documento = document.getElementById(`documento${i+1}`).value;
            let fechaNacimiento = document.getElementById(`fechaNacimiento${i+1}`).value;
            let celular = document.getElementById(`celular${i+1}`).value;
            let mail = document.getElementById(`mail${i+1}`).value;
            let pasajero = {
                nombre: nombre,
                apellido: apellido,
                tipoDocumento: tipoDocumento,
                documento: documento,
                fechaNacimiento: fechaNacimiento,
                celular: celular,
                mail: mail
            }
            information.push(pasajero);
        }
    }
    */

    return (
        <div>
            <h2 className='d-flex justify-content-center mt-5 mb-3'>Aqui se Redireccionara a el Usuario a Whatsapp para Concretar con un Operador</h2>
            <div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <span className='mb-3'><strong>Consultar por {product.title}</strong></span>
                    <button className='btn btn-success mb-4' onClick={botonWpp}><img style={{ width: 40, marginRight: 10 }} src={wppLogo} /><strong>Whatsapp</strong></button>
                </div>
            </div>
            <div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <span>Validar Destino</span>
                    <span className='mb-3'><strong>(*Este paso lo dara el Agente luego de concretar todo por WhatsApp*)</strong></span>
                    <span className='mb-3'><strong>(*Para una demostracion solamente se ingresaran los datos de este usuario para todos los tickets*)</strong></span>

                    {/* <span className='mb-3'><strong>Una vez validado el destino, se habilitara el boton para agregar al carrito</strong></span> */}
                    <div className='d-flex flex-column justify-content-start mb-4'>
                        {Array.from({ length: qty ? qty : 1 }, (_, index) => (
                            <div key={index}>
                                <h5 className='text-center'>Pasajero {index+1}</h5>
                                <CartPassangerForm />
                            </div>
                        ))}
                    </div>
                    <button className='btn btn-primary mb-4' onClick={handlePunchase}><img style={{ width: 40, marginRight: 10 }} src={agentLogo} /><strong>Habilitar Destino</strong></button>
                </div>
            </div>
            <div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <span>Mira tus productos</span>
                    <Link to={`/cart/${user.cart_id}`} className="text-decoration-none">
                        <button className='btn btn-secondary'><strong>IR AL CARRITO</strong></button>
                    </Link>    
                </div>
            </div>
        </div>
    )
}

export default ProcessPurchase