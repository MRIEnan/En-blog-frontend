import React, { useEffect } from 'react';
import './Blog.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllBlogs,getSingleBlog } from '../../features/counter/blogs/blogsSlice';
import CommentForm from '../Shared/CommentForm/CommentForm';
import { getAllComments } from '../../features/counter/blogs/commentsSlice';
import Comments from '../CommentMainContainer/Comments/Comments';

const Blog = () => {
    const {id} = useParams();
    //console.log(id)
    const dispatch = useDispatch();
    const singleBlog = useSelector((state)=>state.blogs.singleBlog)
    const allComments = useSelector((state)=>state.comments.comments)
    useEffect(()=>{
      dispatch(getSingleBlog(id))
      dispatch(getAllComments(id))
    },[dispatch])
  return (
    <div className='blog-main-container'>
        <h1 className='blog-main-container-title'>{singleBlog.title}</h1>
        <p>{singleBlog.content}</p>
        <div>
          <h3>Add a Comment</h3>
          <CommentForm blogId={id} parentId={null}/>
          <Comments blogId={id}/>
        </div>
    </div>
  )
}

export default Blog