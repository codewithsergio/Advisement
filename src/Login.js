import React from "react";
import "./Login.css";
import { signInWithGoogle } from "./firebase-config";

function Login({ setter }) {
  const signUsIn = () => {
    signInWithGoogle(setter);
  };
  return (
    <div className="loginpage">
      <div className="loginCard">
        <img src="./csun_logo.png" alt="csun logo" />
        <h1>CADV Advisement Admin Portal</h1>
        <p>Helping Advisors Help Students Succeed</p>
        <button onClick={signUsIn}>LOGIN</button>
      </div>
    </div>
  );
}

export default Login;
