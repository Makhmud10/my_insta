import React, { useState, useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import '../styl/Navbar.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light position-sticky fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="Instagram" /></a>
        <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div className="d-flex justify-content-end" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex fs-5">
              <a className="nav-link" aria-current="page" href="/">
              <HomeIcon />
              </a>
            </li>
            <li className="nav-item d-flex  fs-5">
              <a className="nav-link" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <PostAddIcon />
              </a>
            </li>
            <li className="nav-item d-flex  fs-5">
              <a className="nav-link"  href="/profile">
                <AccountBoxIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;