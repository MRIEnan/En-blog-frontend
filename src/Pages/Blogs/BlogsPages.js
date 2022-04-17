import React, { useEffect, useMemo, useState } from 'react';
import './BlogsPages.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs, postNewBlog,setCurrentPageNo } from '../../features/counter/blogs/blogsSlice';
import { NavHashLink } from 'react-router-hash-link';
import Paginate from '../Shared/Paginate/Paginate';


const BlogsPages = () => {
    const [isOpen,setIsOpen] = useState(false)
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [canAdd,setCanAdd] = useState(false);
    const pageNo = useSelector((state)=>state.blogs.currentPage)
    // const postResponse = useSelector((state)=>state.blogs.postNewBlog)
    const [blogData,setblogData] = useState({});
    const dispatch = useDispatch();
    const blogs = useSelector((state)=>state.blogs.blogs)
    const totalPage = useSelector((state)=>state.blogs.totalPage)
    useEffect(()=>{
        dispatch(getAllBlogs(pageNo))
        //console.log(blogs)
    },[dispatch,pageNo])

    useEffect(()=>{
        setCanAdd(title&&content)
        
    },[title,content])
    

    // handling adding new blog
    const handleOnSubmit = async(e) =>{
        e.preventDefault();
        if(!title && !content){
            alert('Please fill the field properly')
            return
        }
        const d = new Date().toUTCString();
        blogData['title']=title;
        blogData['content']=content;
        blogData['published']=d;
        //console.log('finllay',blogData);
        const resData = await dispatch(postNewBlog(blogData))
        //console.log('res data',resData);
        //console.log(resData.payload.insertedId);
        if(resData.payload.insertedId){
            alert('Succesfully Added')
            setblogData({});
            setContent('');
            setTitle('');
            setIsOpen(false);
            if(totalPage%5){
                dispatch(setCurrentPageNo(totalPage+1));
            }
            else{
                dispatch(setCurrentPageNo(totalPage));
            }
            dispatch(getAllBlogs(pageNo))
        }
    }

    return (
        <div className='blogs-pages-main-container'>
            
            <div className='blogs-pages-inner-container-one'>
                <h2 className='all-blogs-pages-title'>All Blogs</h2>
                <button className="add-new-blog-button" onClick={()=>setIsOpen(true)}>Add New Blog</button>
            </div>
            {/* adding new blog post form  */}
            {isOpen && <div className='add-new-blogs-form-main-container'>
             
                <form onSubmit={e=>handleOnSubmit(e)}>
                    <h3>Please fill all field</h3>
                    <p className='add-new-blog-form-title'>Title</p>
                    <input type='text' name='title' value={title} onChange={e=>setTitle(e.target.value)}/>
                    <p className='add-new-blog-form-title'>Content</p>
                    <textarea  name='content' value={content} onChange={e=>setContent(e.target.value)}/>
                    {canAdd ?<button className='add-new-form-button-submit' type='submit'>Add new</button>:
                    <button className='add-new-form-button-submit' type='submit' disabled>Add new</button>
                    }
                    <button className='add-new-form-button-cancel' onClick={()=>setIsOpen(false)}>Cancel</button>
                </form>
            </div>
            }
            <div className='blogs-pages-inner-container-two'>
            {
                blogs.map(sBlog => <NavHashLink key={sBlog._id} style={{textDecoration:'none'}} to={`/blog/${sBlog._id}`}><div className='single-blog-card'><p className='single-blog-card-title'>{sBlog.title}</p></div></NavHashLink>)
            }
            </div>
            <div className='blogs-pages-inner-container-three'>
                <Paginate/>
            </div>
        </div>
    )
}

export default BlogsPages