import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CartPassangerForm({ userInfo }) {
  
  const { _id, first_name, last_name, age, email } = userInfo;

  return (
    <div>
      <div className="row bg-light border">
        <p className="fw-bold col m-auto">Nombre: </p>
        <p className="col m-auto">{first_name}</p>
      </div>

      <div className="row bg-light border">
        <p className="fw-bold col m-auto">Apellido: </p>
        <p className="col m-auto">{last_name}</p>
      </div>

      <div className="row bg-light border">
        <p className="fw-bold col m-auto">Documento: </p>
        <p className="col m-auto">{`12345678`}</p>
      </div>

      <div className="row bg-light border">
        <p className="fw-bold col m-auto">Edad: </p>
        <p className="col m-auto">{age}</p>
      </div>

      <div className="row bg-light border">
        <p className="fw-bold col m-auto">Celular: </p>
        <p className="col m-auto">{`+59699123456`}</p>
      </div>

      <div className="row bg-light border">
        <p className="fw-bold col m-auto">EMail: </p>
        <p className="col m-auto">{email}</p>
      </div>

    </div>
  );
}

export default CartPassangerForm;
