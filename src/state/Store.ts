import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../context/counterSlice.ts";
import postReducer from "../context/postSlice.ts"


export const store = configureStore({
    reducer :{
        counter: counterReducer,
        posts: postReducer
    }
});

// // Suy luận các type từ store
// export type RootState = ReturnType<typeof store.getState>
// // Kiểu được suy luận: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
// export type AppStore = typeof store