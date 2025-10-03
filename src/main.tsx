import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  NavLink,
} from "react-router-dom";
import { store } from "./state/Store.ts";
import { Provider } from "react-redux";
import Login from "./component/Login/Login.tsx";
import Todo from "./component/Todo/Todo.tsx";
import Register from "./component/Register/Register.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
         
          
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
