import React, { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { isCheckCommentOfUser, isCommentLike } from "../../State/Comment/Logic";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentPostReplay,
  deleteCommentPost,
  getCommentPost,
  likeCommentPost,
  unLikeCommentPost,
} from "../../State/Comment/Action";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { HiDotsHorizontal } from "react-icons/hi";

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

const CommentCard = ({ commentItem }) => {
  const [isCheckComment, setIsCheckComment] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);

  const [isReplay, setIsReplay] = useState(false);
  const handleReplay = () => {
    setIsReplay(!isReplay);
  };

  const [data, setData] = useState({
    content: "",
  });

  const handleChange = (e) => {
    setData({
      content: e.target.value,
    });
  };

  const [isCommentLiked, setIsCommentLike] = useState(false);
  const [isCommentReplay, setIsCommentReplay] = useState(false);
  const handleLikeComment = () => {
    if (isCommentLiked) {
      dispatch(unLikeCommentPost(commentItem.commentId));
    } else {
      dispatch(likeCommentPost(commentItem.commentId));
    }
    setIsCommentLike(!isCommentLiked);
  };

  const handleLikeCommentReplay = (commentId) => {
    if (isCommentReplay) {
      dispatch(unLikeCommentPost(commentId));
    } else {
      dispatch(likeCommentPost(commentId));
    }
    setIsCommentReplay(!isCommentReplay);
  };

  const handleCreateCommentReplay = (req, commentId) => {
    dispatch(createCommentPostReplay(req, commentId));
  };

  const uu = user.user.data?.result;

  useEffect(() => {
    setIsCheckComment(isCheckCommentOfUser(commentItem, uu?.userId));
  }, [commentItem, uu]);

  useEffect(() => {
    setIsCommentLike(isCommentLike(commentItem, uu?.userId));
  }, [commentItem, uu?.userId]);

  const handleDeleteComment = () => {
    dispatch(deleteCommentPost(commentItem?.commentId));
    onClose();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="">
            <img
              className="h-9 w-9 rounded-full"
              src={
                commentItem?.user.userImage
                  ? commentItem?.user.userImage
                  : "https://hzshop.ir/img/accountimg.png"
              }
              alt=""
            />
          </div>
          <div className="ml-3 ">
            <p className="space-x-5">
              <span className="font-semibold">
                {commentItem?.user.username}
              </span>
              <span className="font-thin">{commentItem?.content}</span>
            </p>
            <div className="flex items-center space-x-3 text-xs opacity-60">
              <span>{timeDifference(commentItem?.createAt)} ago</span>
              <span>{commentItem?.likedCommentByUser.length} likes</span>
              <button className="" onClick={handleReplay}>
                Replay
              </button>
              {isCheckComment ? (
                <Button bgColor="white" size="xs" onClick={onOpen}>
                  <HiDotsHorizontal />
                </Button>
              ) : (
                ""
              )}
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete Comment
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure you don't want to delete it?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={handleDeleteComment}
                        ml={3}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </div>
            <div className="w-full p-2">
              {isReplay ? (
                <InputGroup size="sm">
                  <Input
                    border="none"
                    width="full"
                    variant="outline"
                    placeholder="Write a comment"
                    name="content"
                    onChange={handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() =>
                        handleCreateCommentReplay(data, commentItem?.commentId)
                      }
                    >
                      Send
                    </Button>
                  </InputRightElement>
                </InputGroup>
              ) : (
                ""
              )}
            </div>
            {commentItem?.replyComments.length !== 0 ? (
              <div className="flex items-center space-x-3 text-xs opacity-60 pt-5">
                <span>-----</span>
                <button>
                  views replies ({commentItem?.replyComments.length}){" "}
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {isCommentLiked ? (
          <AiFillHeart
            onClick={handleLikeComment}
            className="text-xs hover:opacity-50 cursor-pointer text-red-600"
          />
        ) : (
          <AiOutlineHeart
            onClick={handleLikeComment}
            className="text-xs hover:opacity-50 cursor-pointer"
          />
        )}
      </div>
      {commentItem?.replyComments &&
        commentItem?.replyComments.map((replyCommentItem) => (
          <div
            key={replyCommentItem.commentId}
            className="flex items-center justify-between mt-5"
          >
            <div className="flex items-center ml-10">
              <div>
                <img
                  className="h-9 w-9 rounded-full"
                  src={replyCommentItem?.user?.userImage}
                  alt=""
                />
              </div>
              <div className="ml-3 ">
                <p className="space-x-3">
                  <span className="font-semibold">
                    {replyCommentItem?.user?.username}
                  </span>
                  <span className="font-thin">{replyCommentItem?.content}</span>
                </p>
                <div className="flex items-center space-x-3 text-xs opacity-60">
                  <span>{timeDifference(replyCommentItem?.createAt)} ago</span>
                  <span>
                    {replyCommentItem?.likedCommentByUser
                      ? replyCommentItem?.likedCommentByUser?.length
                      : 0}{" "}
                    likes
                  </span>
                  <button className="">Replay</button>
                </div>
              </div>
            </div>
            {isCommentReplay ? (
              <AiFillHeart
                onClick={() => handleLikeCommentReplay(replyCommentItem.commentId)}
                className="text-xs hover:opacity-50 cursor-pointer text-red-600"
              />
            ) : (
              <AiOutlineHeart
                onClick={handleLikeCommentReplay(replyCommentItem.commentId)}
                className="text-xs hover:opacity-50 cursor-pointer"
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default CommentCard;
