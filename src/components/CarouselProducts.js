//CarouselProducts.js

import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./CarouselProducts.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useDispatch} from "react-redux";
import { apiActions } from '../store/apiSlice';

function CarouselProducts() {

    const token = useSelector((state)=>{
        return state.auth.token;
    })
    
    const apiData = useSelector((state) => {
        return state.api.apiData;
    })

    const Navigate = useNavigate();

    const dispatch = useDispatch();

    const responsive =
    {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    function isDuplicate(obj, index, array) {
        return (

          index ===
          array.findIndex(
            (el) => el.Sub_Category === obj.Sub_Category && el.Category === obj.Category
          )
        );
      }

      
      var onlyElectronics = apiData.filter((el)=>{
        return el.Sub_Category === "Electronics";
      });
      
      
      var uniqueElectronicsItems = onlyElectronics.filter(isDuplicate);
      
    //   console.log("uniqueElectonicsItems", uniqueElectronicsItems);

    

    function productHandler(el)
    {
        axios.get(`http://localhost:8081/api/v1/products/?category=${el.Category}`,{
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
                Navigate("/searchpage");
            }
            
        })
        
    }

    function viewAllElectronics()
    {
        console.log("hai")
        axios.get(`http://localhost:8081/api/v1/products/searchBySingle/?category1=Electronics`,{
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
                Navigate("/searchpage");
            }
            
        })
        
    }

    return (

        <div className = "carousal-container1">
            <div className = "carousal-block1">
                <img src = "https://rukminim1.flixcart.com/fk-p-flap/278/278/image/7593e7b6640822c1.jpg?q=90" alt = "design"/>
                <div className = "carousal-block1-buttons">
                    <p>Best of Electronics</p>
                    <button onClick = {viewAllElectronics}>View All</button>
                </div>
            </div>

            <Carousel className = "carousel-container" responsive={responsive} >
                {uniqueElectronicsItems.map((el) => {
                    return <div className = "carousel-product-container" key = {el._id} onClick = {()=>{productHandler(el)}}>
                        
                        <div className='carousel-image-container'>
                            <img src = {el.Image} alt = "electronics" width = "100px"/>
                        </div>
                        <div className='carousel-title-container'>{el.Category}</div>
                        <div className='carousel-price-container'>starts from {el.Price}/-</div>
                        
                    </div>
                })}
                             
            </Carousel >

            <div className = "carousal-block2">
                <img src = "https://rukminim1.flixcart.com/fk-p-flap/464/708/image/bcc1ec9f76573b9f.jpg?q=70" alt = "ads"/>
            </div>
        </div>

        

    )
}

export default CarouselProducts