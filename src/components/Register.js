
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ handleChange }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [register, setRegister] = useState({
        fullName: "",
        userName: "",
        email: "",
        avatar: null,
        coverImage: null,
        password: ""
    });
    const timeoutRef = useRef(null);

    const inputRegisterHandle = (e) => {
        const { name, value, files } = e.target;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setRegister((prevRegister) => ({
                ...prevRegister,
                [name]: files ? files[0] : value
            }));
        }, 300);
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        Object.keys(register).forEach((key) => {
            formData.append(key, register[key]);
        });


        try {
            const responce = await axios.post('/api/v1/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(responce.data.message)

            navigate('/')

        } catch (error) {
            alert(`Error message: ${error.response.data.message}`);

        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
    };

    return (
        <div className='container' style={{ height: "100vh" }}>
            <div className='row d-flex justify-content-center gap-3 align-items-center h-100 flex-column'>
                <div className='col-md-3 border px-4'>
                    <div className='row text-center'>
                        <h3 className='pacifico-regular my-3 display-5'>PostPulse</h3>
                    </div>
                    <form onSubmit={handleRegisterSubmit} encType='multipart/form-data'>
                        <div className='row d-flex flex-column justify-content-center align-items-center'>
                            <div>
                                <input
                                    type='text'
                                    className="form-control rounded-0 my-2"
                                    placeholder='Fullname'
                                    onChange={inputRegisterHandle}
                                    name="fullName"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type='text'
                                    className="form-control rounded-0 my-2"
                                    placeholder='Username'
                                    onChange={inputRegisterHandle}
                                    name="userName"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type='email'
                                    className="form-control rounded-0 my-2"
                                    placeholder='Email'
                                    onChange={inputRegisterHandle}
                                    name="email"
                                    required
                                />
                            </div>
                            <div>
                                <label className='form-label' htmlFor='avatar'>User Image</label>
                                <input
                                    type='file'
                                    className="form-control rounded-0"
                                    onChange={inputRegisterHandle}
                                    name="avatar"
                                    required
                                />
                            </div>
                            <div>
                                <label className='form-label' htmlFor='coverImage'>Cover Image</label>
                                <input
                                    type='file'
                                    className="form-control rounded-0"
                                    onChange={inputRegisterHandle}
                                    name="coverImage"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type='password'
                                    className="form-control rounded-0 my-2"
                                    placeholder='Password'
                                    onChange={inputRegisterHandle}
                                    name="password"
                                    required
                                />
                            </div>
                            <div className='row my-4'>
                                <button type='submit' className='btn btn-success rounded-5' disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" disabled></span> : "Submit"}
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
                <div className='col-md-3 border px-4 text-center'>
                    <p className='my-3'>
                        <span className='text-primary fw-bold' onClick={handleChange}>Login</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
