import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name : "categoryData",
    initialState : {
        categoryData : []
    },
    reducers : {

        addData(state,action)
        {
            return {
                ...state,
                categoryData : action.payload
            }
        }
    }
})

export const categoryActions = categorySlice.actions;

export default categorySlice;