import React from 'react';
import { Link } from 'react-router-dom'
import './user.css';

const UserPost = ({ posts }) => {

    return (
        <div className='container-fluid'>

            <div className='container px-md-5'>
                <div className='row d-flex g-md-2 g-0 justify-content-around align-item-center px-md-5'>
                    {posts.map((post) => (
                        <Link to={`/post/${post._id}`} key={post._id} className='card col-4 postImg border-2 bgColor'>
                            <img src={post.postImg} alt={`Post ${post.id}`} className='card-img-top  ' />
                        </Link>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default UserPost;
