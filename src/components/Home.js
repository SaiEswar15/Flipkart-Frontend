//home.js

import React from 'react'
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { apiActions } from '../store/apiSlice';
import Footer from './Footer';
import MainFooter from './MainFooter';
import "./Home.css";
import {Link} from "react-router-dom";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Categories from './Categories';
import CarouselHome from './CarouselHome';
import CarouselProducts from './CarouselProducts';
import CarouselProducts2 from './CarouselProducts2';
import { useNavigate } from "react-router-dom"
import Navbar from './Navbar';

function Home() {

    const apiData = useSelector((state) => {
      return state.api.apiData;
    })

    
    const Navigate = useNavigate();

    const token = useSelector((state)=>{
        return state.auth.token;
    })

    const dispatch = useDispatch();

    

    useEffect(() => {

        axios.get("http://localhost:8081/api/v1/items/",{
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
            .then((res) => {
              if (res.data === 'Token Not found')
            {
                Navigate("/loginpage")
            }
            else
            {
              dispatch(apiActions.increment(res.data))
            }
              
            })

    }, [dispatch,Navigate,token])

    function productHandler(el)
    {
      dispatch(apiActions.addToProduct(el))
    }

    function addToCartHandler(productdata) {

        axios.get("http://localhost:8081/api/v1/cart/cartData")
          .then((res) => {
            // console.log(res.data);
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
        <>
            <Navbar></Navbar>
            <Categories></Categories>
            <CarouselHome showStatus = "false"></CarouselHome>
            <CarouselProducts></CarouselProducts>
            <CarouselProducts2></CarouselProducts2>
            <p className='recommended'>Recommended to you </p>
            <div className="home-con">
                {apiData.map((el) => {
                    return (

                        <div className="product-storage" key={el._id} onClick = {()=>{productHandler(el)}}>
                            <Link to="/productPage" className='link'>
                                <div className="product-con"  >
                                    <p className="title">{el.Title}</p>
                                    <div className="center">
                                        <img src={el.Image} alt="p" className="pic" height="100px" />
                                        <p className="price"><CurrencyRupeeIcon className = "homerupee"></CurrencyRupeeIcon><span className = "price-span">{el.Price}</span></p>
                                    </div>
                                </div>
                            </Link>
                            <button className="btn" onClick={() => { addToCartHandler(el) }}>Add to Cart</button>
                        </div>

                    )
                })}
            </div>

            <Footer></Footer>
            <MainFooter></MainFooter>
        </>
    )
}

export default Home