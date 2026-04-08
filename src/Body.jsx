import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./features/user";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleReload = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log("Reload", res);
      dispatch(addUser(res.data));
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };

  //   It will be called on every page reload (becoz it is parent of all component)
  useEffect(() => {
    if (!user) handleReload();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
