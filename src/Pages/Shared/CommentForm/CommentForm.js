import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSingleBlog } from '../../../features/counter/blogs/blogsSlice';
import { getAllComments, postNewComment } from '../../../features/counter/blogs/commentsSlice';
import './CommentForm.css';

const CommentForm = ({blogId,parentId,setIsOpen}) => {
    const [canComment,setCanComment] = useState(false);
    const [commenterName,setCommenterName] = useState('');
    const [commentText,setCommentText] = useState('');
    const dispatch = useDispatch();
    // setCommentLoading
    const handleCommentSubmit = async(e)=>{
        e.preventDefault();
        if(!blogId && !parentId && !commenterName && !commentText){
            alert('Reply failed! Please try again');
            return;
        }
        const replyData = {};
        replyData['name']=commenterName;        
        replyData['commentText']=commentText;        
        replyData['createdAt']=new Date().toUTCString();
        replyData['blogId']=blogId;
        replyData['parentId']=parentId;
        //console.log(replyData)        
        const resData = await dispatch(postNewComment(replyData))
        //console.log('res data',resData);
        //console.log(resData.payload.insertedId);
        if(setIsOpen){
            setIsOpen(false)
        }
        setCommenterName('');
        setCommentText('');

        dispatch(getSingleBlog(blogId))
        dispatch(getAllComments(blogId))
        // window.document.location.reload()
    }
    return (
        <form className='comment-form-main-container' onSubmit={e=>handleCommentSubmit(e)}>
            <input type='text' value={commenterName} onChange={e=>setCommenterName(e.target.value)} placeholder="Name" />
            <input type='text' name='comment' value={commentText} onChange={e=>setCommentText(e.target.value)} placeholder='Comment' />
            <button className='comment-form-submit-button' type='submit'>Submit</button>
        </form>
    )
}

export default CommentForm

/*

1/ name
2/ blogId
3/ parentId
4/ commentText
5/ createdAt

*/