import React, { useEffect, useState } from 'react'
import './CommentOne.css';
import { useSelector } from 'react-redux'
import CommentTwo from '../CommentTwo/CommentTwo';
import userOneImage from '../../../../media/userOne.jpg';
import CommentForm from '../../../Shared/CommentForm/CommentForm';

const CommentOne = ({ comment,blogId }) => {
    const [childComment,setChildComment] = useState([]);
    const [isOpen,setIsOpen] = useState(false);
    const allComments = useSelector((state) => state.comments.comments);
    const [cmtDate,cmtTime] = new Date(comment.createdAt).toLocaleString().split(', ')
    const period=cmtTime.split(' ')[1]
    const [eDate,eMon,eYear] = [new Date(comment.createdAt).getDate(),new Date(comment.createdAt).toLocaleString('default',{month: 'long'}),new Date(comment.createdAt).getFullYear()]
    const [hr,min,sec] = [new Date(comment.createdAt).toLocaleString('en-US', { hour: 'numeric', hour12: true }),new Date(comment.createdAt).getMinutes(),new Date(comment.createdAt).getSeconds()]
    useEffect(()=>{
        if(allComments){
            const filteredComments =allComments.filter(cmnt=>cmnt.parentId==comment._id);
            setChildComment([...filteredComments])
            //console.log('fff',filteredComments)
        }
    },[allComments])
    return (
        <div className='comment-one-main-container'>
            <div className='comment-one-inner-root-comment-container'>
                <div className='comment-information'>
                    <div className='comment-inner-image-container'>
                        <img className='comment-inner-image' src={userOneImage} />
                    </div>
                    <div className='comment-information-name-date'>
                        <p className='comment-information-name'>{comment.name}</p>
                        <p className='comment-information-date'>{eMon} {eDate}, {eYear} AT {hr.split(' ')[0]}:{min} {period}</p>
                    </div>
                </div>
                <div className='comment-text-container'>
                    <p className='comment-container-inner-text'>{comment.commentText}</p>
                    <p onClick={()=>setIsOpen(!isOpen)} className='comment-reply-button'>Reply</p>
                    {isOpen && <CommentForm setIsOpen={setIsOpen} blogId={blogId} parentId={comment._id}/>}
                </div>
            </div>
            {
                childComment && childComment.map(childCmt => 
                <div>
                    <CommentTwo blogId={blogId} comment={childCmt} key={childCmt._id} />
                </div>
                )
            }
        </div>
    )
}

export default CommentOne