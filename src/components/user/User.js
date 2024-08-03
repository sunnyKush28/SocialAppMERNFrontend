import React, { useContext } from 'react'
import { GlobalState } from '../../store/GlobalStore';

const User = () => {
    const state = useContext(GlobalState);
    const [user, setUser] = state.userProfile

    return (


        <>
            <div className='row px-md-5 my-3 '>
                <div className='col-2 col-md-3 profileImgBox border border-2 overflow-hidden m-0 p-0' >
                    <img src={user.avatar} className='profileImg' />
                </div>
                <div className='col-auto ps-2 ps-md-3 d-flex justify-content-center align-content-center flex-column m-0 p-0'>
                    <p className='h3 ' >{user.userName}</p>
                    <h5 className='m-0 h5'>{user.email}</h5>
                    <p>{user.fullName}</p>
                </div>
            </div>
            <div className='row pt-2 py-md-1 gap-0 px-md-5'>


            </div>
        </>

    )
}

export default User
