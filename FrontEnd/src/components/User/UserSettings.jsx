import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useUserContext } from '../UserContext/UserContext.jsx';

const UserSettings = () => {
    const { id } = useParams();
    const { user, updateUser, changePassword, uploadDocument } = useUserContext();

    const [userData, setUserData] = useState({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        newEmail: user.email || '',
    });

    useEffect(() => {
        setUserData({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
            newEmail: user.email || ''
        });
    }, [user]);

    const handleUpdateUser = async () => {
        const { email, newEmail } = userData;
        const updatedUserData = { ...userData, email: newEmail };

        const result = await Swal.fire({
            title: 'Please type your password to confirm changes',
            text: 'This action is irreversible',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            showLoaderOnConfirm: true,
            preConfirm: async (password) => {
                const response = await fetch(`http://localhost:3000/api/session/validatePassword`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                const result = await response.json();
                if (result.status === 200) {
                    return true;
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: result.message,
                        icon: 'error'
                    });
                    return false;
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });

        if (result.isConfirmed) {
            const updateResponse = await updateUser(id, updatedUserData);
            if (updateResponse.status === 200) {
                Swal.fire({
                    title: 'User Updated',
                    text: updateResponse.message,
                    icon: 'success',
                }).then(() => window.location.href = '/logout');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: updateResponse.message,
                    icon: 'error',
                });
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateUser();
    };

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangePassword = async () => {
        const response = await changePassword(user.email);
        if (response.status === 200) {
            Swal.fire({
                title: "Verification email sent, please check your inbox!",
                text: response.message,
                icon: "success",
            });
        } else {
            Swal.fire({
                title: "Verification email could not be sent! Please try again.",
                text: response.message,
                icon: "error",
            });
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const uploadResponse = await uploadDocument(file, id);
        if (uploadResponse.status === 200) {
            Swal.fire({
                title: "Document uploaded successfully!",
                text: uploadResponse.message,
                icon: "success",
            });
        } else {
            Swal.fire({
                title: "Document could not be uploaded! Please try again.",
                text: uploadResponse.message,
                icon: "error",
            });
        }
    };

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
                                        value={userData.first_name}
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
                                        value={userData.last_name}
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
                                    value={userData.newEmail}
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