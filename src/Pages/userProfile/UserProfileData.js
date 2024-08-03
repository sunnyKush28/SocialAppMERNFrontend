import React from 'react'
import './user.css'
const UserProfileData = ({ user }) => {
    return (
        <div className='container-fluid' >
            <div className='row userImage ' style={{ backgroundImage: `url(${user.coverImage})` }}>
                <div className='col col-md-8 border border-3 profileImgBox' >
                    <img src={user.avatar} className='profileImg' />
                </div>

            </div>
            <div className='container mt-5'>
                <div className='row pt-2 py-md-1 gap-0 px-md-5'>
                    <div className='text-end px-md-5'>
                        <h2 >{user.userName}</h2>
                        <h5 className='m-0'>{user.email}</h5>
                        <p>{user.fullName}</p>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default UserProfileData
