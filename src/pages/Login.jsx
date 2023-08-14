import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styl/Login.css"


const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      <main className="main" role="main">
        <div className="wrapper">
          <article className="article">
            <div className="content">
              <div className="login-box">
                <div className="header">
                  <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="Instagram" />
                </div>
                <div className="form-wrap">
                  <form className="form" onSubmit={handleSubmit}>

                    <div className="input-box">
                      <input type="text" aria-describedby="basic-addon1" aria-label="Email" placeholder="Email" required />
                    </div>  

                    <div className="input-box">
                      <input type="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required />
                    </div>  

                    <span className="button-box"> 
                      <button className="btn" type="submit" name="submit">Log in</button>
                    </span>  
                    <a href="#" className="forgot" onClick={handleForgotPassword}>Forgot password?</a>
                  </form>
                  {err && <span>Noto'g'ri to'ldirildi!</span>}
                </div>
              </div>
              <div className="login-box">
                <p className="text">Don't have an account?<a href="/register">Sign up</a></p>
              </div>
            </div>
          </article>
        </div> 
      </main>
    </>
  );
};

export default Login;
