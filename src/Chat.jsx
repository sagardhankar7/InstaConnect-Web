import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "./utils/constants";
import { useSelector } from "react-redux";
import store from "./app/store";

const Chat = () => {
  const { userId } = useParams();
  const user = useSelector((store) => store.user);
  const [chatMsg, setChatMsg] = useState([]);
  const fetchMessages = async () => {
    try {
      const res = await axios.get(BASE_URL + "/msg/" + userId, {
        withCredentials: true,
      });
      //   console.log(user);

      console.log(res?.data);
      setChatMsg(res?.data);
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <div>
      {chatMsg.map((chat) => (
        <>
          <div
            className={
              chat.toUserId._id.toString() === user._id.toString()
                ? "chat chat-start"
                : "chat chat-end"
            }
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={chat.fromUserId.photoUrl}
                />
              </div>
            </div>
            <div className="chat-bubble">{chat.message}</div>
          </div>
        </>
      ))}

      <div className="flex flex-row-reverse">
        <input type="text" placeholder="Type here" className="input" />
      </div>
    </div>
  );
};

export default Chat;
