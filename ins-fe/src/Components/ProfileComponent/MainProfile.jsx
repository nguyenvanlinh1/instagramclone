import React, { useEffect, useState } from "react";
import ProfileUserDetails from "./ProfileUserDetails/ProfileUserDetails";
import ReqUserPostPart from "./ProfileUserDetails/ReqUserPostPart";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { RiVideoAddLine } from "react-icons/ri";
import SaveArticlePost from "./SaveArticle/SaveArticlePost";
import TaggedPost from "./TaggedArticle/TaggedPost";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostByUserId, getAllPostByUserLiked, getAllPostByUserSaved } from "../../State/Post/Action";
import { findUserByUsername } from "../../State/User/Action";

const MainProfile = () => {
  const { post, user } = useSelector((store) => store);
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();

  useEffect(() => {
    dispatch(findUserByUsername(param.username));
  }, [param.username]);

  const usernew = user?.byusername?.data?.result;
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
      tab: "Liked",
      icon: <AiOutlineUser />,
      activeIcon: "",
    },
    {
      tab: "Reels",
      icon: <RiVideoAddLine />,
      activeIcon: "",
    },
  ];

  useEffect(() => {
      dispatch(getAllPostByUserId(usernew?.userId));
      dispatch(getAllPostByUserSaved(usernew?.userId));
      dispatch(getAllPostByUserLiked(usernew?.userId));
      console.log("ABC")
  }, [post.saved, post.liked, param, usernew?.userId, user.user])


  const handleTabClick = (title) => {
    setActiveTab(title);
    if (title === "Saved") {
      navigate(`/${usernew.username}/saved`);
    } else if (title === "Liked") {
      navigate(`/${usernew.username}/liked`);
    } else {
      navigate(`/${usernew.username}`);
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
              <SaveArticlePost datasave={post.postSaved?.data?.result} />
            ) : activeTab === "Liked" ? (
              <TaggedPost datalike={post.postLiked?.data?.result} />
            ) : (
              <ReqUserPostPart postItem={post.posts?.data?.result}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
