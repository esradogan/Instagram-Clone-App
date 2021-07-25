import React from 'react'
import Avatar from "@material-ui/core/Avatar"
import './Post.css'

function Post ({username, caption, imageUrl}) {
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
        </div>
    )
}

export default Post
