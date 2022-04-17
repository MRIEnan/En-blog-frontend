import React from 'react';
import './NotFound.css';
import { NavHashLink } from 'react-router-hash-link';

const NotFound = () => {
  return (
    <div className='not-found-page-main-container'>
        <div>
            <p>🔎</p>
            <h2>Opps!No Result Found</h2>
            <h3>Please Return to <NavHashLink className="not-found-blog-btn" to={`/blogs`}>Blogs</NavHashLink></h3>
        </div>
    </div>
  )
}

export default NotFound