
  
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    limit,
    onSnapshot,
} from "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import Post from "./Post";

const UploadPost = () => {
    const { currentUser } = useContext(AuthContext);
    const [imageFile, setImageFile] = useState(null);
    const [comment, setComment] = useState("");
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const storage = getStorage();
    const firestore = getFirestore();

    useEffect(() => {
        const unsubscribePosts = onSnapshot(
            collection(firestore, "images"),
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setPosts(data);
            }
        );

        const usersQuery = query(
            collection(firestore, "users"),
            orderBy("createdAt"),
            limit(10)
        );

        const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUsers(data);
        });

        return () => {
            unsubscribePosts();
            unsubscribeUsers();
        };
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (imageFile && comment) {
            try {
                const storageRef = ref(storage, `images/${imageFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                    },
                    (error) => {
                        console.error(error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        await addDoc(collection(firestore, "images"), {
                            imageUrl: downloadURL,
                            comment: comment,
                            userId: currentUser.uid,
                            userName: currentUser.displayName,
                            like: 0,
                            timestamp: serverTimestamp(),
                        });


                        setImageFile(null);
                        setComment("");
                    }
                );
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
<div className="container my-5">
  <div className="row">
    <div className="col-md-8 offset-md-2">
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="inputGroupFile02" className="form-label">Upload an Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-control"
                    id="inputGroupFile02"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Enter a comment"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="d-block">
        {posts.map((post) => (
          <div key={post.id} className="mb-4">
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

    )
};

export default UploadPost;
