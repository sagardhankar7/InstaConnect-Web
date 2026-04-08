import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./utils/constants";
import { useSelector } from "react-redux";
import Friend from "./Friend";
import { Link } from "react-router";

const Connections = () => {
  const user = useSelector((store) => store.user);
  const [friend, setFriend] = useState([]);
  const handleConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    // console.log(res.data);
    const arr = res.data.data;
    const friends = [];
    console.log(user);
    arr.forEach((conn) => {
      if (user._id != conn.fromUserId?._id) friends.push(conn.fromUserId);
      else friends.push(conn.toUserId);
    });
    console.log("Friends", friends);
    setFriend(friends);
  };

  useEffect(() => {
    handleConnections();
  }, [user]);
  return (
    <>
      <h1 className="font-bold text-2xl text-center">Connections</h1>
      <div className="flex flex-wrap">
        {friend.map((fin) => (
          <Link to={"/connection/" + fin._id}>
            <Friend user={fin} key={fin._id} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Connections;
