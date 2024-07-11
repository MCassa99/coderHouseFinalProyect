import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CartPassangerForm({ id }) {
  const printPdf = () => {
    const docDefinition = {
      content: [
        {
          // Ticket header
          text: "TRAVEL VIP TICKET",
          fontSize: 30,
          bold: true,
          alignment: "center",
        },
        {
          // Passenger details
          table: {
            widths: ["*", "auto"],
            body: [
              ["Nombre:", nombre],
              ["Apellido:", apellido],
              ["Tipo de Documento:", tipoDocumento],
              ["Documento:", documento],
              ["Fecha de Nacimiento:", fechaNacimiento],
              ["Celular:", celular],
              ["Email:", mail],
            ],
          },
        },
        {
          // Flight details
          text: "Informacion Adicional",
          fontSize: 20,
          bold: true,
          alignment: "center",
        },
        {
          // Flight itinerary
          table: {
            widths: ["*", "*", "*", "*"],
            body: [
              [
                "Origen:",
                {origin},
                "Destino:",
                {destination},
              ],
              ["Dia de Partida:", {depdate}, "Arrival date:", {arrdate}],
              ["Departure time:", {deptime}, "Arrival time:", {arrtime}],
              ["Airline:", {airline}, "Flight number:", {flight}],
            ],
          },
        },
        {
          // Footer
          text: "Ticket de prueba.",
          fontSize: 10,
          alignment: "center",
        },
      ],
    };
    pdfMake.createPdf(docDefinition).download(`${nombre} ${apellido} Ticket.pdf`);
  };

  const [nombre, setNombre] = useState({id:"", value:""});
  const [apellido, setApellido] = useState({id:"", value:""});
  const [tipoDocumento, setTipoDocumento] = useState({id:"", value:"Cedula de identidad"});
  const [documento, setDocumento] = useState({id:"", value:""});
  const [fechaNacimiento, setFechaNacimiento] = useState({id:"", value:""});
  const [celular, setCelular] = useState({id:"", value:""});
  const [mail, setMail] = useState({id:"", value:""});

  const handleNombreChange = (event) => {
    setNombre({id: id, value: event.target.value});
  };

  const handleApellidoChange = (event) => {
    setApellido({id: id, value: event.target.value});
  };

  const handleTipoDocumentoChange = (event) => {
    setTipoDocumento({id: id, value: event.target.value});
  };

  const handleDocumentoChange = (event) => {
    setDocumento({id: id, value: event.target.value});
  };

  const handleFechaNacimientoChange = (event) => {
    setFechaNacimiento({id: id, value: event.target.value});
  };

  const handleCelularChange = (event) => {
    setCelular({id: id, value: event.target.value});
  };

  const handleMailChange = (event) => {
    setMail({id: id, value: event.target.value});
  };

  return (
    <div>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          id={`nombre${id}`}
          value={nombre.value}
          onChange={handleNombreChange}
        />
      </div>

      <div>
        <label htmlFor="apellido">Apellido</label>
        <input
          type="text"
          name="apellido"
          id={`apellido${id}`}
          value={apellido.value}
          onChange={handleApellidoChange}
        />
      </div>

      <div>
        <label htmlFor="tipoDocumento">Tipo de documento</label>
        <select
          name="tipoDocumento"
          id={`tipoDocumento${id}`}
          value={tipoDocumento.value}
          onChange={handleTipoDocumentoChange}
        >
          <option value="CI">Cédula de identidad</option>
          <option value="DNI">Documento nacional de identidad</option>
          <option value="Pasaporte">Pasaporte</option>
        </select>
      </div>

      <div>
        <label htmlFor="documento">Documento</label>
        <input
          type="number"
          name="documento"
          id={`documento${id}`}
          value={documento.value}
          onChange={handleDocumentoChange}
          minLength="8"
          maxLength="8"
        />
      </div>

      <div>
        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
        <input
          type="date"
          name="fechaNacimiento"
          id={`fechaNacimiento${id}`}
          value={fechaNacimiento.value}
          onChange={handleFechaNacimientoChange}
        />
      </div>

      <div>
        <label htmlFor="celular">Celular</label>
        <input
          type="number"
          name="celular"
          id={`celular${id}`}
          value={celular.value}
          onChange={handleCelularChange}
        />
      </div>

      <div>
        <label htmlFor="mail">Mail</label>
        <input
          type="email"
          name="mail"
          id={`mail${id}`}
          value={mail.value}
          onChange={handleMailChange}
        />
      </div>
    </div>
  );
}

export default CartPassangerForm;
