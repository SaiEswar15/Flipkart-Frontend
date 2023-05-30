//ProductPage.js

import React from 'react';
import "./ProductPage.css";
import { useSelector,useDispatch } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import { apiActions } from '../store/apiSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Navbar from './Navbar';
import { base_url } from './base';



function ProductPage() {

  const productdata = useSelector((state) => state.api.productData);
  const token= useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  

  function addToCartHandler(productdata) {

    axios.get(`${base_url}/cart/cartData`,{
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => {
        console.log("three")
        dispatch(apiActions.addCartItemsToState(res.data))
        let dataToCalculate = res.data;

        let matchedData = dataToCalculate.find((el) => {
          return productdata._id === el._id
        })

        if (matchedData === undefined || matchedData.length < 1) {

          dispatch(apiActions.addCount())

          axios.post(`${base_url}/cart/post`, { 
            _id: productdata._id,
            Title: productdata.Title, 
            Price: productdata.Price, 
            Quantity: 1, 
            Image: productdata.Image, 
            Category: productdata.Category 
          })
          .then((res)=>{
            dispatch(apiActions.addCartItemsToState(res.data))
          })
        }
        else {

          dispatch(apiActions.addCount())
          axios.patch(`${base_url}/cart/patch/${productdata._id}`)
          .then((res)=>{
            dispatch(apiActions.addCartItemsToState(res.data))
          })
          
        }
      })
  }

  
  
  return (
    <>
    <Navbar></Navbar>
    <div className="product-page-con">

      <div className='product-image-con'>
        <div className="image-holder">
          <img src={productdata.Image} alt="product-pic" className="product-picture"></img>
        </div>
        <div className="image-below-buttons">
          <button className="addtocart-btn" onClick={() => { addToCartHandler(productdata) }}>Add to cart</button>
          <button className='addtowishlist-btn'>Add to wishlist</button>
        </div>
      </div>

      <div className="product-details-con">
        <div className='product-details-main'>
          <p className="product-nav">Home / Products / {productdata.Category}</p>
          <p className="product-title">{productdata.Title}</p>
          <p className="product-cat">Category : <span className="product-cat-span">{productdata.Category.toUpperCase()}</span></p>
          <p className="product-desc">{productdata.Description}</p>
          <p className="product-rating">
            <span className='product-rating-rate'>{productdata.Stars}<StarIcon className="starIcon"></StarIcon></span><span>  </span>/5.0 rating
          </p>
          <p className="product-price-para"><span className="product-price"><CurrencyRupeeIcon/><span>{productdata.Price}</span></span><span></span>/ <span className="strike">{productdata.Price * 2}</span><span className="off">(50% off)</span></p>

        </div>
      </div>
    </div>
    </>
  )
}

export default ProductPage;