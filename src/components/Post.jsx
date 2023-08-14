import React, { useState } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { storage, db } from "../firebase";
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Post = ({ post }) => {
    const { id, imageUrl, comment, userName, like } = post;
    const [likeCount, setLikeCount] = useState(like);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);

    const handleLikeClick = async () => {
        const postRef = doc(db, "images", id);

        try {
            if (likeCount > 0) {
                // Decrease the like count by 1
                await updateDoc(postRef, {
                    like: likeCount - 1,
                });

                // Update the local state with the updated like count
                setLikeCount(likeCount - 1);
            } else {
                // Increase the like count by 1
                await updateDoc(postRef, {
                    like: likeCount + 1,
                });

                // Update the local state with the updated like count
                setLikeCount(likeCount + 1);
            }
        } catch (error) {
            console.error("Error updating like count:", error);
        }
    };

    const handlePostComment = async () => {
        const postRef = doc(db, "images", id);

        try {
            // Add the new comment to the comments array in the database
            await updateDoc(postRef, {
                comments: arrayUnion(newComment),
            });

            // Update the local state with the new comment
            setComments([...comments, newComment]);

            // Clear the input field
            setNewComment("");
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                {userName}
            </div>
            <img src={imageUrl} className="card-img-top img-fluid h-75" alt="..." />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <a className="text-decoration-none" style={{ cursor: "pointer" }} onClick={handleLikeClick}>
                        <h5>❤️</h5>
                    </a>
                    <h5 className='d-flex justify-content-center'>{likeCount}</h5>
                </div>
                <h6 className="card-title">{comment}</h6>
                <div className="mb-2">
                    {comments.slice(Math.max(comments.length - 2, 0)).map((c, index) => (
                        <div className="d-flex" key={index}>
                            <p><ion-icon name="chatbubble-ellipses-outline"></ion-icon>{c}</p>
                        </div>
                    ))}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><EmojiEmotionsIcon /></span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Comments"
                        aria-label="Comments"
                        aria-describedby="basic-addon1"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        className="btn btn-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={handlePostComment}
                    >
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Post;
