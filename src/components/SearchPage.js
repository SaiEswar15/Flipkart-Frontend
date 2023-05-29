//SearchPage.js

import React from 'react'
import { useSelector } from "react-redux";
import "./SearchPage.css"
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiActions } from '../store/apiSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Navbar from './Navbar';

function SearchPage() {

  const searchData = useSelector((state) => {
    return state.api.searchData;
  })

  console.log(searchData);

  const dispatch = useDispatch();

  function productHandler(el)
  {
    dispatch(apiActions.addToProduct(el))
  }

  

  return (
    <>
    <Navbar></Navbar>
    <div className='searchpage-space'>
      {searchData.length>=1 ? <>
      <div className='searchpage-features-con'></div>
      <div className='searchpage-con'>
        
        {searchData.map((el) => {
          return (
          <Link to="/productPage" className='searchPage-link' key ={el._id}>
            <div className='searchpage-item-con' onClick = {()=>{productHandler(el)}}>
              <div className='searchPage-image-container'>
                <img src={el.Image} alt="search" />
              </div>

              <div className="searchPage-details-container">
                <div>
                  <p className="searchPage-title">{el.Title}</p>
                  <p>{el.Stars} / 5.0</p>
                  <p>{el.Ratings} Ratings</p>
                  <p>{el.Reviews} Reviews</p>
                  <p>Category : {el.Category}</p>
                  <p>Sub Category : {el.Sub_Category}</p>
                </div>

              </div>

              <div className='searchPage-cost-container'>
                <div>
                  <div>
                    <CurrencyRupeeIcon className = "currency-searchpage"/>
                    <p className="searchPage-amount">{el.Price}/-</p>
                  </div>
                  
                  <div>
                    <CurrencyRupeeIcon className = "currency-searchpage"/>
                    <p><span className="searchPage-price-strike">{el.Price*2} /-</span> ( 50% off )</p>
                  </div>
                  
                </div>

                <div>
                  <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" height="30px" alt = "assured"/>
                </div>

              </div>
            </div>
          </Link>)
        })} 

      </div>
      </> : <h1 className = "no-p-f">No Products found</h1>}
    </div>
    </>
  )
}

export default SearchPage