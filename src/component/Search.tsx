import { useState,useEffect, useReducer} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement,increaseByAmount, reset} from '../context/counterSlice';
import { sharedAllAction } from '../context/counterSlice';
import PostList from './post/PostList.tsx';
const Search = () => {
const count = useSelector(sharedAllAction);
const dispatch = useDispatch();
const [amountValue, setAmountValue]=useState(0);
let addValue:number = Number(amountValue)|| 0;



return(
<div>
      <PostList/>
</div>
    
)
};


export default Search;