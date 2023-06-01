// import React from 'react'
// import "./OrdersPage.css"
// import axios from "axios";
// import { useEffect } from 'react';
// import { base_url } from './base';
// import { useSelector,useDispatch } from 'react-redux';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import {apiActions} from "../store/apiSlice";
// import Navbar from './Navbar';

// function OrdersPage() {

//     const items = useSelector((state)=>state.api.ordersPlacedData)
//     console.log("orderplaced items",items);
//     const token = useSelector((state)=>state.auth.token)
//     const dispatch = useDispatch();

//     useEffect(()=>{
  
//         axios.get(`${base_url}/orders/ordersData`,{
//             headers: {
//               'Authorization': 'Bearer ' + token
//             }
//           })
//         .then((res)=>{
        
//         console.log("three")
//         dispatch(apiActions.addOrderedProducts(res.data))
        
//       })
      
//     },[dispatch,token])

//   return (
//     <>
//         <Navbar></Navbar>
//         <div className = "orderspage-con">
//             <div className = "orders-con">
//                 <p className='orders-heading'>Your Orders</p>
//                 {items && items.map((el)=>{
//                 return (
//                 <div className = "orders-singleitem-con" key = {el._id}>
//                     <div className = "orders-image-con">
//                         <img src = {el.Image} alt = "product" height = "100px"/>
//                     </div>
//                     <div className = "orders-details-con">
//                         <div>
//                             <p className = "p orders-title">{el.Title}</p>
                            
//                             <p className = "p orders-placedat">Ordered on : {el.Ordered_At}</p>

//                             <p className = "p orders-quantity">Quantity : {el.Quantity}</p>

//                             <p className = "p orders-category">Category : {el.Category}</p>

//                             <p className = "p orders-price"> <CurrencyRupeeIcon/><span>{parseInt(el.Price)}</span></p>
  
//                         </div>
//                     </div>
//                 </div>
//                 )
//             })}
                
                
//             </div>
            
//         </div>
//     </>
//   )
// }

// export default OrdersPage