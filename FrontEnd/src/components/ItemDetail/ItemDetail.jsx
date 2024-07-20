import styled from "styled-components";
import StarRating from "../Item/StarRating";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import ItemCounter from "./ItemCounter/ItemCounter";


const ProductDetail = ({ destino }) => {

  // Declarar todas las constantes fuera del bloque if
  let _id, title, description, price, thumbnail, category, status, code, stock, transshipment, stay_time, rating, image;

  // Asignar valores en función de la categoría
  if (destino.category === 'vuelos') {
    ({ _id, title, description, price, thumbnail, category, status, code, transshipment, rating, image, stock } = destino);
  } else if (destino.category === 'hoteles') {
    ({ _id, title, description, price, thumbnail, category, status, code, stay_time, rating, image, stock } = destino);
  } else {
    ({ _id, title, description, price, thumbnail, category, status, code, transshipment, stay_time, rating, image, stock } = destino);
  }

  const [count, setCount] = useState(1);
  const [user, setUser] = useState('User');

  useEffect(() => {
    fetch(`http://localhost:3000/api/session/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setUser(res.user.role);
        } else {
          setUser('User');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function onAdd(count) {
    setCount(count);
  }

  const handleDeleteProduct = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/products/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then((res) => res.json())
          .then((res) => {
            res.status === 200 ?
              Swal.fire({
                title: 'Product Deleted',
                text: res.message,
                icon: 'success'
              }).then(() => window.location.href = '/travelvip')
              :
              Swal.fire({
                title: 'Error',
                text: res.message,
                icon: 'error'
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <Section id="hero" >
        <div className="background">
          <img src={image} alt="" />
        </div>
        <div className="content" style={{ marginTop: 6 + 'rem' }}>
          <div className="title">
            <h1 className="mb-3">{title}</h1>
            {category === 'hoteles' ? <span className="fw-bolder">{stay_time} Dias / {stay_time - 1} Noches de Hospedaje</span> : category === 'vuelos' ? <span className="fw-bolder">{transshipment} Dias de Vuelo</span> : <div> <span className="fw-bolder">{stay_time} Dias / {stay_time - 1} Noches de Hospedaje</span> <span className="fw-bolder">{transshipment} Dias de Vuelo</span> </div>}
            <p className="mt-3"> {description} </p>
            <span> <StarRating rating={rating} /> </span>
            <p> Desde ${price} </p>
            {user === 'User' ?
              <div>
                <ItemCounter initial={count} people={stock} setCount={onAdd} />
              </div>
              :
              null
            }
          </div>
          <div>
            {user === 'User' ?
              <Link to={`/process/${_id}/${count}`} className="text-decoration-none">
                <button className="btn btn-lg btn-primary">Contactarme</button>
              </Link>
              :
              <div>
                <Link to={`/updateProduct/${_id}`} className="text-decoration-none row">
                  <button className="btn btn-lg btn-primary">Actualizar Producto</button>
                </Link>
                <button type="button" className="btn btn-lg btn-danger mt-3 row" onClick={handleDeleteProduct}>Delete Product</button>
              </div>
            }
          </div>
        </div>
      </Section>
    </>
  );
};

export default ProductDetail;

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100;

  .background {
    height: 100%;
    img {
      object-fit: cover;
      height: calc(100vh - 4.2rem);
      width: 100%;
      filter: brightness(40%);
    }
  }
  .content {
    height: 70%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 3;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .title {
      color: white;
      h1 {
        font-size: 3rem;
        letter-spacing: 0.2rem;
      }
      p {
        text-align: center;
        padding: 0 30vw;
        margin-top: 0.5rem;
        font-size: 1.2rem;
      }
    }
    .search {
      display: flex;
      background-color: #ffffffce;
      padding: 0.5rem;
      border-radius: 0.5rem;
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 1.5rem;
        label {
          font-size: 1.1rem;
          color: #03045e;
        }
        input {
          background-color: transparent;
          border: none;
          text-align: center;
          color: black;
          &[type="date"] {
            padding-left: 3rem;
          }

          &::placeholder {
            color: black;
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        padding: 1rem;
        cursor: pointer;
        border-radius: 0.3rem;
        border: none;
        color: white;
        background-color: #4361ee;
        font-size: 1.1rem;
        text-transform: uppercase;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #023e8a;
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 980px) {
    height: 25rem;
    .background {
      background-color: palegreen;
      img {
        height: 100%;
      }
    }
    .content {
      .title {
        h1 {
          font-size: 1rem;
        }
        p {
          font-size: 0.8rem;
          padding: 1vw;
        }
      }
      .search {
        flex-direction: column;
        padding: 0.8rem;
        gap: 0.8rem;
        /* padding: 0; */
        .container {
          padding: 0 0.8rem;
          input[type="date"] {
            padding-left: 1rem;
          }
        }
        button {
          padding: 1rem;
          font-size: 1rem;
        }
        /* display: none; */
      }
    }
  }
`;
