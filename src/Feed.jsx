import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./utils/constants";
import User from "./User";

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
        <User user={user} />
      ))}
    </>
  );
};

export default Feed;
