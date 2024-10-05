import React, { useState } from "react";
import ProfileUserDetails from "./ProfileUserDetails/ProfileUserDetails";
import ReqUserPostPart from "./ProfileUserDetails/ReqUserPostPart";
import { useNavigate } from "react-router-dom";
import SaveArticleCard from "./SaveArticle/SaveArticleCard";
import TaggedCard from "./TaggedArticle/TaggedCard";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { RiVideoAddLine } from "react-icons/ri";
import SaveArticlePost from "./SaveArticle/SaveArticlePost";
import TaggedPost from "./TaggedArticle/TaggedPost";

const MainProfile = () => {
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const tabs = [
    {
      tab: "Posts",
      icon: <AiOutlineTable />,
      activeIcon: "",
    },
    {
      tab: "Saved",
      icon: <BiBookmark />,
      activeIcon: "",
    },
    {
      tab: "Tagged",
      icon: <AiOutlineUser />,
      activeIcon: "",
    },
    {
      tab: "Reels",
      icon: <RiVideoAddLine />,
      activeIcon: "",
    },
  ];

  const handleTabClick = (title) => {
    setActiveTab(title);
    if (title === "Saved") {
      navigate("/username/saved");
    } else if (title === "Tagged") {
      navigate("/username/tagged");
    } else {
      navigate("/username");
    }
  };
  return (
    <div>
      <div className="px-10">
        <ProfileUserDetails />
      </div>
      <div className="flex justify-center space-x-14 border-t relative">
        {tabs.map((item, index) => (
          <div
            className={`${
              activeTab === item.tab ? "border-t border-black" : "opacity-60"
            } flex items-center cursor-pointer py-3 text-lg`}
            key={index}
            onClick={() => handleTabClick(item.tab)}
          >
            <p>{item.icon}</p>
            <p className="ml-2">{item.tab}</p>
          </div>
        ))}
      </div>
      <div>
        <div>
          <div className="">
            {activeTab === "Saved" ? (
              <SaveArticlePost />
            ) : activeTab === "Tagged" ? (
              <TaggedPost />
            ) : (
              <ReqUserPostPart/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
