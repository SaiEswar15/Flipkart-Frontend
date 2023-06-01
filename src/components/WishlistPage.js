import React from 'react'
import axios from "axios";
import { useEffect } from 'react';
import {useSelector , useDispatch} from "react-redux";
import Navbar from './Navbar';
import { apiActions } from '../store/apiSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { base_url } from './base';
import "./WishlistPage.css";

function WishlistPage() {

    const items = useSelector((state)=>state.api.ordersData)
    const token = useSelector((state)=>state.auth.token)

    const dispatch = useDispatch()

    useEffect(()=>{
  
        axios.get(`${base_url}/wishlist/wishlistData`,{
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
        .then((res)=>{
        
        console.log("three")
        dispatch(apiActions.addOrdersItemsToState(res.data))
        
      })
      
    },[dispatch,token])

    const cartHandler = (el)=>
    {
        axios.delete(`${base_url}/wishlist/delete/${el._id}`)
        .then((res=>{

            console.log("five")
            dispatch(apiActions.addOrdersItemsToState(res.data))
            
            
        }))

        
    }

  return (
    <>
    <Navbar></Navbar>
    <div className = "wishlistpage-con">
        <div className = "wishlist-con">
            <p className='wishlist-heading'>Your Wishlist</p>
            {items && items.map((el)=>{
            return (
            <div className = "wishlist-singleitem-con" key = {el._id}>
                <div className = "wishlist-image-con">
                    <img src = {el.Image} alt = "product" height = "100px"/>
                </div>
                <div className = "wishlist-details-con">
                    <div>
                        <p className = "p wishlist-title">{el.Title}</p>
                        
                    
                        

                        <p className = "p wishlist-price"> <CurrencyRupeeIcon/><span>{parseInt(el.Price)}</span></p>
                        
                        
                        <button className = "p wishlist-remove-btn" onClick = {()=>{cartHandler(el)}} >Remove from Wishlist</button>
                        
                    </div>
                </div>
            </div>
            )
        })}
            
            
        </div>
        
    </div>
    </>
  )
}

export default WishlistPage