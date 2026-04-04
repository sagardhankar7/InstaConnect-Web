import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("login button is pressed");
  };
  return (
    <div className="flex justify-center my-5">
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
