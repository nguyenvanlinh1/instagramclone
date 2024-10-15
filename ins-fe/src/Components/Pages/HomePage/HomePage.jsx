import React, { useEffect, useState } from "react";
import StoryCircle from "../../Story/StoryCircle";
import HomeRight from "../../HomeRight/HomeRight";
import PostCard from "../../Post/PostCard";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findUserNotFollow, getUser } from "../../../State/User/Action";
import { getAllPostFromUserFollowed } from "../../../State/Post/Action";
import { getMyFollowed } from "../../../State/Follow/Action";
import { FiPlus } from "react-icons/fi";
import CreateStory from "../../Story/CreateStory";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, user, post, follow, comment } = useSelector((store) => store);
  const token = localStorage.getItem("accessToken");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    else {dispatch(getUser(token))};
  }, [auth]);

  useEffect(() => {
    if(user.user){
      dispatch(getAllPostFromUserFollowed(user.user.data?.result?.userId));
    }
  }, [
    user.user,
    comment.notification,
    comment.comment,
    post.notification,
    post.updatePost,
    comment.updateComment,
    comment.commentReplay,
    follow.notification,
    post.post,
  ]);


  useEffect(() => {
    dispatch(getMyFollowed());
    dispatch(findUserNotFollow());
  }, [follow.notification, user.user]);

  const handleWatchStory = () => {
    navigate(`/story/${user.user.data?.result?.username}`);
  };

  return (
    <div>
      <div className="mt-10 flex w-[100%]">
        <div className="w-[55%] px-20">
          <div className="storyDiv flex space-x-5 border p-4 rounded-md justify-start w-full">
            <div
              className="cursor-pointer flex flex-col items-center relative"
              onClick={onOpen}
            >
              <img
                className="w-16 h-16 rounded-full"
                src={
                  user.user.data?.result?.userImage
                    ? user.user.data?.result?.userImage
                    : "https://hzshop.ir/img/accountimg.png"
                }
              ></img>
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-3xl">
                <FiPlus />
              </div>
              <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalCloseButton />
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader className="text-center">
                    Create Story
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
                      <Button sx={{ color: "red" }} onClick={onCreateOpen}>
                        Create
                      </Button>
                      <CreateStory
                        isOpen={isCreateOpen}
                        onClose={onCreateClose}
                      />
                      <Button onClick={handleWatchStory}>Watch</Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </Box>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <p className="text-sm font-bold text-red-500">
                {user.user.data?.result?.username}
              </p>
            </div>
            {follow.follow &&
              follow.follow.data?.result?.map((item) => (
                <StoryCircle key={item.userId} item={item} />
              ))}
          </div>
          <div className="space-y-5 w-full mt-10">
            {post.posts &&
              post.posts.data?.result?.map((item) => (
                <PostCard key={item.postId} item={item} />
              ))}
          </div>
        </div>
        <div className="w-[45%] px-20">
          <HomeRight
            user={user.user.data?.result}
            unf={user.usernotfollow?.data?.result}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
