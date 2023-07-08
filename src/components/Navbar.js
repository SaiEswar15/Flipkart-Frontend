//Navbar.js

import React, {useEffect} from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import "./Navbar.css";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import  { apiActions } from '../store/apiSlice';
import { authActions } from '../store/authSlice';
import { base_url } from './base';


function Navbar() {

    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state)=>state.auth.token)
    console.log("token", token)
    // if (token === "")
    // {
    //     Navigate("/loginPage");
    // }
    const searchData = useSelector((state)=>state.api.searchData)
    const counter = useSelector((state)=>state.api.counter)
    const loggedin = useSelector((state)=>state.auth.loggedin)
    // const items = useSelector((state)=>state.api.cartData)
    const change = useSelector((state)=>state.auth.mouseover)
    

    useEffect(()=>{

        if(!loggedin)
        {
            console.log("login",loggedin)
            Navigate("/loginpage")
        }

        console.log("token before middleware",token)
        axios.get(`${base_url}/cart/cartData`,{
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
        .then((res)=>
        {
            // console.log("one")
            // dispatch(apiActions.addCartItemsToState(res.data))
            // console.log("token after middleware",items)
            if (res.data === 'Token Not found')
            {
                Navigate("/loginpage")
            }
            else
            {
                
                dispatch(apiActions.addCartItemsToState(res.data))
                

                let quantity = 0;
                if (res.data.length<1)
                {
                    quantity = 0;
                }
                else
                {
                    const quanArray = res.data && res.data.map((el)=>{
                        return el.Quantity;
                    })
                    // console.log(quanArray)
                    quantity = quanArray.reduce((total,el)=>{
                        return total+el;
                    })
                }
              
                dispatch(apiActions.postCounter(quantity))
            }
            
        })
    },[dispatch,token,Navigate,loggedin])

    function logoutHandler()
    {
        dispatch(authActions.updateToken(""))
    }
    

    function submitHandler(e)
    {
        e.preventDefault();
        
        const data = new FormData(e.target);
        const input = data.get("search");
        console.log(input);
        
        axios.get(`${base_url}/products/?category=${input}`,{
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
        .then((res)=>{
            
            if (res.data === 'Token Not found')
            {
                Navigate("/loginpage")
            }
            else
            {
                dispatch(apiActions.decrement(res.data))
                console.log(searchData);
                Navigate("/searchpage");
            }
            
        }) 
    }

    function mouseover()
    {
        dispatch(authActions.changeMouseover("block"))
    }

    function mouseout()
    {
        dispatch(authActions.changeMouseover("none"))
    }

    let styling1 = {
        display : change
    }
  return (
  <>
    <div className = "nav-container">
        <Link to = "/">
            <div className = "logo-con">
                <img src = "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt = "logo"/>
            </div>
        </Link>

            <div className = "search-con">
                <form onSubmit = {submitHandler}>
                    <input type = "text" className = "search-con-input" name = "search" placeholder = "Search for products, brands and more"/>
                    <button className = "search-con-button"><SearchIcon className = "search-icon"/></button>
                </form>
                
            </div>
        {loggedin ?
        
        <div className='navbar-dropdown' onMouseOver={mouseover} onMouseOut={mouseout}>
            <div className = "login-con">
                <button onClick = {logoutHandler}>Logout</button>
            </div>

            <div className='navbar-auth-dropdown'style = {styling1}>
                {/* <Link to="/orders">
                    <button className='navbar-auth-dropdown-button'>Your Orders</button>
                </Link> */}
                <Link to="/wishlist">
                    <button className='navbar-auth-dropdown-button'>Your Wishlist</button>
                </Link>
                
            </div>
        </div>
        
        
        :
        <Link to="/loginpage">
            <div className = "login-con">
                <button >Login</button>
            </div>
        </Link>
        
        }

        

        <Link to ="/cart" className = "link">
            <div className = "cart-con">
                <span><ShoppingCartIcon className = "scart"/></span><span className = "counter">{counter}</span>
            </div>
        </Link>
    </div>
    
  </>)
}

export default Navbar