import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Sidebar from "../../Sidebar/Sidebar";
import Profile from "../Profile/Profile";
import StoryMain from "../StoryMain/StoryMain";
import MainMessage from "../../Message/MainMessage";
import Auth from "../Auth/Auth";
import Signup from "../Auth/Signup";
import EditProfile from "../Profile/EditProfile";
import Reels from "../../Reels/Reels";
import Authenticate from "../Auth/Authenticate";
import MessageContent from "../../Message/MessageContent";

const Routers = () => {
  const location = useLocation();
  const isMessagePage = location.pathname === "/message";
  return (
    <div>
      {(location.pathname === "/login" || location.pathname === "/signup") && (
        <div className="w-full">
          <Routes>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Auth />}></Route>
          </Routes>
        </div>
      )}

      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <div className="flex">
          <div className={`z-10 ${isMessagePage ? "w-[5%]" : "w-[20%]"}`}>
            <Sidebar />
          </div>
          <div className="w-full">
            <Routes>
              <Route path="/authenticate" element={<Authenticate />}></Route>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/:username/edit" element={<EditProfile />}></Route>
              <Route path="/:username" element={<Profile />}>
                <Route path="saved" element=""></Route>
                <Route path="liked" element=""></Route>
                <Route path="reels" element=""></Route>
              </Route>
              <Route path="/story/:username" element={<StoryMain />}></Route>
              <Route path="/reels" element={<Reels />}></Route>
              <Route path="/message" element={<MainMessage />}>
                <Route path=":chatId" element={<MessageContent />} />
              </Route>
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default Routers;
