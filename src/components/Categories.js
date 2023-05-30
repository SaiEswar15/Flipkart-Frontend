//Categories.js

import React from 'react'
import "./Categories.css"
import {useEffect} from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { categoryActions } from '../store/categorySlice';
import { apiActions } from '../store/apiSlice';
import { useNavigate } from 'react-router-dom';
import { base_url } from './base';

function Categories() {

    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const {categoryData} = useSelector((state)=>{
        return state.category
    })

    const token = useSelector((state)=>{
        return state.auth.token;
    })

    useEffect(()=>{

        axios.get(`${base_url}/categories/`,{
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
        .then((res)=>{
            // console.log(res.data)
            if (res.data === 'Token Not found')
            {
                Navigate("/loginpage")
            }
            else
            {
                dispatch(categoryActions.addData(res.data))
            }
            
        })

    },[dispatch,Navigate,token])

    function categoryHandler(el)
    {
        if (el.category === "Appliances")
        {
            let category1 = "Kitchen Appliances"
            let category2 = "Small Home Appliances"
            axios.get(`${base_url}/products/searchBySubCategory?category1=${category1}&category2=${category2}`,{
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
                    console.log(res.data);
                    dispatch(apiActions.decrement(res.data))
                    Navigate("/searchpage")
                }
                
            })
        }

        if (el.category === "Mobiles" || el.category === "Electronics")
        {
            axios.get(`${base_url}/products/?category=${el.category}`,{
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
                    console.log(res.data);
                    dispatch(apiActions.decrement(res.data))
                    Navigate("/searchpage")
                }
                
            })
        }

        if (el.category === "Fashion")
        {
            let category1 = "Clothing"
            
            axios.get(`${base_url}/products/?category=${category1}`,{
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
                    console.log(res.data);
                    dispatch(apiActions.decrement(res.data))
                    Navigate("/searchpage")
                }
                
            })
        }

        if (el.category === "Top Offers")
        {
            axios.get(`${base_url}/products/searchBySingle`,{
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
                    console.log(res.data);
                    dispatch(apiActions.decrement(res.data))
                    Navigate("/searchpage")
                }
                
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