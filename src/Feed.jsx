import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./utils/constants";

const Feed = () => {
  const [data, setData] = useState([]);

  const handleFeed = async () => {
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
    console.log(res.data);
    console.log(Array.isArray(res.data));
    setData(res.data);
  };
  useEffect(() => {
    handleFeed();
  }, []);

  return (
    <>
      {data.map((user) => (
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure className="px-10 pt-10">
            <img src={user.photoUrl} alt="user" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">
              {user.firstName} {user.lastName}
            </h2>
            <p>{user.about}</p>
            <div className="card-actions">
              <button className="btn btn-primary">Like</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Feed;
