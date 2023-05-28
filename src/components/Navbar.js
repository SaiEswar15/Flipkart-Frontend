//Navbar.js

import React,{useEffect} from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import "./Navbar.css";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import { apiActions } from '../store/apiSlice';



function Navbar() {

    const Navigate = useNavigate();

    const searchData = useSelector((state)=>{
        return state.api.searchData;
    })

    const counter = useSelector((state)=>{
        return state.api.counter;
    })

    const loggedin = useSelector((state)=>{
        console.log(state.auth.loggedin)
        return state.auth.loggedin;
    })

    // const cartData = useSelector((state)=>{
    //     return state.api.cartData;
    // })

    const dispatch = useDispatch();

    useEffect(()=>{
        axios.get("http://localhost:8081/api/v1/cart/cartData")
        .then((res)=>
        {
            const data = res.data;
            // console.log(data);

            let quantity = 0;
            if (data.length<1)
            {
                quantity = 0;
            }
            else
            {
                const quanArray = data.map((el)=>{
                    return el.Quantity;
                })
                // console.log(quanArray)
                quantity = quanArray.reduce((total,el)=>{
                    return total+el;
                })
            }
            
            // console.log(quantity);
            dispatch(apiActions.postCounter(quantity))
        })
    },[dispatch])
    

    function submitHandler(e)
    {
        e.preventDefault();
        
        const data = new FormData(e.target);
        const input = data.get("search");
        console.log(input);
        
        axios.get(`http://localhost:8081/api/v1/products/?category=${input}`)
        .then((res)=>{
            dispatch(apiActions.decrement(res.data))
        })

        console.log(searchData);
        Navigate("/searchpage");
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
        
        <div className = "login-con">
                <button >Logout</button>
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