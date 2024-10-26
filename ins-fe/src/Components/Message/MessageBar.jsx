import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { GrChatOption } from "react-icons/gr";
import MessagePrimary from "./MessagePrimary";
import MessageGeneral from "./MessageGeneral";
import MessageRequest from "./MessageRequest";
import { useDispatch, useSelector } from "react-redux";
import { getChatMessage } from "../../State/Message/Action";
import { findAllChatByUserId } from "../../State/Chat/Action";
import MessageContent from "./MessageContent";
import { getUser } from "../../State/User/Action";

const MessageBar = () => {
  const { chat, user } = useSelector((store) => store);
  const [activeTab, setActiveTab] = useState("Primary");
  const dispatch = useDispatch();
  const handleClick = (title) => {
    setActiveTab(title);
  };

  useEffect(() => {
    dispatch(findAllChatByUserId());
    dispatch(getUser());
  }, [chat.notification, chat.chat]);

  const handleGetMessageByChat = (chatId) => {
    dispatch(getChatMessage(chatId));
  };

  const TabItem = ({ label, isActive, onClick }) => (
    <div
      className={`py-3 cursor-pointer flex justify-center ${
        isActive ? "border-b-2 border-b-black" : ""
      }`}
      onClick={onClick}
    >
      <p>{label}</p>
    </div>
  );

  const UserItem = ({ src }) => (
    <div className="flex flex-col items-center">
      <img className="w-20 h-20 rounded-full" src={src} alt="user profile" />
      <p className="font-thin">Your notes</p>
    </div>
  );

  return (
    <div className="">
      <div className="border-r-2 border-r-slate-300">
        <div className="flex justify-between px-5 py-8 items-center">
          <div className="flex items-center">
            <p className="font-semibold text-2xl">{user.user.data?.result?.username}</p>
            <FaAngleDown className="text-lg" />
          </div>
          <GrChatOption className="text-3xl" />
        </div>
        <div className="grid grid-cols-3">
          <TabItem
            label="Primary"
            isActive={activeTab === "Primary"}
            onClick={() => setActiveTab("Primary")}
          />
          <TabItem
            label="General"
            isActive={activeTab === "General"}
            onClick={() => setActiveTab("General")}
          />
          <TabItem
            label="Requests"
            isActive={activeTab === "Requests"}
            onClick={() => setActiveTab("Requests")}
          />
        </div>
        <div className="mt-8 flex ml-8">
          <UserItem src={user.user.data?.result?.userImage} />
        </div>
        <div className="mt-8 h-[57vh]">
          {chat.chats ? (
            <>
              {activeTab === "Primary" && (
                <MessagePrimary item={chat.chats.data?.result} />
              )}
              {activeTab === "General" && <MessageGeneral />}
              {activeTab === "Requests" && <MessageRequest />}
            </>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="font-bold">Message not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBar;
