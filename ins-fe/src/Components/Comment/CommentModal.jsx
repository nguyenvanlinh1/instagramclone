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
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import CommentCard from "./CommentCard";
import { BsBookmark, BsBookmarkFill, BsEmojiSmile } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./CommentModal.css";
import { useDispatch, useSelector } from "react-redux";
import { createPostComment, deleteCommentPost, getCommentPost } from "../../State/Comment/Action";
import { isCommentLike } from "../../State/Comment/Logic";
import SockJS from "sockjs-client";
import { over } from "stompjs";

function timeDifference(pastTime) {
  const currentTime = new Date();
  const pastDate = new Date(pastTime);

  const diffInMs = currentTime - pastDate;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return diffInMinutes === 1
      ? diffInMinutes + " minute"
      : diffInMinutes + " minutes";
  } else if (diffInHours < 24) {
    return diffInHours === 1 ? diffInHours + " hour" : diffInHours + " hours";
  } else {
    return diffInHours === 1 ? diffInDays + " day" : diffInDays + " days";
  }
}

const CommentModal = ({
  onClose,
  isOpen,
  isSaved,
  isPostLiked,
  handlePostLike,
  handleSavePost,
  item,
}) => {
  const dispatch = useDispatch();
  const { comment } = useSelector((store) => store);
  const {
    isOpen: isOpenDiglog,
    onOpen: onOpenDiglog,
    onClose: onCloseDiglog,
  } = useDisclosure();
  const cancelRefDiglog = React.useRef();
  const inputRef = React.useRef();

  const handleButtonClick = () => {
    inputRef.current.focus();
  };

  const [data, setData] = useState({
    content: "",
  });
  const handleChange = (e) => {
    setData({
      content: e.target.value,
    });
  };

  const handleCreateComment = (req, postId) => {
    dispatch(createPostComment(req, postId));
    setData({ content: "" });
  };

  const [isConnect, setIsConnet] = useState();
  const [comments, setComments] = useState([]);
  const [stompClient, setStompClient] = useState(false);

  const connect = () => {
    const sockJs = new SockJS("http://localhost:8888/websocket");
    const temp = over(sockJs);

    setStompClient(temp);
    temp.connect({}, onConnect, onError);
  };

  const onConnect = () => {
    setIsConnet(true);
  };

  const onError = (error) => {
    console.log("Error: ", error);
  };

  //create Commment

  useEffect(() => {
    if (stompClient && comment.comment) {
      stompClient?.send(
        "/app/comment",
        {},
        JSON.stringify(comment.comment.data?.result)
      );
    }
  }, [comment.comment]);

  useEffect(() => {
    if (isConnect) {
      const subscription = stompClient?.subscribe(
        "/topic/public",
        onCreateCommentReceive
      );
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnect]);

  const onCreateCommentReceive = (payload) => {
    const receiveComment = JSON.parse(payload.body);
    setComments((prevComments) => {
      const isExisting = prevComments.some(
        (comment) => comment.commentId === receiveComment.commentId
      );
      if (isExisting) {
        return prevComments;
      }
      return [...prevComments, receiveComment];
    });
  };
  
  const handleDeleteComment = (commentId) => {
    dispatch(deleteCommentPost(commentId));
    if (isConnect) {
      stompClient?.send("/app/comment/delete", {}, commentId);
    }
  };
  

  useEffect(() => {
    if (comment.notification) {
      const subscription = stompClient?.subscribe(
        "/topic/public/delete",
        onDeleteCommentReceive
      );
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnect]);

  const onDeleteCommentReceive = (payload) => {
    const deletedComment = JSON.parse(payload.body);
    console.log("data", comments)
    setComments([...comments]);
  }

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    setComments(item.comments);
  }, [comment.notification, item.comments]);

  const [inputValue, setInputValue] = useState("");

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
                  src={item?.imageList[0].imageUrl}
                ></img>
              </div>
              <div className="w-[55%] pl-10">
                <div className="flex justify-between items-center py-3 border-b border-b-slate-200">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="w-9 h-9 rounded-full"
                        src={
                          item?.user.userImage
                            ? item?.user.userImage
                            : "https://hzshop.ir/img/accountimg.png"
                        }
                      ></img>
                    </div>
                    <div className="ml-2">
                      <p className="font-bold">{item?.user.username}</p>
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
                <div className="comment space-y-10 mt-3 h-[500px]">
                  {comments &&
                    comments?.map((commentItem, index) => (
                      <CommentCard
                        key={index}
                        commentItem={commentItem}
                        stompClient={stompClient}
                        isConnect={isConnect}
                        handleDeleteComment={handleDeleteComment}
                      />
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
                      <FaRegComment
                        className="text-2xl hover:opacity-50 cursor-pointer"
                        onClick={handleButtonClick}
                      />
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
                    <p>
                      {item?.likedByUsers.length === 1
                        ? item?.likedByUsers.length + " like"
                        : item?.likedByUsers.length + " likes"}
                    </p>
                    <p className="opacity-50 py-2 cursor-pointer">
                      {timeDifference(item?.createAt)} ago
                    </p>
                  </div>

                  <div className="border-t border-t-slate-200 pt-2">
                    <div className="flex items-center justify-between w-full pb-5">
                      <div className="flex items-center">
                        <BsEmojiSmile className="mr-1" />
                        <input
                          ref={inputRef}
                          className="border-none outline-none"
                          type="text"
                          placeholder="Add a comment ..."
                          onChange={handleChange}
                          name="content"
                          value={data.content}
                        ></input>
                      </div>
                      <button
                        className={`${
                          inputValue.trim() ? "text-blue-600" : ""
                        }`}
                        onClick={() => handleCreateComment(data, item?.postId)}
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
