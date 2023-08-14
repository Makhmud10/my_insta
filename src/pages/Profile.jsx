import React, { useContext, useEffect, useState } from "react";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { db, auth } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const firestore = getFirestore();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(
          collection(firestore, "images"),
          where("userId", "==", currentUser.uid)
        );
        const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setPosts(data);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [currentUser.uid, firestore]);

  const handleDeletePost = async (postId) => {
    try {
      const postDocRef = doc(db, "posts", postId); // Update "posts" to your actual collection name
      await deleteDoc(postDocRef);
  
      // After successfully deleting the post, you might want to update the state or fetch posts again
      // to reflect the changes in your UI.
      // For example:
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
  
      console.log("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Redirect or perform any additional logout actions
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div>
    <Navbar />
    <div className="p-5">
      <div className="d-flex align-items-center mb-4">
        <img
          src="https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg"
          alt=""
          width="100px"
          className="rounded-circle me-3"
        />
        <a href="#" className="forgot text-decoration-none" onClick={handleForgotPassword}>Edit profile</a>
      </div>
      <div className="p-3">
        <h3>
          <b>{currentUser.displayName}</b>
        </h3>
        <p>
          <b>{currentUser.email}</b>
        </p>
      </div>
      <button className="btn btn-outline-danger btn w-25" onClick={handleLogout}>
        Logout
      </button>
      <center className="mt-4">
        <b>Posts</b>
      </center>
      <hr className="w-100" />
      <div className="container text-center">
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          {posts.map((post) => (
            <div className="col" key={post.id}>
              <div className="p-3">
                <img
                  src={post.imageUrl}
                  alt=""
                  width="200px"
                  height="200px"
                  className="img-fluid rounded"
                />
                <button className="btn btn-danger mt-2" onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  

  );
};

export default Profile;
