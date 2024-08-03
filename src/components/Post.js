import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LikeUnLikeBtn from './LikeUnLikeBtn'



const Post = ({ userId }) => {
    const { id } = useParams()
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async (id) => {
            try {
                const res = await axios.get(`/api/v1/post/posts?_id=${id}`);
                const postData = res.data.post;

                const initialLiked = postData.likes.includes(userId);
                const initialLikes = postData.likes.length;

                setPost({
                    ...postData,
                    initialLikes,
                    initialLiked,
                });
            } catch (error) {
                console.error("Error fetching post data", error);
            }
        }

        if (id) {
            fetchPost(id);
        }
    }, [id, userId]); // Ensure userId is part of dependencies if dynamic



    function formatDateTime(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'UTC' // Adjust based on your preference
        };

        return date.toLocaleString(undefined, options);
    }


    return (
        <div className='row mt-md-3'>
            {
                post ? (
                    <div className='col card p-0 m-0 bgColor px-3 my-3 my-md-0'>
                        <div className='row'>
                            <div className='col-md-11'>
                                <img src={post.postImg} className='w-100 card-img-top ' />
                            </div>

                        </div>
                        <LikeUnLikeBtn post={post} />

                        <h5 className='fs-4 mt-3 mb-0 text-white'>{post.title}</h5>
                        <p className='m-0 mt-2 fs-6 text-secondary'>{formatDateTime(post.createdAt)}</p>
                        <p className='m-0'>Post Category: {post.category}</p>
                        <p className='fs-5' style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>

                    </div>
                ) :
                    <p>Loading Post....</p>
            }

        </div>
    )
}

export default Post
