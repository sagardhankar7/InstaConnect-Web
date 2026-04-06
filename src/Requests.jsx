import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "./features/requests";
import User from "./User";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchFromDb = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      console.log("Hello", res.data.data);
      const arr = res.data.data;
      //   arr.forEach((req) => {
      //     console.log(req?.fromUserId);
      //   }
      dispatch(addRequests(arr.map((req) => req?.fromUserId)));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("Called");
    fetchFromDb();
  }, []);
  return (
    <>
      {requests.map((request) => (
        <>
          {/* <h1>{request.firstName}</h1> */}
          <User user={request} />
        </>
      ))}
    </>
  );
};

export default Requests;
