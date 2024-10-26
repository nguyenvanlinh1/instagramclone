import React, { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { BsThreads } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { findUserByUsername } from "../../../State/User/Action";
import { Button, useDisclosure } from "@chakra-ui/react";
import ListFollower from "./ListFollower";
import ListFollowed from "./ListFollowed";
import { useNavigate, useParams } from "react-router-dom";
import { checkUser } from "../../../State/User/Logic";
import { FaChevronDown } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { getAllPostByUserId } from "../../../State/Post/Action";
import { getFollowed, getFollower } from "../../../State/Follow/Action";
import { createChat } from "../../../State/Chat/Action";
const ProfileUserDetails = () => {
  const [isUser, setIsUser] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenFollowed,
    onOpen: onOpenFollowed,
    onClose: onCloseFollowed,
  } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store);
  const { follow } = useSelector((store) => store);
  const { post } = useSelector((store) => store);
  const param = useParams();

  useEffect(() => {
    dispatch(findUserByUsername(param.username));
  }, []);
  const usernew = user.byusername.data?.result;

  const uu = user.user.data?.result;

  useEffect(() => {
    setIsUser(checkUser(usernew?.userId, uu));
  }, []);

  useEffect(() => {
      dispatch(getAllPostByUserId(usernew?.userId))
      dispatch(getFollowed(usernew?.userId));
      dispatch(getFollower(usernew?.userId));
  }, [usernew?.userId, follow.notification])

  const handleEdit = () => {
    navigate("edit");
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleCreateChat = (userId) => {
    dispatch(createChat({userId}))
    navigate("/message")
  }
  return (
    <div className="py-10 w-full">
      {isUser ? (
        <div className="flex items-center">
          <div className="w-[15%]">
            <img
              className="w-32 h-32 rounded-full"
              src={
                uu?.userImage
                  ? uu?.userImage
                  : "https://hzshop.ir/img/accountimg.png"
              }
            ></img>
          </div>
          <div className="space-y-5">
            <div className="flex space-x-10 items-center pl-5">
              <p className="cursor-pointer">{uu?.username}</p>
              <button
                className="bg-[#F5F5F5] p-2 rounded-lg"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
              <button className="bg-[#F5F5F5] p-2 rounded-lg">
                View archive
              </button>
              <TbCircleDashed className="font-bold text-3xl" title="Options" />
            </div>
            <div className="flex space-x-10 items-center pl-5 text-lg">
              <div>
                <span className="font-bold text-red-600">
                  {post.posts.data?.result.length}{" "}
                </span>
                <span>posts</span>
              </div>
              <div className="cursor-pointer">
                <Button onClick={onOpen}>
                  <span className="font-semibold text-yellow-400 mr-2">
                    {follow.follower.data?.result.length}
                  </span>
                  <span>follower</span>
                </Button>
                <ListFollower
                  isOpen={isOpen}
                  onClose={onClose}
                  follower={follow.follower.data}
                />
              </div>
              <div className="cursor-pointer">
                <Button onClick={onOpenFollowed}>
                  <span className="font-semibold text-yellow-400 mr-2">
                    {follow.followed.data?.result?.length}
                  </span>
                  <span>following</span>
                </Button>
                <ListFollowed
                  isOpen={isOpenFollowed}
                  onClose={onCloseFollowed}
                  followed={follow.followed.data}
                />
              </div>
            </div>
            <div className="pl-5">
              <span className="font-bold">{uu?.fullName}</span>
              <a href="#" className="flex items-center">
                <BsThreads />
                threads
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="w-[15%]">
            <img
              className="w-32 h-32 rounded-full"
              src={
                usernew?.userImage
                  ? usernew?.userImage
                  : "https://hzshop.ir/img/accountimg.png"
              }
            ></img>
          </div>
          <div className="space-y-5">
            <div className="flex space-x-10 items-center pl-5">
              <p className="cursor-pointer">{usernew?.username}</p>
              <Button
                className="bg-[#F5F5F5] p-2 rounded-lg"
                onClick={handleFollow}
              >
                {isFollowing ? `Follow ${(<FaChevronDown />)} ` : "Follow Back"}
              </Button>
              <Button className="bg-[#F5F5F5] p-2 rounded-lg" onClick={() => handleCreateChat(usernew?.userId)}>Message</Button>
              <HiDotsHorizontal
                className="font-bold text-3xl"
                title="Options"
              />
            </div>
            <div className="flex space-x-10 items-center pl-5 text-lg">
              <div>
                <span className="font-bold text-red-600">
                  {post.posts.data?.result.length}{" "}
                </span>
                <span>posts</span>
              </div>
              <div className="cursor-pointer">
                <Button onClick={onOpen}>
                  <span className="font-semibold text-yellow-400 mr-2">
                    {follow.follower.data?.result.length}
                  </span>
                  <span>follower</span>
                </Button>
                <ListFollower
                  isOpen={isOpen}
                  onClose={onClose}
                  follower={follow.follower.data}
                />
              </div>
              <div className="cursor-pointer">
                <Button onClick={onOpenFollowed}>
                  <span className="font-semibold text-yellow-400 mr-2">
                    {follow.followed.data?.result?.length}
                  </span>
                  <span>following</span>
                </Button>
                <ListFollowed
                  isOpen={isOpenFollowed}
                  onClose={onCloseFollowed}
                  followed={follow.followed.data}
                />
              </div>
            </div>
            <div className="pl-5">
              <span className="font-bold">{usernew?.fullName}</span>
              <a href="#" className="flex items-center">
                <BsThreads />
                threads
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUserDetails;
