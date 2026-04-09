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
  const [messageToSend, setMessageToSend] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get(BASE_URL + "/msg/" + toUserID, {
        withCredentials: true,
      });
      const sortedMessages = res?.data?.messages.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );

      dispatch(addMessages(sortedMessages));
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
      if (!res) throw new Error("ERROR: from axios post");

      dispatch(addMessages([...messages, res.data.data]));

      setMessageToSend("");
    } catch (error) {
      console.log(error);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const reversedMessages = [...messages].reverse();
  const paginatedMessages = reversedMessages.slice(startIndex, endIndex);

  const handleLeftClick = () => {
    if (paginatedMessages.length < 10) return;
    setCurrentPage(currentPage + 1);
    // console.log("Start Index: ", startIndex, "End Index: ", endIndex);
    // console.log("Paginated Messages: ", paginatedMessages);
  };
  const handleRightClick = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <div className="mb-25">
      {paginatedMessages.reverse().map((chat) => (
        <div
          key={chat._id}
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
      <div className="join fixed bottom-20 left-1/2 transform -translate-1/2">
        <button onClick={() => handleLeftClick()} className="join-item btn">
          «
        </button>
        <button className="join-item btn">Page {currentPage}</button>
        <button onClick={() => handleRightClick()} className="join-item btn">
          »
        </button>
      </div>
    </div>
  );
};

export default Chat;
