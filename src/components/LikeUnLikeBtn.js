import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const LikeUnLikeBtn = ({ post }) => {
    const postId = post._id
    const [likes, setLikes] = useState(null)
    const [liked, setLiked] = useState(null)


    useEffect(() => {
        setLikes(post.initialLikes)
        setLiked(post.initialLiked)
    }, [post])

    const handleClick = async () => {
        try {
            const res = await axios.put(`/api/v1/post/postslike/${postId}/like`)


            setLiked(res.data.liked)
            setLikes(res.data.likes)


        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='row align-items-baseline my-md-2 p-0'>
            <div className='col-3'>

                <div className='col m-0 p-0'>
                    <button className='btn fs-3 m-0 p-0' onClick={handleClick}>{liked ? <FaHeart /> : <CiHeart />}</button>
                </div>
                <div className='col  '><span>{likes} Likes</span></div>

            </div>



        </div>
    )
}

export default LikeUnLikeBtn
