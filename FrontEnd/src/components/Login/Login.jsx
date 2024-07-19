import React, { useState } from "react";
import './Login.css';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import Swal from "sweetalert2";
import Cookies from 'js-cookie';

const Login = ({ setLogin }) => {
     const [action, setAction] = useState('Login');

     function getAge(dateString) {
          const today = new Date();
          const birthDate = new Date(dateString);
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
               age--;
          }
          return age;
     }

     const handleLogin = (event) => {
          event.preventDefault(); // Prevent default form submission

          fetch('http://localhost:3000/api/session/login', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               credentials: 'include',
               body: JSON.stringify({
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value
               })
          })
               .then(response => response.status === 200 ? response.json() : { status: 401, message: 'Invalid email or password' })
               .then(data => {
                    if (data.status === 200) {
                         Swal.fire({
                              title: "Login Successfully!",
                              text: data.message,
                              icon: "success",
                         });
                         setLogin(true);
                         window.location.href = 'http://localhost:5173';
                    } else {
                         Swal.fire({
                              title: "Error!",
                              text: data.message,
                              icon: "error",
                         });
                    }
               })
     }

     const handleSignUp = (event) => {
          event.preventDefault(); // Prevent default form submission

          fetch('http://localhost:3000/api/session/register', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                    first_name: document.getElementById('name').value,
                    last_name: document.getElementById('lastname').value,
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value,
                    age: getAge(document.getElementById('birthday').value)
               })
          })
               .then(response => response.status ? response.json() : { status: 401, message: 'Ya existe un usuario registrado con este mail' })
               .then(data => {
                    console.log(data);
                    if (data.status === 201) {
                         Swal.fire({
                              title: "Registered Successfully!",
                              text: data.message,
                              icon: "success",
                         });
                         setAction('Login')
                    } else {
                         Swal.fire({
                              title: "Error!",
                              text: data.message,
                              icon: "error",
                         });
                    }
               })
     }

     const handleSubmit = (event) => {
          event.preventDefault(); // Prevent default form submission

          if (action === 'Login') {
               handleLogin(event);
          } else if (action === 'Sign Up') {
               handleSignUp(event);
          }
     }

     return (
          <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
               <div className="card p-4 w-50 rounded-5">
                    <div className="card-body">
                         <h3 className="card-title text-center header">{action}</h3>
                         <div className="underline"></div>
                         <form className="text-center mt-3" onSubmit={handleSubmit}>
                              {action === 'Sign Up' &&
                                   <div className="container">
                                        <div className="row mb-3">
                                             <div className="form-group col-6">
                                                  <label htmlFor="name">First Name</label>
                                                  <input type="text" className="form-control" id="name" placeholder="Enter First Name" required />
                                             </div>
                                             <div className="form-group col-6">
                                                  <label htmlFor="lastname">Last Name</label>
                                                  <input type="text" className="form-control" id="lastname" placeholder="Enter Last Name" required />
                                             </div>
                                        </div>
                                        <div className="row mb-3">
                                             <div className="form-group col-6">
                                                  <label htmlFor="birthday">Birthday</label>
                                                  <input type="date" className="form-control" id="birthday" placeholder="Enter Birthday" required />
                                             </div>
                                             <div className="form-group col-6">
                                                  <label htmlFor="document">Documents</label>
                                                  <input type="file" className="form-control " id="document" />
                                             </div>
                                        </div>
                                   </div>
                              }
                              <div className="form-group mb-3">
                                   <label htmlFor="email">Email</label>
                                   <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                              </div>
                              <div className="form-group mb-3">
                                   <label htmlFor="password">Password</label>
                                   <input type="password" className="form-control" id="password" placeholder="Password" required />
                              </div>
                              <div className="mb-3">
                                   <p>Forgot Password? <a href="#" className="text-primary">Click Here</a></p>
                              </div>
                              <button type="submit" className='btn btn-primary w-100 mb-2'>{action === 'Login' ? 'Login' : 'Sign Up' }</button>
                              <button type="button" className='btn btn-light w-100' onClick={() => { setAction(action === 'Sign Up' ? 'Login' : 'Sign Up') }}>
                                   {action === 'Sign Up' ? 'Switch to Login' : 'Switch to Sign Up'}
                              </button>
                         </form>
                    </div>
               </div>
          </div>
     );
}

export default Login;
