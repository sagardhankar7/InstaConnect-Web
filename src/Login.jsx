import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./features/user";
import { useNavigate } from "react-router";
import { BASE_URL } from "./utils/constants";
import store from "./app/store";

const Login = () => {
  const [email, setEmail] = useState("sagar@gmail.com");
  const [password, setPassword] = useState("Pass@123");
  const [successMessage, setSuccessMessage] = useState();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
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
    } catch (err) {
      console.log(err.response.data);
      setError(err?.response?.data);
    }
  };
  return user ? (
    "You are already Signed in"
  ) : (
    <div className="flex justify-center my-5">
      {successMessage && (
        <div className="toast toast-top top-12 toast-center z-10">
          <div className="alert alert-success">
            <span>{successMessage}</span>
          </div>
        </div>
      )}
      {error && (
        <div className="toast toast-top top-12 toast-center z-10">
          <div className="alert alert-error">
            <span>{error}</span>
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
