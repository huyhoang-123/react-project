import { createSlice } from "@reduxjs/toolkit";

type initCounterState= {
    count: number
}

const initCounter:initCounterState={
    count:0
};

export const counterSlice = createSlice({
    name:'counter',
    initialState: initCounter,
    reducers:{
        increment:(state)=>{
            state.count+=1;

        },
        decrement:(state)=>{
            state.count-=1;

        },
        increaseByAmount:(state, action)=>{
            state.count+= action.payload;

        },
        reset:(state)=>{
            state.count=0;

        }
    }

});
export const sharedAllAction = (state:any)=> state.counter.count;
 export const {increment,decrement,increaseByAmount,reset}= counterSlice.actions;
 export default counterSlice.reducer;