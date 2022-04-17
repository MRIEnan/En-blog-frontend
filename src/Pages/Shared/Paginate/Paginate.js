import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageNo } from '../../../features/counter/blogs/blogsSlice';

import './Paginate.css';

const Paginate = () => {
    const totalPage = useSelector((state)=>state.blogs.totalPage);
    const currentPage = useSelector((state)=>state.blogs.currentPage);
    const [paginateInitPageNo,setPaginateInitPageNo] = useState(1);
    const [paginateEndPageNo,setPaginateEndPageNo] = useState(paginateInitPageNo+3);
    useEffect(()=>{
        if(currentPage==1){
            setPaginateInitPageNo(0)
            setPaginateEndPageNo(3)
            //console.log(paginateInitPageNo,'.---.',paginateEndPageNo)
            return
        }
        else if(currentPage==totalPage){
            setPaginateInitPageNo(totalPage-3)
            setPaginateEndPageNo(totalPage)
            //console.log(paginateInitPageNo,'.---.',paginateEndPageNo)
        }
        else{
            setPaginateInitPageNo(currentPage-2)
            setPaginateEndPageNo(currentPage+1)
            //console.log(parseInt(paginateInitPageNo),'.---.',paginateEndPageNo)
        }
    },[currentPage,totalPage])
    const dispatch = useDispatch();
    // const totalPage = 8;
    // const totalArray = [...Array(totalPage).keys()];
    const newTotalArray = Array.from({length: totalPage}, (v=1, k=0) => k+v);
    const totalArray = newTotalArray.slice(paginateInitPageNo,paginateEndPageNo)
    //console.log(totalArray)
    if(currentPage>1){
        totalArray.unshift('◀');
    }
    if(currentPage<totalPage){
        totalArray.push('▶');
    }
    // setCurrentPageNo
    const handlePageNo = (pageNo)=>{
        if(pageNo==currentPage){
            return;
        }
        if(pageNo=='◀'){
            dispatch(setCurrentPageNo(currentPage-1));
        }
        else if(pageNo=='▶'){
            dispatch(setCurrentPageNo(currentPage+1));
        }else{
            dispatch(setCurrentPageNo(pageNo));
        }

    }

    return (
        <div>
            <div className='paginate-main-container'>
                {totalArray.map(tot=>
                <div key={tot} onClick={()=>handlePageNo(tot)} className={tot==currentPage?`paginate-single-current-page-container`:`paginate-single-page-container`}>
                    <p>{tot}</p>
                </div>)}
            </div>
        </div>
    )
}

export default Paginate