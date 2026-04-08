import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "./utils/constants";
import { useSelector } from "react-redux";
import store from "./app/store";

const Chat = () => {
  const { toUserID } = useParams();
  const user = useSelector((store) => store.user);
  const [chatMsg, setChatMsg] = useState([]);
  const fetchMessages = async () => {
    try {
      const res = await axios.get(BASE_URL + "/msg/" + toUserID, {
        withCredentials: true,
      });
      //   console.log(user);

      const sortedMessages = res?.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );

      console.log(res?.data);
      setChatMsg(sortedMessages);
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };
  const [messageToSend, setMessageToSend] = useState("");

  const sendMessage = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/msg/" + toUserID,
        { message: messageToSend },
        { withCredentials: true },
      );
      if (!res) throw new Error("ERROR: from axios post");
      //   setChatMsg(...chatMsg, messageToSend);
      setChatMsg((prev) => [...prev, messageToSend]);

      setMessageToSend("");
    } catch (error) {
      console.log(error);
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
              chat?.toUserId?._id.toString() === user?._id.toString()
                ? "chat chat-start"
                : "chat chat-end"
            }
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={chat?.fromUserId?.photoUrl}
                />
              </div>
            </div>
            <div className="chat-bubble">{chat?.message}</div>
          </div>
        </>
      ))}

      <div className="flex flex-row-reverse">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            type="text"
            placeholder="Type here"
            className="input"
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
