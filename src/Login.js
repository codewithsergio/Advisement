import React from 'react';
import './Login.css';
import { signInWithGoogle } from './firebase-config';

function Login({setter}) {
    const signUsIn = () => {
        signInWithGoogle(setter); 
    }
  return (
    <div className="loginpage">
        <div className="login_page_title">CADV Advisement Admin Login</div>
        <button onClick={signUsIn}>Log In</button>
    </div>
  )
}

export default Login