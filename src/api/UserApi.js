import React, { useEffect, useState } from 'react'
import axios from 'axios'
const UserApi = (token) => {
    const [userProfile, setUserProfile] = useState(null)
    const name = "sunny1"
    useEffect(() => {
        if (token) {
            const fetchProfile = async () => {
                try {
                    const profile = await axios.get(`/api/v1/user/userprofile/${name}`);
                    setUserProfile(profile.data.userProfile);
                    console.log(userProfile);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                }
            };

            fetchProfile();
        }
    }, [token]);


    return {
        userProfile: [userProfile, setUserProfile]
    }
}

export default UserApi

