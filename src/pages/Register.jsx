import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "../styl/Login.css"

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      let photoURL = "http://www.newdesignfile.com/postpic/2014/09/windows-user-icons-transparent_248595.jpg";

      if (file) {
        photoURL = await uploadAndGetDownloadURL(storageRef, file);
      }

      await updateProfile(res.user, {
        displayName,
        photoURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        password,
        photoURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  };

  const uploadAndGetDownloadURL = (storageRef, file) => {
    return new Promise((resolve, reject) => {
      uploadBytesResumable(storageRef, file)
        .then(() => getDownloadURL(storageRef))
        .then((downloadURL) => resolve(downloadURL))
        .catch((error) => reject(error));
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
                      <input type="text" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required/>
                    </div>
                    <div className="input-box">
                      <input type="text" aria-describedby="basic-addon1" aria-label="Email" placeholder="Email" required />
                    </div>  

                    <div className="input-box">
                      <input type="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required />
                    </div>  

                    <span className="button-box">
                      <button className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Loading..." : "Sign up"}
                      </button>
                    </span>  
                    <div className="register">
                      <p style={{ color: "red" }}>{err && <span>Filled incorrectly!</span>}</p>
                    </div>
                  </form>
                  {err && <span>Noto'g'ri to'ldirildi!</span>}
                </div>
              </div>
              <div className="login-box">
                <p className="text">Do have an account? <Link className="text-decoration-none" to="/login">Login</Link></p>
              </div>
            </div> 
          </article>
        </div> 
      </main>
    </>
  );
};

export default Register;
