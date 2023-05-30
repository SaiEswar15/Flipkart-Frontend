import React, {useState} from 'react'
import "./LoginPage.css";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from './base';

function LoginPage() {

    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const notification = useSelector((state)=>state.auth.loginNotification)
    // const loggedin = useSelector((state)=>state.auth.loginNotification)

    let [data, setData] = useState({
        email : "",
        password : ""
    })

    function changeHandler(e)
    {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    function loginHandler(e)
    {
        e.preventDefault();
        console.log(data);
        axios.post(`${base_url}/auth/login`,data)
        .then((res)=>{
            console.log(res.data);
            dispatch(authActions.updateToken(res.data.token))
            
            dispatch(authActions.status(true))
            Navigate("/")
            
        })
        
    }

    return (<>
            <div className="loginpage-con">
                <div className="loginpage-dec">
                    <h1>Login</h1>
                    <p>Get access to your orders, wishlist and cart</p>
                </div>
                <form className='loginpage-form'autoComplete='off' onSubmit = {loginHandler}>
                    <input type="text" placeholder="Enter your email" name="email" onChange = {changeHandler} required/>
                    <input type="password" placeholder="Enter your password" name="password" onChange = {changeHandler} required/>
                    <button>Login</button>
                    <p>No account? <Link to = "/signuppage">Sign up</Link></p>
                </form>
                
            </div>
            <div className='login-notification'>
                <p>{notification}</p>
            </div>
        </>
    )
}

export default LoginPage;