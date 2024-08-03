import React, { useContext } from 'react'
import UserProfileData from './userProfile/UserProfileData'
import { GlobalState } from '../store/GlobalStore';
import User from '../components/user/User';
import Post from '../components/Post';
import DisplayPost from '../components/DisplayPost';

const Posts = () => {
    const state = useContext(GlobalState);
    const [userProfile, setUserProfile] = state.userProfile

    const [allPost, setAllPost] = state.allPost


    return (

        <div className='container-fluid'>
            <div className='container'>
                <div className='row m-0 p-0'>
                    {<User />}
                </div>
                <div className='row m-0 p-0  d-flex px-md-5' >


                    <div className='col-md-4 order-md-2  '>
                        <div className='row d-flex flex-nowrap flex-md-wrap overflow-auto gap-1 gap-md-0  ' >
                            {
                                allPost.map((post) => {
                                    return (
                                        <DisplayPost post={post} key={post._id} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='col-md-8  '>
                        <Post userId={userProfile._id} />
                    </div>


                </div>
            </div>
        </div>


    )
}

export default Posts
