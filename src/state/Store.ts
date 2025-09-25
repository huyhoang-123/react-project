import { configureStore } from '@reduxjs/toolkit'
import regisReducer from "../context/regisSlice";
import authReducer from "../context/authSlice"
import todoReducer, { todoSlice } from "../context/todoSlice"

export const store = configureStore({
    reducer :{
        auth: authReducer,
        regis: regisReducer,
        todo: todoReducer
     
        
    },
  
});

// // Suy luận các type từ store
export type RootState = ReturnType<typeof store.getState>
// // Kiểu được suy luận: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// export type AppStore = typeof store