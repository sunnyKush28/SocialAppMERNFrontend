import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { GlobalState } from '../store/GlobalStore';
const Navbar = () => {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.auth;

    const navigate = useNavigate()



    const handleLogout = async (e) => {
        try {
            const res = await axios.post('/api/v1/user/logout')

            localStorage.clear()
            navigate("/login")
            alert(res.data.message)
        } catch (error) {

        }
    }

    return (
        <div className='container-fluid bg-black '>
            <div className='container '>
                <div className='row px-md-5'>
                    <nav className="navbar navbar-expand-lg fw-bolder px-md-5">
                        <div className="container-fluid">
                            <a className="navbar-brand fontcolor pacifico-regular " >PostPulse</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon custom-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                                    {
                                        isLogged ? (
                                            <>
                                                <li className="nav-item ">
                                                    <NavLink to="/" className={({ isActive }) => (`nav-link ${isActive ? "text-white" : "text-danger"} `)} aria-current="page" >Home</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className={({ isActive }) => (`nav-link ${isActive ? "text-danger" : "text-white"} `)} onClick={handleLogout}>LogOut</NavLink>
                                                </li>

                                                <li className="nav-item">
                                                    <NavLink className={({ isActive }) => (`nav-link ${isActive ? "text-white" : "text-danger"} `)} to="/userprofile">My Profile</NavLink>
                                                </li>
                                            </>) : (

                                            <li className="nav-item">
                                                <Link className="nav-link fontcolor" to="/login">LogIn</Link>
                                            </li>
                                        )

                                    }


                                </ul>

                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Navbar
