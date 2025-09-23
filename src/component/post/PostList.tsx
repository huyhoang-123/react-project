import { useSelector,useDispatch } from "react-redux";
import "./PostList.css"


import React from 'react'
import { sharedAllPost } from "../../context/postSlice";

const PostList = () => {
    const posts = useSelector(sharedAllPost);
    const renderPostList = posts.map((item:any)=>(
        <div className="post__list" key={item.id}>
            <h2 >{item.title}</h2>
            <h3>{item.content}</h3>
        </div>

    ))


  return (
    <div className="post">
<h1>Post</h1>
{renderPostList}

    </div>
  )
}

export default PostList