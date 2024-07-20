import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "../Item/Item";
import Swal from "sweetalert2";

const AddProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        code: '',
        category: '',
        rating: '',
        stock: '',
        image: ''
    });


    const testProduct = {
        title: 'Test Product',
        description: 'This is a test product',
        price: 100,
        code: 'TEST',
        category: 'paquetes',
        transshipment: 0,
        stay_time: 0,
        rating: 10,
        stock: 0,
        image: 'https://via.placeholder.com/150'
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = id
                    ? await fetch(`http://localhost:3000/api/products/${id}`).then(res => res.json())
                    : testProduct;
                setProduct(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [id]); // Incluye `id` como dependencia aquí

    const handleAddProduct = () => {
        console.log(product);
        fetch(`http://localhost:3000/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
            .then((res) => res.json())
            .then((res) => {
                res.status === 201 ?
                    Swal.fire({
                        title: 'Product Added',
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

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleUpdateProduct = () => {
        fetch(`http://localhost:3000/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product), // Enviar el objeto completo
        })
            .then((res) => res.json())
            .then((res) => {
                res.status === 200 ?
                    Swal.fire({
                        title: 'Product Updated',
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
    };

    return (
        <div className="d-flex justify-content-center align-items-center m-4">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-6">
                    <div className="card p-3 rounded-5">
                        <div className="card-body">
                            <h4 className="card-title text-center">{id ? 'Update Product' : 'Add Product'}</h4>
                            <form>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" value={product.title} onChange={handleChange} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="category" className="form-label">Category</label>
                                        <select className="form-control" id="category" value={product.category} onChange={handleChange}>
                                            <option value="">Seleccione la Categoria</option>
                                            <option value="paquetes">Paquetes</option>
                                            <option value="vuelos">Vuelos</option>
                                            <option value="hoteles">Hoteles</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label" >Description</label>
                                    <input type="text" className="form-control" id="description" value={product.description} onChange={handleChange} />
                                </div>

                                <div className="row mb-3">
                                    <div className={product.category === 'paquetes' ? 'col-lg-3 col-md-6' : 'col-lg-4 col-md-4'}>
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <input type="number" className="form-control" id="price" value={product.price} onChange={handleChange} />
                                    </div>

                                    <div className={product.category === 'paquetes' ? 'col-lg-3 col-md-6' : 'col-lg-4 col-md-4'}>
                                        <label htmlFor="code" className="form-label">Code</label>
                                        <input type="text" className="form-control" id="code" value={product.code} onChange={handleChange} />
                                    </div>
                                    {
                                        product.category === 'vuelos' ?
                                            <div className='col-lg-4 col-md-4'>
                                                <label htmlFor="transshipment" className="form-label">Transshipment</label>
                                                <input type="number" className="form-control" id="transshipment" value={product.transshipment} onChange={handleChange} />
                                            </div>
                                            : product.category === 'hoteles' ?
                                                <div className='col-lg-4 col-md-4'>
                                                    <label htmlFor="stay_time" className="form-label">Stay Time</label>
                                                    <input type="number" className="form-control" id="stay_time" value={product.stay_time} onChange={handleChange} />
                                                </div>
                                                :
                                                <>
                                                    <div className='col-lg-3 col-md-6'>
                                                        <label htmlFor="transshipment" className="form-label">Transshipment</label>
                                                        <input type="number" className="form-control" id="transshipment" value={product.transshipment} onChange={handleChange} />
                                                    </div>
                                                    <div className='col-lg-3 col-md-6'>
                                                        <label htmlFor="stay_time" className="form-label">Stay Time</label>
                                                        <input type="number" className="form-control" id="stay_time" value={product.stay_time} onChange={handleChange} />
                                                    </div>
                                                </>
                                    }
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="stock" className="form-label">Stock</label>
                                        <input type="number" className="form-control" id="stock" value={product.stock} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="rating" className="form-label">Rating</label>
                                        <input type="number" className="form-control" id="rating" value={product.rating} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input type="text" className="form-control" id="image" onChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <button type="button" className="btn btn-primary w-100" onClick={id ? handleUpdateProduct : handleAddProduct}>{id ? 'Update Product' : 'Add Product'}</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card m-5">
                        <Item destino={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
