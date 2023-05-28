//Categories.js

import React from 'react'
import "./Categories.css"
import {useEffect} from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { categoryActions } from '../store/categorySlice';
import { apiActions } from '../store/apiSlice';
import { useNavigate } from 'react-router-dom';

function Categories() {

    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const {categoryData} = useSelector((state)=>{
        return state.category
    })

    useEffect(()=>{

        axios.get("http://localhost:8081/api/v1/categories/")
        .then((res)=>{
            // console.log(res.data)
            
            dispatch(categoryActions.addData(res.data))
        })

    },[dispatch])

    function categoryHandler(el)
    {
        if (el.category === "Appliances")
        {
            let category1 = "Kitchen Appliances"
            let category2 = "Small Home Appliances"
            axios.get(`http://localhost:8081/api/v1/products/searchBySubCategory?category1=${category1}&category2=${category2}`)
            .then((res)=>{
                console.log(res.data);
                dispatch(apiActions.decrement(res.data))
                Navigate("/searchpage")
            })
        }

        if (el.category === "Mobiles" || el.category === "Electronics")
        {
            axios.get(`http://localhost:8081/api/v1/products/?category=${el.category}`)
            .then((res)=>{
                console.log(res.data);
                dispatch(apiActions.decrement(res.data))
                Navigate("/searchpage")
            })
        }

        if (el.category === "Fashion")
        {
            let category1 = "Clothing"
            
            axios.get(`http://localhost:8081/api/v1/products/?category=${category1}`)
            .then((res)=>{
                console.log(res.data);
                dispatch(apiActions.decrement(res.data))
                Navigate("/searchpage")
            })
        }

        if (el.category === "Top Offers")
        {
            axios.get(`http://localhost:8081/api/v1/products/searchBySingle`)
            .then((res)=>{
                console.log(res.data);
                dispatch(apiActions.decrement(res.data))
                Navigate("/searchpage")
            })
        }
        
    }

    return (
        <div className='cat-con'>
            <ul>
                {categoryData.map((el)=>{
                    return <li key = {el._id} >
                        <div onClick={()=>{categoryHandler(el)}}>
                            <div><img src = {el.image} alt = "category-images" height = "80px"/></div>
                            <div>{el.category}</div>
                        </div>
                        
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Categories