import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import store from "./app/store";
import { addMessages } from "./features/messages";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const messages = useSelector((store) => store.messages);
  const { toUserID } = useParams();
  const dispatch = useDispatch();
  const [chatMsg, setChatMsg] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get(BASE_URL + "/msg/" + toUserID, {
        withCredentials: true,
      });
      //   console.log(user);

      const sortedMessages = res?.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );

      dispatch(addMessages(sortedMessages));

      //   console.log(res?.data);
      //   setChatMsg(sortedMessages);
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };

  const sendMessage = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/msg/" + toUserID,
        { message: messageToSend },
        { withCredentials: true },
      );
      console.log(res);
      if (!res) throw new Error("ERROR: from axios post");
      //   setChatMsg(...chatMsg, messageToSend);
      //   setChatMsg((prev) => [...prev, messageToSend]);
      dispatch(addMessages([...messages, res.data.data]));
      console.log(messages);

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
      {Array.isArray(messages) &&
        messages.map((chat) => (
          //   <>
          <div
            className={
              chat?.toUserId?._id?.toString() === user?._id?.toString()
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
          //   </>
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
