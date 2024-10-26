import React, { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { BsThreads } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { findUserByUsername } from "../../../State/User/Action";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import ListFollower from "./ListFollower";
import ListFollowed from "./ListFollowed";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { getAllPostByUserId } from "../../../State/Post/Action";
import {
  getFollowed,
  getFollower,
  getMyFollowed,
} from "../../../State/Follow/Action";
import { createChat } from "../../../State/Chat/Action";
import { checkFollowed } from "../../../State/Follow/Logic";
const ProfileUserDetails = () => {
  const [isUserFollowed, setIsUserFollowed] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenFollowed,
    onOpen: onOpenFollowed,
    onClose: onCloseFollowed,
  } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, follow, post } = useSelector((store) => store);
  const param = useParams();

  useEffect(() => {
    dispatch(findUserByUsername(param.username));
  }, [param.username]);

  const usernew = user.byusername.data?.result;

  const uu = user.user.data?.result;
  const ff = follow.follow.data?.result;

  useEffect(() => {
    dispatch(getAllPostByUserId(usernew?.userId));
    dispatch(getFollowed(usernew?.userId));
    dispatch(getFollower(usernew?.userId));
    dispatch(getMyFollowed());
  }, [usernew?.userId, follow.notification]);

  useEffect(() => {
    if(ff){
      setIsUserFollowed(checkFollowed(usernew?.userId, ff));
    }
  }, [ff]);
  const handleEdit = () => {
    navigate("edit");
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  console.log(usernew)

  const handleCreateChat = (userId) => {
    dispatch(createChat({ userId }));
    setTimeout(() => {
      navigate("/message");
    }, 1500)
  };
  return (
    <div className="py-10 w-full">
      {uu?.userId === usernew?.userId ? (
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
                  follow={ff}
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
                  follow={ff}
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
              <Menu>
                <MenuButton
                  className="p-2 rounded-lg"
                  onClick={handleFollow}
                  sx={{ bgColor: "#0095F6" }}
                >
                  {isUserFollowed ? (
                    <div className="flex justify-between items-center">
                      <p>Following</p>
                      <FaChevronDown />
                    </div>
                  ) : (
                    "Follow"
                  )}
                </MenuButton>
                  <MenuList>
                    <MenuItem disabled sx={{ color: "gray", cursor: "not-allowed" }}>Add to favorites</MenuItem>
                    <MenuItem disabled sx={{ color: "gray", cursor: "not-allowed" }}>Add to friends list</MenuItem>
                    <MenuItem sx={{textColor:"red"}}>Unfollow</MenuItem>
                  </MenuList>
              </Menu>
              <Button
                className="bg-[#F5F5F5] p-2 rounded-lg"
                onClick={() => handleCreateChat(usernew?.userId)}
              >
                Message
              </Button>
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
                  follow={ff}
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
                  follow={ff}
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
