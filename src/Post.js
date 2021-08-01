import { React, useState, useEffect } from 'react'
import Avatar from "@material-ui/core/Avatar"
import './Post.css'
import { db } from './firebase';

function Post ({ postId, username, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');


    useEffect(() => {
        var unsubscribe; 
        if (postId) {
            unsubscribe = db.collection("posts")
                .doc(postId)
                .collection("comments")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.doc.map(doc => doc.data()))
                });
        }
        return () => {
            unsubscribe();
        };
    }, [postId])

    const postComment = (event) => {


    }
    return (
        <div className="post">
            <div className="post_header">
                <Avatar className="post_avatar"
                    alt="esradogan"
                    src="./images/logo.jpg">
                </Avatar>
                <h3>{username}</h3>
            </div>
            <img className="post_image" src={imageUrl}
                alt=""
            ></img>
            <h4 className="post_text"><strong>{username} </strong>{caption}</h4>
            <form className="post_commentBox">
                <input className="post_input"
                    type="text"
                    placeholder="Add a comment..."
                    onChange={(e) => setComment(e.target.value)}></input>
                <button
                    className="post_button"
                    disabled={!comment}
                    type="submit"
                    onClick={{ postComment }}>
                    Post
                </button>
            </form>
        </div>
    )
}

export default Post
