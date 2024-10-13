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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  const token = localStorage.getItem("accessToken");
  console.log(token)

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if(!accessToken){
      navigate("/login")
    }
    dispatch(getUser());
  }, [navigate]);

  const uu = user.user.data?.result;

  useEffect(() => {
    dispatch(getMyFollowed());
    dispatch(findUserNotFollow());
  }, [follow.notification]);

  useEffect(() => {
    if (uu) {
      dispatch(getAllPostFromUserFollowed(uu?.userId));
    }
  }, [
    uu?.userId,
    comment.notification,
    comment.comment,
    post.notification,
    post.updatePost,
    comment.updateComment,
    comment.commentReplay,
    follow.notification,
  ]);

  const pp = post.posts.data?.result;
  const ff = follow.followed.data?.result;
  const unf = user?.users?.data?.result;

  const handleWatchStory = () => {
    navigate(`/story/${uu?.username}`);
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
                  uu?.userImage
                    ? uu?.userImage
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
              <p className="text-sm font-bold text-red-500">{uu?.username}</p>
            </div>
            {ff?.map((item) => (
              <StoryCircle key={item.userId} item={item} />
            ))}
          </div>
          <div className="space-y-5 w-full mt-10">
            {pp?.map((item) => (
              <PostCard key={item.postId} item={item} />
            ))}
          </div>
        </div>
        <div className="w-[45%] px-20">
          <HomeRight user={uu} unf={unf} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
