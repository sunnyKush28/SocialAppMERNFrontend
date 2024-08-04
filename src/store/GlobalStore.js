import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import axios from 'axios';

export const GlobalState = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || false);
    const [isLogged, setIsLogged] = useState(() => !!localStorage.getItem('token'));
    const [userProfile, setUserProfile] = useState({});
    const [posts, setPosts] = useState([]);
    const [allPost, setAllPost] = useState([])

    axios.defaults.baseURL = 'https://socialappmernbackend-1.onrender.com/'

    const fetchProfile = async () => {
        try {
            const profile = await axios.get('/api/v1/user/userprofile');
            setUserProfile(profile.data.userProfile);
            setPosts(profile.data.userProfile.posts);

        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        }
    };

    const refreshToken = async () => {
        try {
            const res = await axios.post('/api/v1/user/refreshtoken', {}, { withCredentials: true });
            const newToken = res.data.token.refreshToken;

            setToken(newToken);
            localStorage.setItem('token', newToken);
            setIsLogged(true);
            console.log(isLogged);
        } catch (error) {
            console.error('Error refreshing token: ', error);
            setIsLogged(false);

        }
    };

    const fetchallPostdata = async () => {
        try {
            const res = await axios.get(`/api/v1/post/posts`);
            setAllPost(res.data.posts)

        } catch (error) {
            console.error('Error refreshing token: ', error);
        }
    }


    const refreshTokenAccess = () => {
        refreshToken().then(() => {
            fetchProfile();
            fetchallPostdata();
        });
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstlogin");
        if (firstLogin) {

            refreshTokenAccess();

        }
    }, []);


    const state = {
        token: [token, setToken],
        auth: [isLogged, setIsLogged],
        userProfile: [userProfile, setUserProfile],
        userPosts: [posts, setPosts],
        allPost: [allPost, setAllPost],
        fetchallPostdata: fetchallPostdata,
        refreshTokenAccess: refreshTokenAccess
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
