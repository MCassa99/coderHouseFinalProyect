import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UserSettings = () => {
    const { id } = useParams();

    // Initialize state with default values
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        newEmail: '',
        password: '',
    });

    useEffect(() => {
        fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((res) => {
            setUser({
                first_name: res.first_name || '',
                last_name: res.last_name || '',
                email: res.email || '',
                newEmail: res.email || ''
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }, [id]);

    const updateUser = () => {
    Swal.fire({
        title: 'Please type your password to confirm changes',
        text: 'This action is irreversible',
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        showLoaderOnConfirm: true,
        preConfirm: (password) => { 
            return fetch(`http://localhost:3000/api/session/validatePassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email, password: password }),
            })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 200) {
                    // Set the new password before sending the update request
                    user.email = user.newEmail;
                    return true;
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: res.message,
                        icon: 'error'
                    });
                    return false;
                }
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:3000/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            .then((res) => res.json())
            .then((res) => {
                res.status === 200 ?
                    Swal.fire({
                        title: 'User Updated',
                        text: res.message,
                        icon: 'success',
                    })
                    .then(() => window.location.href = '/logout')
                    :
                    Swal.fire({
                        title: 'Error',
                        text: res.message,
                        icon: 'error',
                    });
            })
            .catch((error) => {
                console.log(error);
            });
        }
    });
};


    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser();
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangePassword = () => {
        fetch('http://localhost:3000/api/session/changePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    Swal.fire({
                        title: "Verification email send, please check your inbox!",
                        text: data.message,
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Verification email could not be send! Please try again.",
                        text: data.message,
                        icon: "error",
                    });
                }
            })
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
    
        // Append the file and additional data to the FormData object
        formData.append('document', file, `${user.first_name}_${user.last_name}_ID_${file.name}`);
    
        fetch('http://localhost:3000/upload/documents', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                Swal.fire({
                    title: "Document uploaded successfully!",
                    text: data.message,
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "Document could not be uploaded! Please try again.",
                    text: data.message,
                    icon: "error",
                });
            }
        })
        .catch(error => {
            console.error('Error uploading document:', error);
        });
    }

    return (
        <div>
            <Container className="my-5">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8} lg={6}>
                        <h2>User Settings</h2>
                        <Form onSubmit={handleSubmit}>
                            <div className='row'>
                                <Form.Group controlId="formName" className='col'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        name="first_name"
                                        value={user.first_name}
                                        readOnly
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId="formLastName" className='col'>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your last name"
                                        name="last_name"
                                        value={user.last_name}
                                        readOnly
                                        disabled
                                    />
                                </Form.Group>
                            </div>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    name="newEmail"
                                    value={user.newEmail}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {/* Other Form for uploading documents */}
                            <Form.Group controlId="formFile">
                                <Form.Label>Upload your ID</Form.Label>
                                {/* when selected document uses handleUpload */}
                                <Form.Control type="file" onChange={handleUpload} />                    
                            </Form.Group>
                            <div className='row mt-3 m-auto justify-content-center'>
                                <button type='button' className="btn btn-danger col-12 mt-3" onClick={handleChangePassword}>Change Password</button>
                                <Button variant="primary" type="submit" className="col-12 mt-3">
                                    Update Settings
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default UserSettings;