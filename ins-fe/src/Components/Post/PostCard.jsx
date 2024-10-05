import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill, BsThreeDots } from "react-icons/bs";
import { BsDot } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { AiFillHeart } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import CommentModal from "../Comment/CommentModal";

const PostCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCommentModalOpen,
    onOpen: onCommentModalOpen,
    onClose: onCommentModalClose,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const [isPostLiked, setIsPostLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const handlePostLike = () => {
    setIsPostLiked(!isPostLiked);
  };
  const handleSavePost = () => {
    setIsSaved(!isSaved);
  };

  const handleOpenCommentModal = () => {
    onCommentModalOpen();
  }

  return (
    <div>
      <div className="border rounded-md w-full">
        <div className="flex justify-between items-center w-full py-4 px-5">
          <div className="flex items-center p-2">
            <img
              className="h-10 w-10 rounded-full"
              src="https://th.bing.com/th/id/OIP.6m6AZ7QHFj5JUAc6eWE6CQHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            ></img>
            <div className="pl-2">
              <p className="text-sm flex items-center">
                <span className="font-semibold">username</span>
                <BsDot />
                <span className="font-thin">9m</span>
              </p>
              <p className="font-thin text-sm">location</p>
            </div>
          </div>
          <div>
            <Button onClick={onOpen}>
              <BsThreeDots />
            </Button>
            <AlertDialog
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogBody>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Button sx={{ color: "red" }}>Delete</Button>
                    <Button>Update</Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </Box>
                </AlertDialogBody>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="w-full">
          <img
            className="w-[468px] h-[585px] mx-auto"
            src="https://th.bing.com/th/id/OIP.6m6AZ7QHFj5JUAc6eWE6CQHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          ></img>
        </div>

        <div className="flex justify-between items-center w-full px-5 py-4">
          <div className="flex items-center space-x-2">
            {isPostLiked ? (
              <AiFillHeart
                className="text-2xl text-red-600"
                onClick={handlePostLike}
              />
            ) : (
              <AiOutlineHeart className="text-2xl" onClick={handlePostLike} />
            )}
            <FaRegComment onClick={handleOpenCommentModal} className="text-2xl hover:opacity-50 cursor-pointer" />
            <RiSendPlaneLine className="text-2xl hover:opacity-50 cursor-pointer" />
          </div>
          <div className="cursor-pointer">
            {isSaved ? (
              <BsBookmarkFill
                className="text-2xl text-yellow-500"
                onClick={handleSavePost}
              />
            ) : (
              <BsBookmark onClick={handleSavePost} className="text-2xl" />
            )}
          </div>
        </div>

        <div className="w-full py-2 px-5">
          <p>10 likes</p>
          <p>
            leomessi !! First goal accomplished ✅ Very proud of this team, we
            move forward with the desire to achieve more things together!!
          </p>
          <p className="opacity-50 py-2 cursor-pointer">view all 10 comments</p>
        </div>

        <div>
          <div className="flex items-center justify-between w-full px-5 pb-5">
            <input
              className="border-none outline-none"
              type="text"
              placeholder="Add a comment ..."
            ></input>
            <BsEmojiSmile />
          </div>
        </div>
      </div>
      <CommentModal
        onClose={onCommentModalClose}
        isOpen={isCommentModalOpen}
        handlePostLike={handlePostLike}
        handleSavePost={handleSavePost}
        isPostLiked={isPostLiked}
        isSaved={isSaved}
      />
    </div>
  );
};

export default PostCard;
