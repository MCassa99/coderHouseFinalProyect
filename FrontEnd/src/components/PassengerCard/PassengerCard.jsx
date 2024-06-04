import React from 'react'

const PassengerCard = ( {passenger} ) => {
  return (
    <div className='container '>
        <div className='d-flex row p-4' style={{marginBottom: -2+'rem'}}>
            <p className="cart-text">
                <strong> Pasajero: {passenger.nombre} {passenger.apellido} </strong>
            </p>
            <p className='col'>{passenger.tipoDocumento}: {passenger.documento}</p>
            <p>Fecha de Nacimiento: {passenger.fechaNacimiento}</p>
            <p>Numero de Celular: {passenger.celular}</p>
            <p>Email: {passenger.mail}</p>
        </div>
    </div>
  )
}

export default PassengerCard