import React from 'react'
import "./SignupPage.css";
import {useState} from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function SignupPage() {

    const dispatch = useDispatch();

    const Navigate = useNavigate();

    const notification = useSelector((state)=>state.auth.signupNotification)
    

    let [data, setData] = useState({

        username : "",
        email : "",
        password : "",
        confirm_password : ""
    })

    function changeHandler(e)
    {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    function signupHandler(e)
    {
        e.preventDefault();
        console.log(data);
        axios.post("http://localhost:8081/api/v1/auth/signup",data)
        .then((res)=>{
            console.log(res.data);
            dispatch(authActions.update(res.data))

            if(res.data === 'Sign up Successful')
            {
                Navigate("/loginpage")
            }
            
        })
        
    }

    
  return (<>
            <div className="signuppage-con">
                <div className="signuppage-dec">
                    <h1>Sign up</h1>
                    <p>Get access to your orders, wishlist and cart</p>
                </div>
                <form className='signuppage-form'autoComplete='off' onSubmit = {signupHandler}>
                    <input type="text" placeholder="Enter username" name="username" onChange = {changeHandler} required/>
                    <input type="email" placeholder="Enter your email" name="email" onChange = {changeHandler} required/>
                    <input type="password" placeholder="Enter your password" name="password" onChange = {changeHandler} required/>
                    <input type="password" placeholder="confirm your password" name="confirm_password" onChange = {changeHandler} required/>
                    <button>Sign up</button>
                    
                </form>
            </div>
            <div className='signup-notification'>
                <p>{notification}</p>
            </div>
            
        </>
  )
}

export default SignupPage;