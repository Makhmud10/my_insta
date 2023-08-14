import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import '../styl/Login.css'

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [err, setErr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;

        try {
            await sendPasswordResetEmail(auth, email);
            setEmailSent(true);
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <>
            {emailSent ? (
                <div className="container mt-5">
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </symbol>
                    </svg>
                    <div className="alert alert-success d-flex align-items-center" role="alert">
                        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                            <use href="#check-circle-fill" />
                        </svg>
                        <div>
                            Reset password link has been sent to your email.
                        </div>
                    </div>
                </div>
            ) : (
            <main class="main" role="main">
                <div class="wrapper">
                <article class="article">
                    <div class="content">
                    <div class="login-box">
                        <div class="header">
                            <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="Instagram" />
                            <p className="reset"><b>Password Reset</b></p>
                        </div>
                        
                        <div class="form-wrap">
                        <form class="form" onSubmit={handleSubmit}>

                            <div class="input-box">
                            <input type="text" aria-describedby="basic-addon1" aria-label="Email" placeholder="Email" required />
                            </div>  
                            <span class="button-box">
                            <button class="btn" type="submit" name="submit">Reset Password</button>
                            </span>  
                            {err && <span style={{ color: "red" }}>Failed to send reset password email!</span>}
                        </form>
                        </div>
                    </div>
                    <div class="login-box">
                        <p class="text">Go back to <Link to="/login">Login</Link></p>
                    </div>
                    </div> 
                </article>
                </div> 
            </main>
            )}
        </>
    );
};

export default ForgotPassword;
