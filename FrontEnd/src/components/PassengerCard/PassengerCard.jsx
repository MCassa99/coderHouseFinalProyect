import React from 'react'
import { useUserContext } from '../UserContext/UserContext';

const PassengerCard = ( ) => {
  const { user } = useUserContext();
  
  return (
    <div className='container '>
        <div className='d-flex row p-4' style={{marginBottom: -2+'rem'}}>
            <p className="cart-text">
                <strong> Pasajero: {user.first_name} {user.last_name} </strong>
            </p>
            <p className='col'>Cedula de Identidad: 12345678-9</p>
            <p>Fecha de Nacimiento: {user.age}</p>
            {user.mobile ?  <p>Numero de Celular: {user.mobile}</p> : <p>Numero de Celular: 00000000</p>}
            <p>Email: {user.email}</p>
        </div>
    </div>
  )
}

export default PassengerCard