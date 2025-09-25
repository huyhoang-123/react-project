import "./assets/sass/App.css";
import { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { ShareLoginState } from "./context/regisSlice";

import Login from "./component/Login/Login";
import Todo from "./component/Todo/Todo";

const App = () => {
  const userState = useSelector(ShareLoginState);
  return (
    <>
    {userState? <Todo/>: <Login/> }
    </>
  );
};

export default App;
