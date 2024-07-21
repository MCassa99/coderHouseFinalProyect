import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UserSettings = () => {

     const { id } = useParams();
     const [user, setUser] = useState({});
     const [changePass, setChangePass] = useState(false);

     useEffect(() => {
          fetch(`http://localhost:3000/api/users/${id}`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
               },
          })
               .then((res) => res.json())
               .then((res) => {
                    setUser(res);
               })
               .catch((error) => {
                    console.log(error);
               });
     }, [id]);

     const updateUser = () => {
          //Type password to confirm changes
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
                    return fetch(`http://localhost:3000/api/session/current`, {
                         method: 'POST',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                         body: JSON.stringify({ email: user.email, password: password }),
                    })
                         .then((res) => res.json())
                         .then((res) => {
                              if (res.status === 200) {
                                   return res;
                              } else {
                                   throw new Error(res.message);
                              }
                         })
                         .catch((error) => {
                              Swal.showValidationMessage(`Request failed: ${error}`);
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
                                   }).then(() => window.location.href = '/travelvip')
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
          console.log(changePass)
          changePass ? user.newPassword === user.confirmPassword ? updateUser : 
               Swal.fire({
                    title: 'Error',
                    text: 'Passwords do not match',
                    icon: 'error',
                    })
                    : updateUser();
          // Aquí puedes manejar la lógica de actualización del usuario
     };

     const handleChange = (e) => {
          setUser({
               ...user,
               [e.target.name]: e.target.value,
          });
     };   

     const handleChangePassword = () => {
          setChangePass(!changePass)
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
                                                  name="name"
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
                                             name="email"
                                             value={user.email}
                                             onChange={handleChange}
                                        />
                                   </Form.Group>
                                   <div className='row mt-3 m-auto justify-content-center'>
                                        <button className={changePass ? `btn btn-secondary col-12 mt-3` : `btn btn-secondary col-5 m-2`} onClick={handleChangePassword}>Change Password</button>
                                        { changePass ? 
                                             <>
                                                  <Form.Group controlId="formPassword">
                                                       <Form.Label>New Password</Form.Label>
                                                       <Form.Control
                                                            type="password"
                                                            placeholder="New Password"
                                                            name="newPassword"
                                                            onChange={handleChange}
                                                       />
                                                  </Form.Group>

                                                  <Form.Group controlId="formConfirmPassword">
                                                       <Form.Label>Confirm New Password</Form.Label>
                                                       <Form.Control
                                                            type="password"
                                                            placeholder="Confirm New Password"
                                                            name="confirmPassword"
                                                            onChange={handleChange}
                                                       />
                                                  </Form.Group>
                                             </>
                                        : null }
                                        <Button variant="primary" type="button" className={changePass ? `col-12 mt-3` : `col-5 m-2`} onClick={handleSubmit}>
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