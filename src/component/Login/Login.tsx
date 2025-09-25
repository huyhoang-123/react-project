import React, { useState } from "react";
import "./Login.css";
import { hasLogin, hasNotLogin } from "../../context/regisSlice";
import { loginUser } from "../../context/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { loading, error } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<any>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await dispatch(loginUser({ username, password }));
      setUsername("");
      setPassword("");
      dispatch(hasLogin());
    } catch {
      console.log("error");
    }
  };

  return (
    <section className="form-validation-page">
      <div className="form-validation">
        <div className="login-form  form-validation--layout">
          <h2 className="form-title">Login</h2>
          <form action="#" name="login" onSubmit={handleSubmit}>
            <div className="form-validation__field-box">
              <label htmlFor="email">User Name</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-validation__input"
                type="User"
                name="User"
                placeholder="Enter your User name"
              />
            </div>
            <div className="form-validation__field-box">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-validation__input"
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </div>
            <button
              
              className="form-validation__button"
              type="submit"
              disabled={loading}
            >
               {loading ? "Logging in..." : "Login Now"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
