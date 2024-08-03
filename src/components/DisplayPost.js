import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom'

const DisplayPost = ({ post }) => {
    const [authorData, setAuthorData] = useState(null)

    const fetchPostUser = async () => {
        try {
            const res = await axios.get(`/api/v1/user/userinfo/${post.author}`)
            setAuthorData(res.data.user)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchPostUser();
    }, [])

    return (

        <Link to={`/post/${post._id}`} className='card col-6 col-md-6 mb-0 bgColor mb-4 ' >
            <img src={post.postImg} className='img-fluid card-img-top' />
            <p className='m-0'>{authorData ? (authorData.fullName) : ""}</p>
            <span className='fs-6 m-0'>{post.title}</span>
        </Link>

    )
}

export default DisplayPost
