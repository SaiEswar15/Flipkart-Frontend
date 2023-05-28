//Cart.js

import React from 'react'
import "./Cart.css";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import { useEffect } from 'react';
import { apiActions } from '../store/apiSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function Cart() {

    const dispatch = useDispatch();
    
    const items = useSelector((state)=>{
        console.log("items",state.api.cartData)
        return state.api.cartData
    })

    const total = useSelector((state)=>{
       
        return state.api.totalPrice;
    })

    const counter = useSelector((state)=>{
        return state.api.counter;
    })

    const cartHandler = (el)=>
    {
        axios.delete(`http://localhost:8081/api/v1/cart/delete/${el._id}`);

        dispatch(apiActions.removeQuantity(el.Quantity))
    }

    function addQuantityHandler(productdata) {

        dispatch(apiActions.addCount())
        axios.patch(`http://localhost:8081/api/v1/cart/patch/${productdata._id}`)

    }

    function reduceQuantityHandler(el) {

        if (el.Quantity>1)
        {
            dispatch(apiActions.reduceCount())
            axios.patch(`http://localhost:8081/api/v1/cart/reduce/${el._id}`)
        }

        else
        {
            axios.delete(`http://localhost:8081/api/v1/cart/delete/${el._id}`);
            dispatch(apiActions.removeQuantity(el.Quantity))
        }
    }

    useEffect(()=>{
      axios.get("http://localhost:8081/api/v1/cart/cartData")
      .then((res)=>{
        
        console.log("axios",res.data);
        dispatch(apiActions.addCartItemsToState(res.data))

        let totalAmount = 0;
        if (res.data <1)
        {
            totalAmount = 0
            console.log("ifnot",totalAmount);
        }
        else{
            const totalArray = res.data.map((el)=>{
                return el.Quantity*el.Price
            })
            console.log("array",totalArray)
            totalAmount = totalArray.reduce((total,el)=>{
                return total+el;
            })
            console.log("total",totalAmount)
        }
        
        dispatch (apiActions.addTotal(totalAmount));
      })
    },[dispatch,counter])

    //keep a check that i removed the dependecies [dispatch, cartHandler]
 
  return (
    <div className = "cartpage-con">
        <div className = "cartitems-con">
            <p className='heading'>Your Items</p>
            {items ? <>{items.map((el)=>{
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
                        
                        <button className = "p remove-btn" onClick = {()=>{cartHandler(el)}}>Remove from cart</button>
                        
                    </div>
                </div>
            </div>
            )
        })}</> : null}
            
            
        </div>
        <div className = "total-con">
            <div className = "summary" >Summary</div>
            <div className = "ti">Total items : <span className = "ti-color">{counter}</span></div>
            <div className = "ti">Total amount : <span className = "ti-color"> <CurrencyRupeeIcon/><span>{total}</span></span></div>
            <Link to = "/success"><button className = "place-order">Place your Order</button></Link>
        </div>
    </div>
  )
}

export default Cart;