import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import UserProfileData from './userProfile/UserProfileData';
import UserPost from './userProfile/UserPost';
import { GlobalState } from '../store/GlobalStore';

const UserProfile = () => {
    const state = useContext(GlobalState);

    const [userProfile, setUserProfile] = state.userProfile
    const [posts, setPosts] = state.userPosts



    return (
        <>
            <UserProfileData user={userProfile} />
            <UserPost posts={posts} />
        </>
    );
};

export default UserProfile;
