import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./features/user";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("sagar@gmail.com");
  const [password, setPassword] = useState("Pass@123");
  const [successMessage, setSuccessMessage] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const res = await axios.post(
      "http://localhost:7744/login",
      {
        email: email,
        password: password,
      },
      { withCredentials: true },
    );
    console.log(res);
    setSuccessMessage(res.data.message);
    dispatch(addUser(res.data.data));
    navigate("/");
  };
  return (
    <div className="flex justify-center my-5">
      {successMessage && (
        <div className="toast toast-top top-12 toast-center z-10">
          <div className="alert alert-success">
            <span>{successMessage}</span>
          </div>
          <div className="alert alert-info">
            <span>{}</span>
          </div>
        </div>
      )}
      <div className="card card-border border-4 bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Log In</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="input"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              className="input"
            />
          </fieldset>

          <div className="card-actions justify-center">
            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
