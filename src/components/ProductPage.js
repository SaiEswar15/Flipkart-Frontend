//ProductPage.js

import React from 'react';
import "./ProductPage.css";
import { useSelector,useDispatch } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import { apiActions } from '../store/apiSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function ProductPage() {

  const productdata = useSelector((state) => state.api.productData);

  const dispatch = useDispatch();

  function addToCartHandler(productdata) {

    axios.get("http://localhost:8081/api/v1/cart/cartData")
      .then((res) => {
        console.log(res.data);
        const data = res.data;


        let matchedData = data.find((el) => {
          return productdata._id === el._id
        })

        if (matchedData === undefined || matchedData.length < 1) {

          dispatch(apiActions.addCount())

          axios.post("http://localhost:8081/api/v1/cart/post", { 
            _id: productdata._id,
            Title: productdata.Title, 
            Price: productdata.Price, 
            Quantity: 1, 
            Image: productdata.Image, 
            Category: productdata.Category 
          })
        }
        else {

          dispatch(apiActions.addCount())
          axios.patch(`http://localhost:8081/api/v1/cart/patch/${productdata._id}`)
        }
      })
  }
  
  return (
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
  )
}

export default ProductPage;