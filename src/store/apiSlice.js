import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
    name : "apiData",
    initialState : {
        apiData : [],
        searchData : [],
        productData: {},
        cartData : [],
        totalPrice : 0,
        counter : 0
    },
    reducers : {

        increment(state,action)
        {
            return {
                ...state,
                apiData : action.payload
            }
        },

        decrement(state,action)
        {
            return {
                ...state,
                searchData : action.payload
            }
        },

        addToProduct(state,action)
        {
            return {
                ...state,
                productData : action.payload
            }
        },

        addCartItemsToState(state,action)
        {
            return {
                ...state,
                cartData : action.payload
            }
        },

        addCount (state,action)
        {
            return {
                ...state,
                counter : state.counter+1
            }
        },

        reduceCount (state,action)
        {
            return {
                ...state,
                counter : state.counter-1
            }
        },

        postCounter (state,action)
        {
            return {
                ...state,
                counter : action.payload
            }
        },

        addTotal (state,action)
        {
            return {
                ...state,
                totalPrice :action.payload
            }
        },

        removeQuantity(state,action)
        {
            return {
                ...state,
                counter : state.counter-action.payload
            }
        }
    }
})

export const apiActions = apiSlice.actions;

export default apiSlice;