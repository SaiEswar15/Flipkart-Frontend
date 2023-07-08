import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "authData",
    initialState : {
        signupNotification : "",
        signupNotificationColor : "",
        loginNotification : "",
        token : "",
        loggedin : false,
        username : "guest",
        mouseover : "none"
    },
    reducers : {

        update(state,action)
        {
            return {
                ...state,
                signupNotification : action.payload
            }
        },
        updateColor(state,action)
        {
            return {
                ...state,
                signupNotificationColor : action.payload
            }
        },
        updateLogin(state,action)
        {
            return {
                ...state,
                loginNotification : action.payload
            }
        },
        updateToken(state,action)
        {
            return {
                ...state,
                token : action.payload
            }
        },
        status(state,action)
        {
            return {
                ...state,
                loggedin : action.payload
            }
        },
        updateUsername(state,action)
        {
            return {
                ...state,
                token : action.payload
            }
        },
        changeMouseover(state,action)
        {
            return {
                ...state,
                mouseover : action.payload
            }
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice;