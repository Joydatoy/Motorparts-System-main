import './style.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


function ChangeLogin() {
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const {id} = useParams();

    useEffect(()=> {
        const [changelogin, setError] = useState('')
		axios.get('http://localhost:3000/get/'+id)
		.then(res => {
			setData({...data, email: res.data.Result[0].email,
				password: res.data.Result[0].password
			})
		})
		.catch(err =>console.log(err));
	}, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3000/update/'+id, data)
        .then(res => {
            if(res.data.Status === 'Success') {
                navigate('/login')
            } 
        })
        .catch(err => console.log(err));
    }
        return (
            <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
                    <div className="p-3 rounded w-25 border loginForm">
                        <div className="text-danger">
                            {error && error}
                        </div>
                    <h2>Change Username and Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="email"><strong>Username</strong></label>
                            <input type="email" placeholder='Enter Email' name='email' 
                             onChange={e => setData({...data, email: e.target.value})} value={data.email} className='form-control rounded-0' autoComplete='off' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input type="password" placeholder='Enter Password' name='password'
                               onChange={e => setData({...data, password: e.target.value})} value={data.password} className='form-control rounded-0' />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded">Change Username and Password</button>
                        <p>Enter to Login MotherFucker</p>
                    </form>
                   
                </div>
            </div>
    )
}

export default ChangeLogin

