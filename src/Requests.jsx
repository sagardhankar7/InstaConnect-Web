import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "./features/requests";
import User from "./User";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [noPendingAcknoledge, setNoPendingAcknoledge] = useState(false);
  const fetchFromDb = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      console.log("Hello", res.data.data);
      const arr = res.data.data;
      if (arr.length === 0) setNoPendingAcknoledge(true);
      //   arr.forEach((req) => {
      //     console.log(req?.fromUserId);
      //   }
      dispatch(addRequests(arr));
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewRequest = async (reviewStatus, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + reviewStatus + "/" + requestId,
        {},
        { withCredentials: true },
      );
      if (reviewStatus == "accepted" || reviewStatus == "rejected") {
        dispatch(removeRequest(requestId));
      }

      console.log(res);
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
      <ul className="list bg-base-100 rounded-box shadow-md">
        <h1 className="text-2xl font-bold text-center">Requests</h1>
        {noPendingAcknoledge && <h2>No Pending request</h2>}
        {requests.map((request) => (
          <li className="list-row">
            <div>
              <img
                className="size-10 rounded-box"
                alt="IMG"
                src={request?.fromUserId?.photoUrl}
              />
            </div>
            <div>
              <div>
                {request?.fromUserId?.firstName} {request?.fromUserId?.lastName}
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {request?.fromUserId?.skills.map((skill) => (
                  <p className="inline">{skill} </p>
                ))}
              </div>
            </div>
            <p className="list-col-wrap text-xs">
              {request?.fromUserId?.about}
            </p>
            <button
              className="btn btn-ghost"
              onClick={() => handleReviewRequest("accepted", request?._id)}
            >
              Accept
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => handleReviewRequest("rejected", request?._id)}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Requests;
