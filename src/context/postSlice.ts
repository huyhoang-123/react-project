import { createSlice } from "@reduxjs/toolkit";

const initialState =[
    {
        id:'nodejs', title:"hello redux", content:'this is Redux'
    },
     {
        id:'reactjs', title:"hello redux toolkit", content:'this is Redux toolkit'
    }
] 

export const postSLice = createSlice({
    name: 'post',
    initialState,
    reducers:{}
 })

  export const sharedAllPost = (state:any)=> state.posts;
  export default postSLice.reducer;