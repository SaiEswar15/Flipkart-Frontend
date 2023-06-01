import React from 'react'
import "./Success.css";
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import Navbar from "./Navbar";

function Success() {

    const Navigate = useNavigate();

    const token = useSelector((state)=>{
        return state.auth.token;
    })

    if (token === "")
    {
        Navigate("/loginPage");
    }

    function clickHandler()
    {
      Navigate("/");
    }

  return (
    <>
      <Navbar></Navbar>
      <div className='successpage-con'>
        <p>Order placed Successfully...</p>
        <img src = "https://media.tenor.com/BSY1qTH8g-oAAAAC/check.gif" alt = "gigf" height = "200px"/>
        <button className='successpage-btn'onClick = {clickHandler}>Continue Shopping</button>
      </div>
      
    </>
    
  )
}

export default Success