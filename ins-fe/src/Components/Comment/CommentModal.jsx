import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import CommentCard from "./CommentCard";
import { BsBookmark, BsBookmarkFill, BsEmojiSmile } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./CommentModal.css";

const CommentModal = ({
  onClose,
  isOpen,
  isSaved,
  isPostLiked,
  handlePostLike,
  handleSavePost,
}) => {
  const {
    isOpen: isOpenDiglog,
    onOpen: onOpenDiglog,
    onClose: onCloseDiglog,
  } = useDisclosure();
  const cancelRefDiglog = React.useRef();
//   const [isPostLiked, setIsPostLiked] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);
  const [inputValue, setInputValue] = useState("");
//   const handlePostLike = () => {
//     setIsPostLiked(!isPostLiked);
//   };
//   const handleSavePost = () => {
//     setIsSaved(!isSaved);
//   };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex h-[75vh]">
              <div className="w-[45%]">
                <img
                  className="max-h-full w-full"
                  src="https://th.bing.com/th/id/OIP.6m6AZ7QHFj5JUAc6eWE6CQHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                ></img>
              </div>
              <div className="w-[55%] pl-10">
                <div className="flex justify-between items-center py-3 border-b border-b-slate-200">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="w-9 h-9 rounded-full"
                        src="https://th.bing.com/th/id/OIP.mJ1NiAi2HGhUjJU17k4VVAHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                      ></img>
                    </div>
                    <div className="ml-2">
                      <p>username</p>
                    </div>
                  </div>
                  <div>
                    <Button sx={{ bg: "none" }} onClick={onOpenDiglog}>
                      <BsThreeDots />
                    </Button>
                    <AlertDialog
                      motionPreset="slideInBottom"
                      leastDestructiveRef={cancelRefDiglog}
                      onClose={onCloseDiglog}
                      isOpen={isOpenDiglog}
                      isCentered
                    >
                      <AlertDialogOverlay />
                      <AlertDialogContent>
                        <AlertDialogBody>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 2,
                            }}
                          >
                            <Button sx={{ color: "red" }}>Delete</Button>
                            <Button>Update</Button>
                            <Button onClick={onCloseDiglog}>Cancel</Button>
                          </Box>
                        </AlertDialogBody>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="comment space-y-10 mt-3">
                  {[1, 1, 1, 1].map((_, index) => (
                    <CommentCard key={index} />
                  ))}
                </div>

                <div className="border-t border-t-slate-200">
                  <div className="flex justify-between items-center w-full py-4">
                    <div className="flex items-center space-x-2">
                      {isPostLiked ? (
                        <AiFillHeart
                          className="text-2xl text-red-600"
                          onClick={handlePostLike}
                        />
                      ) : (
                        <AiOutlineHeart
                          className="text-2xl"
                          onClick={handlePostLike}
                        />
                      )}
                      <FaRegComment className="text-2xl hover:opacity-50 cursor-pointer" />
                      <RiSendPlaneLine className="text-2xl hover:opacity-50 cursor-pointer" />
                    </div>
                    <div className="cursor-pointer">
                      {isSaved ? (
                        <BsBookmarkFill
                          className="text-2xl text-yellow-500"
                          onClick={handleSavePost}
                        />
                      ) : (
                        <BsBookmark
                          onClick={handleSavePost}
                          className="text-2xl"
                        />
                      )}
                    </div>
                  </div>

                  <div className="w-full py-2">
                    <p>10 likes</p>
                    <p className="opacity-50 py-2 cursor-pointer">1 day ago</p>
                  </div>

                  <div className="border-t border-t-slate-200 pt-2">
                    <div className="flex items-center justify-between w-full pb-5">
                      <div className="flex items-center">
                        <BsEmojiSmile className="mr-1" />
                        <input
                          className="border-none outline-none"
                          type="text"
                          placeholder="Add a comment ..."
                          onChange={handleInput}
                        ></input>
                      </div>
                      <button
                        className={`${
                          inputValue.trim() ? "text-blue-600" : ""
                        }`}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentModal;
