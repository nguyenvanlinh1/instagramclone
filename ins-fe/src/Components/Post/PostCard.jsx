import React, { useEffect, useState } from "react";
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
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import CommentModal from "../Comment/CommentModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  likePost,
  savePost,
  unLikePost,
  unSavePost,
} from "../../State/Post/Action";
import { isCreatePost, isPostLike, isPostSave } from "../../State/Post/Logic";
import { useNavigate } from "react-router-dom";

function timeDifference(pastTime) {
  const currentTime = new Date();
  const pastDate = new Date(pastTime);

  const diffInMs = currentTime - pastDate;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return diffInMinutes + "M"; // Nếu chênh lệch dưới 1 giờ
  } else if (diffInHours < 24) {
    return diffInHours + "H"; // Nếu chênh lệch dưới 24 giờ
  } else {
    return diffInDays + "N"; // Nếu chênh lệch trên 24 giờ
  }
}

const PostCard = ({ item }) => {
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { user} = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isCommentModalOpen,
    onOpen: onCommentModalOpen,
    onClose: onCommentModalClose,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const uuId = user.user.data?.result?.userId
  const uu = user.user.data?.result;
  useEffect(() => {
    setIsPostLiked(isPostLike(item, uuId));
    setIsSaved(isPostSave(item, uuId));
    setCreatePost(isCreatePost(item, uuId));
  }, [item, uu]);

  const handlePostLike = async () => {
    setIsPostLiked(!isPostLiked);
    if (isPostLiked) {
      dispatch(unLikePost(item?.postId));
    } else {
      dispatch(likePost(item?.postId));
    }
  };

  const handleSavePost = () => {
    setIsSaved(!isSaved);
    if (isSaved) {
      dispatch(unSavePost(item?.postId));
    } else {
      dispatch(savePost(item?.postId));
    }
  };

  const handleDeletePost = () => {
    dispatch(deletePost(item?.postId));
  }

  const handleOpenCommentModal = () => {
    onCommentModalOpen();
  };

  const handleProfile = (username) => {
    navigate(`/${username}`)
  }

  return (
    <div>
      <div className="border rounded-md w-full">
        <div className="flex justify-between items-center w-full py-4 px-5">
          <div className="flex items-center p-2">
            <img
              className="h-10 w-10 rounded-full cursor-pointer"
              src={
                item?.user.userImage
                  ? item?.user.userImage
                  : "https://hzshop.ir/img/accountimg.png"
              }
              onClick={() => handleProfile(item?.user.username)}
            ></img>
            <div className="pl-2">
              <p className="text-sm flex items-center">
                <span className="font-semibold">{item?.user.username}</span>
                <BsDot />
                <span className="font-thin">
                  {timeDifference(item?.createAt)}
                </span>
              </p>
              <p className="font-thin text-sm">{item?.location}</p>
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
                  {createPost ? (
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Button sx={{ color: "red" }} onClick={handleDeletePost}>Delete</Button>
                      <Button>Update</Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </Box>
                  ) : (
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Button sx={{ color: "red" }}>Report</Button>
                      <Button sx={{ color: "red" }}>Unfollow</Button>
                      <Button onClick={onClose}>Add to favorites</Button>
                    </Box>
                  )}
                </AlertDialogBody>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="w-full">
          <img
            className="w-[468px] h-[585px] mx-auto"
            src={item?.imageList[0].imageUrl}
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
            <FaRegComment
              onClick={handleOpenCommentModal}
              className="text-2xl hover:opacity-50 cursor-pointer"
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
              <BsBookmark onClick={handleSavePost} className="text-2xl" />
            )}
          </div>
        </div>

        <div className="w-full py-2 px-5">
          <p>{item?.likedByUsers.length} likes</p>
          <p>{item?.caption}</p>
          <p className="opacity-50 py-2 cursor-pointer" onClick={handleOpenCommentModal}>
            view all {item?.comments.length} comments
          </p>
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
        item={item}
        key={item.postId}
      />
    </div>
  );
};

export default PostCard;
