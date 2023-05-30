//Cart.js

import React from 'react'
import "./Cart.css";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import { useEffect } from 'react';
import { apiActions } from '../store/apiSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Navbar from './Navbar';
import { base_url } from './base';

function Cart() {

    const dispatch = useDispatch();

    const items = useSelector((state)=>state.api.cartData)
    const counter = useSelector((state)=>state.api.counter)
    const total = useSelector((state)=>state.api.totalPrice)
    const token = useSelector((state)=>state.auth.token)

    const cartHandler = (el)=>
    {
        axios.delete(`${base_url}/cart/delete/${el._id}`)
        .then((res=>{

            console.log("five")
            dispatch(apiActions.addCartItemsToState(res.data))
            //removecount
            //removequantity
            console.log("six")
            dispatch(apiActions.removeQuantity(el.Quantity))
            console.log("seven")
            dispatch(apiActions.removeTotal(el.Quantity*el.Price))
            
        }))

        
    }

    function addQuantityHandler(productdata) {

        
        axios.patch(`${base_url}/cart/patch/${productdata._id}`)
        .then((res=>{
            dispatch(apiActions.addCartItemsToState(res.data))
            dispatch(apiActions.addCount())
            dispatch(apiActions.updateTotal(productdata.Price))
            
        }))
        
    }

    function reduceQuantityHandler(el) {

        if (el.Quantity>1)
        {
            
            axios.patch(`${base_url}/cart/reduce/${el._id}`)
            .then((res=>{
                dispatch(apiActions.addCartItemsToState(res.data))
                dispatch(apiActions.removeQuantity(1))
                dispatch(apiActions.removeTotal(el.Price))
                
            }))
            
        }

        else
        {
            axios.delete(`${base_url}/cart/delete/${el._id}`)
            .then((res=>{
                dispatch(apiActions.addCartItemsToState(res.data))
                
                dispatch(apiActions.removeQuantity(el.Quantity))
                dispatch(apiActions.removeTotal(el.Quantity*el.Price))
            }))
            
        }
    }

    useEffect(()=>{
  
        axios.get(`${base_url}/cart/cartData`,{
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
        .then((res)=>{
        
        console.log("three")
        dispatch(apiActions.addCartItemsToState(res.data))

        let totalAmount = 0;
        
        if (res.data.length <1)
        {
            
            totalAmount = 0
        }
        else{
            
            const totalArray = res.data && res.data.map((el)=>{
                return el.Quantity*el.Price
            })
            totalAmount = totalArray.reduce((total,el)=>{
                return total+el;
            })
            
        }
        console.log("four")
        dispatch (apiActions.addTotal(totalAmount));
        
      })
      
    },[dispatch,token])

    //keep a check that i removed the dependecies [dispatch, cartHandler]
 
  return (
    <>
    <Navbar></Navbar>
    <div className = "cartpage-con">
        <div className = "cartitems-con">
            <p className='heading'>Your Items</p>
            {items && items.map((el)=>{
            return (
            <div className = "singleitem-con" key = {el._id}>
                <div className = "image-con">
                    <img src = {el.Image} alt = "product" height = "100px"/>
                </div>
                <div className = "details-con">
                    <div>
                        <p className = "p cartitems-title">{el.Title}</p>
                        
                        
                        <button className = "quantity-btn1" onClick={() => { addQuantityHandler(el) }}>+</button>
                        <span className = "p">{el.Quantity}</span>
                        <button className = "quantity-btn2" onClick={() => { reduceQuantityHandler(el) }}>-</button>
                        

                        <p className = "p cartitems-price"> <CurrencyRupeeIcon/><span>{parseInt(el.Price)}</span></p>
                        <p className = "p cartitems-total-quantity">{el.Quantity} * {el.Price} = $ {el.Quantity * parseInt(el.Price)}</p>
                        
                        <button className = "p remove-btn" onClick = {()=>{cartHandler(el)}} >Remove from cart</button>
                        
                    </div>
                </div>
            </div>
            )
        })}
            
            
        </div>
        <div className = "total-con">
            <div className = "summary" >Summary</div>
            <div className = "ti">Total items : <span className = "ti-color">{counter}</span></div>
            <div className = "ti">Total amount : <span className = "ti-color"> <CurrencyRupeeIcon/><span>{total}</span></span></div>
            <Link to = "/success"><button className = "place-order">Place your Order</button></Link>
        </div>
    </div>
    </>
  )
}

export default Cart;