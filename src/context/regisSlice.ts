import { createSlice } from "@reduxjs/toolkit";

type initStateType={
    isLogin: boolean
}

const initLoginState: initStateType={
    isLogin : false
}

export const regisSlice = createSlice({
    name: "Login",
    initialState: initLoginState,
    reducers:{
        hasLogin(state){
            state.isLogin = true
        },
        hasNotLogin(state){
            state.isLogin=false;
        }
    }
})

export const ShareLoginState= (state:any)=>state.regis.isLogin;
export const {hasLogin, hasNotLogin}= regisSlice.actions;
export default regisSlice.reducer;