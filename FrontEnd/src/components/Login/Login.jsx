import React, { useState } from "react";
import Swal from "sweetalert2";
import { useUserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
     const { setLoginStatus, handleLogin, handleSignUp } = useUserContext();
     const [action, setAction] = useState("Login");
     const navigate = useNavigate(); // Add this line

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

     const handleSubmit = async (event) => {
          event.preventDefault();

          if (action === "Login") {
               const email = document.getElementById("email").value;
               const password = document.getElementById("password").value;

               const data = await handleLogin(email, password);
               if (data.status === 200) {
                    Swal.fire({
                         title: "Login Successfully!",
                         text: data.message,
                         icon: "success",
                    }).then(() => {
                         setLoginStatus(true);
                         navigate("/"); // Update this line for navigation
                    });
               } else {
                    Swal.fire({
                         title: "Error!",
                         text: data.message,
                         icon: "error",
                    });
               }
          } else if (action === "Sign Up") {
               const userData = {
                    first_name: document.getElementById("name").value,
                    last_name: document.getElementById("lastname").value,
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                    age: getAge(document.getElementById("birthday").value),
               };

               const data = await handleSignUp(userData);
               if (data.status === 201) {
                    Swal.fire({
                         title: "Registered Successfully!",
                         text: data.message,
                         icon: "success",
                    });
                    setAction("Login");
               } else {
                    Swal.fire({
                         title: "Error!",
                         text: data.message,
                         icon: "error",
                    });
               }
          }
     };

     const handleForgotPassword = () => {
          Swal.fire({
               title: "Forgot Password",
               html: '<input id="swal-input1" class="swal2-input" placeholder="Enter your email">',
               showCancelButton: true,
               confirmButtonText: "Send",
               preConfirm: () => {
                    const email =
                         Swal.getPopup().querySelector("#swal-input1").value;
                    if (!email) {
                         Swal.showValidationMessage("Email is required");
                    }
                    return { email: email };
               },
          }).then((result) => {
               if (result.isConfirmed) {
                    fetch("http://localhost:3000/api/session/changePassword", {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({
                              email: result.value.email,
                         }),
                    })
                         .then((response) => response.json())
                         .then((data) => {
                              if (data.status === 200) {
                                   Swal.fire({
                                        title: "Verification email sent, please check your inbox!",
                                        text: data.message,
                                        icon: "success",
                                   });
                              } else {
                                   Swal.fire({
                                        title: "Verification email could not be sent! Please try again.",
                                        text: data.message,
                                        icon: "error",
                                   });
                              }
                         });
               }
          });
     };

     return (
          <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
               <div className="card p-4 w-50 rounded-5 ">
                    <div className="card-body">
                         <h3 className="card-title text-center header">
                              {action}
                         </h3>
                         <div className="underline"></div>
                         <form
                              className="text-center mt-3"
                              onSubmit={handleSubmit}
                         >
                              {action === "Sign Up" && (
                                   <div className="container">
                                        <div className="row mb-3">
                                             <div className="form-group col-6">
                                                  <label htmlFor="name">
                                                       First Name
                                                  </label>
                                                  <input
                                                       type="text"
                                                       className="form-control"
                                                       id="name"
                                                       placeholder="Enter First Name"
                                                       required
                                                  />
                                             </div>
                                             <div className="form-group col-6">
                                                  <label htmlFor="lastname">
                                                       Last Name
                                                  </label>
                                                  <input
                                                       type="text"
                                                       className="form-control"
                                                       id="lastname"
                                                       placeholder="Enter Last Name"
                                                       required
                                                  />
                                             </div>
                                        </div>
                                        <div className="row mb-3">
                                             <div className="form-group col-6">
                                                  <label htmlFor="birthday">
                                                       Birthday
                                                  </label>
                                                  <input
                                                       type="date"
                                                       className="form-control"
                                                       id="birthday"
                                                       placeholder="Enter Birthday"
                                                       required
                                                  />
                                             </div>
                                             <div className="form-group col-6">
                                                  <label htmlFor="document">
                                                       Documents
                                                  </label>
                                                  <input
                                                       type="file"
                                                       className="form-control "
                                                       id="document"
                                                  />
                                             </div>
                                        </div>
                                   </div>
                              )}
                              <div className="form-group mb-3">
                                   <label htmlFor="email">Email</label>
                                   <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter email"
                                        required
                                   />
                              </div>
                              <div className="form-group mb-3">
                                   <label htmlFor="password">Password</label>
                                   <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        required
                                   />
                              </div>
                              <div className="mb-3">
                                   <p>
                                        Forgot Password?{" "}
                                        <i
                                             className="text-primary text-decoration-underline point"
                                             onClick={handleForgotPassword}
                                        >
                                             Click Here
                                        </i>
                                   </p>
                              </div>
                              <button
                                   type="submit"
                                   className="btn btn-primary w-100 mb-2"
                              >
                                   {action === "Login" ? "Login" : "Sign Up"}
                              </button>
                              <button
                                   type="button"
                                   className="btn btn-light w-100"
                                   onClick={() => {
                                        setAction(
                                             action === "Sign Up"
                                                  ? "Login"
                                                  : "Sign Up"
                                        );
                                   }}
                              >
                                   {action === "Sign Up"
                                        ? "Switch to Login"
                                        : "Switch to Sign Up"}
                              </button>
                         </form>
                    </div>
               </div>
          </div>
     );
};

export default Login;
