import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "./features/user";

const Body = () => {
  const dispatch = useDispatch();
  const handleReload = async () => {
    const res = await axios.get(BASE_URL + "/profile/view", {
      withCredentials: true,
    });
    console.log(res);
    dispatch(addUser(res.data));
  };
  handleReload();

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
