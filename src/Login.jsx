import React, { useState } from "react"
import './style.css'
import axios from 'axios'
import { Link, Outlet, useNavigate } from "react-router-dom"
//import ChangeLogin from "./ChangeLogin"


function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const [error, setError] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/login', values)
        .then(res => {
            if(res.data.Status === 'Success') {
                navigate('/home')
            } else {
                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }
    {/*const handleChange = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/changelogin')
        navigate('/changelogin')
    }*/}

        return (
            <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
                    <div className="p-3 rounded w-25 border loginForm">
                        <div className="text-danger">
                            {error && error}
                        </div>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="email" placeholder='Enter Email' name='email' 
                             onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-0' autoComplete='off' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input type="password" placeholder='Enter Password' name='password'
                               onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0' />
                        </div>
                        <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        
                                <button type='change' className="btn btn-success w-100 rounded"><Link to='/changelogin' class="nav-link px-0 align-middle">Change Username and Password</Link></button>
                        <p>Enter to Login MotherFucker</p>
                    </form>
                   
                </div>
                <Outlet />
            </div>
    )
}

export default Login

