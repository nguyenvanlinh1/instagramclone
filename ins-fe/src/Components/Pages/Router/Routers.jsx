import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Sidebar from "../../Sidebar/Sidebar";
import Profile from "../Profile/Profile";
import StoryMain from "../StoryMain/StoryMain";
import Search from "../../Search/Search";

const Routers = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="w-full">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/username" element={<Profile />}>
                <Route path="saved" element=""></Route>
                <Route path="tagged" element=""></Route>
                <Route path="reels" element=""></Route>
            </Route>
            <Route path="/story" element={<StoryMain/>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Routers;
