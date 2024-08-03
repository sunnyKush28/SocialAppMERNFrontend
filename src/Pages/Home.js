import React, { useContext, useEffect } from 'react'

import { GlobalState } from '../store/GlobalStore';
import User from '../components/user/User';
import DisplayPost from '../components/DisplayPost';
import SideBar from '../components/SideBar';
const Home = () => {
    const state = useContext(GlobalState);
    const [userProfile, setUserProfile] = state.userProfile
    const [allPost, setAllPost] = state.allPost



    return (
        <div className='container-fluid'>
            <div className='container px-md-5 '>
                <div className='row z-1'>
                    <User user={userProfile} />
                </div>
                <div className='row px-md-5 gap-2'>
                    <div className='col-0 col-md-2 border-end border-success rounded-1 shadow-lg bg-tertiary py-3 px-2'>
                        {<SideBar />}
                    </div>
                    <div className='col' >
                        <div className='row d-flex flex-wrap flex-md-wrap  gap-md-0  h-100 example' >
                            {
                                allPost.map((post) => {
                                    return (
                                        <DisplayPost post={post} key={post._id} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
