import React, { useEffect, useState } from "react";
import './Login.css';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';

const Login = () => {

     const [action, setAction] = useState('Login');


     return (
          <div className="container">
               <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
               </div>
               <div className="inputs"></div>
               <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" name="" id="email" placeholder="Email" />
               </div>
               <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" name="" id="pass" placeholder="Password" />
               </div>
               <div className="forgot-password">Forgot Passowrd? <span>Click Here</span></div>
               <div className="submit-container">
                    <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{ setAction('Sign Up') }}>Sign Up</div>
                    <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{ setAction('Login') }}>Login</div>
               </div>
          </div>
     );
}

export default Login;