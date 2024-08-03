import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalState } from '../store/GlobalStore';
import Register from '../components/Register';

const Login = () => {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.auth;
    const [token, setToken] = state.token
    const { refreshTokenAccess } = state

    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [loginComponent, setLoginComponent] = useState(true)
    const inputHandle = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/user/login', { ...user }, { withCredentials: true });

            const token = res.data.refreshToken;

            localStorage.setItem("firstlogin", true);
            localStorage.setItem("token", token);
            setIsLogged(true);
            setToken(res.data.refreshToken)
            refreshTokenAccess()
            navigate("/");

        } catch (error) {
            alert(error.response.data.message);
        }
    };


    const handleChange = () => {
        setLoginComponent(() => {
            return loginComponent === true ? false : true;
        })
    }



    return (
        <div className='container-fluid loginBg' >


            {
                loginComponent ? (
                    <div className='container ' style={{ height: "100vh" }}>
                        <div className='row d-flex justify-content-center gap-3 align-items-center h-100 flex-column '>
                            <div className='col-md-3 border  px-4'>
                                <div className='row text-center'>
                                    <h1 className='pacifico-regular my-5 display-5'>PostPulse</h1>
                                </div>
                                <form onSubmit={handleSubmit} className=''>
                                    <div className='row d-flex flex-column justify-content-center align-items-center'>

                                        <div >
                                            <input type='text' className="form-control rounded-0 my-2" placeholder='Email' onChange={inputHandle} name="email" />
                                        </div>
                                        <div>
                                            <input type='password' className="form-control rounded-0  " placeholder='Password' onChange={inputHandle} name="password" />
                                        </div>
                                        <div className='row  my-4'>
                                            <button type='submit' className='btn btn-success rounded-5'>Submit</button>
                                        </div>
                                    </div>
                                </form>



                            </div>
                            <div className='col-md-3 border px-4 text-center align-text-center'>
                                <p className='my-3'>Don't have an account? <span className='text-primary fw-bold ' onClick={handleChange}>Sign up</span></p>

                            </div>

                        </div>

                    </div>
                ) :
                    <Register handleChange={handleChange} />
            }

        </div>
    );
};

export default Login;
