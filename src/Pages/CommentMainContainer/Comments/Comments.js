import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CommentOne from './CommentOne/CommentOne';

const Comments = ({ blogId }) => {
    const [rootComments,setRootComments] = useState([]);
    const allComments = useSelector((state) => state.comments.comments)
    useEffect(()=>{
        if(allComments){
            // allComments.map(cmnt=>{//console.log(cmnt)});
            // //console.log('now filter');
            const filteredComments =allComments.filter(cmnt=>cmnt.parentId==null);
            setRootComments(filteredComments)
            //console.log(filteredComments)
        }
    },[allComments])
    return (
        <div>
            {
                rootComments.map(rCom => <CommentOne key={rCom._id} blogId={blogId} comment={rCom}/>)
            }
        </div>
    )
}

export default Comments