import React, { useEffect } from "react"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css'

function Dashboard()  {
    
    const navigate = useNavigate()
    //axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/dashboard')
        .then(res => {
            if(res.data.Status === "Success") {

            } else {
                navigate('/login')
            }
        })
    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:3000/logout')
        .then(res => {
                navigate('/login')
            }).catch(err => console.log(err));
    }
    return (
        <div class="container-fluid">
        <div class="row flex-nowrap">
            <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span class="fs-5 d-none d-sm-inline align-items-center justify-content-center"><p>Menu</p></span>
                    </a>
                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li class="nav-item">
                            <Link to='/home' class="nav-link align-middle px-0">
                                <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span> </Link> 
                        </li>
                        <li>
                            <Link to="/product"class="nav-link px-0 align-middle">
                                <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Product</span></Link>
                        </li>
                        <li>
                            <Link to="/inventory" class="nav-link px-0 align-middle">
                                <i class="fs-4 bi-list"></i> <span class="ms-1 d-none d-sm-inline">Inventory</span> </Link>
                        </li>
                        <li onClick={handleLogout}>
                            <a href="/login" class="nav-link px-0 align-middle">
                                <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Logout</span> </a>
                        </li>
                    </ul>
   
                </div>
            </div>
            <div class="col p-2 m-2">
                <div className='p-2 d-flex justify-content-center shadow'>
                    <h4> MotorParts Management System</h4>
                   
                </div>
                
                <div className='p-3 d-flex justify-content-around mt-3'>
            

        </div>
        
                <Outlet />
            </div>
            
        </div>
        
    </div>
    )
}

export default Dashboard;