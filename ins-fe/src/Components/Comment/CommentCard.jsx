import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const CommentCard = () => {
  const [isCommentLiked, setIsCommentLike] = useState();
  const [isCommentReplay, setIsCommentReplay] = useState();
  const handleLikeComment = () => {
    setIsCommentLike(!isCommentLiked);
  };

  const handleLikeCommentReplay = () => {
    setIsCommentReplay(!isCommentReplay);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="">
            <img
              className="h-9 w-9 rounded-full"
              src="https://th.bing.com/th/id/OIP.6m6AZ7QHFj5JUAc6eWE6CQHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt=""
            />
          </div>
          <div className="ml-3 ">
            <p>
              <span>username</span>
              <span>nice post</span>
            </p>
            <div className="flex items-center space-x-3 text-xs opacity-60">
              <span>1 min ago</span>
              <span>23 likes</span>
              <button className="">Replay</button>
            </div>
            <div className="flex items-center space-x-3 text-xs opacity-60 pt-5">
              <span>-----</span>
              <button>views replies (8) </button>
            </div>
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
      {[1, 1].map((_, index) => (
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center ml-10">
            <div>
              <img
                className="h-9 w-9 rounded-full"
                src="https://th.bing.com/th/id/OIP.6m6AZ7QHFj5JUAc6eWE6CQHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt=""
              />
            </div>
            <div className="ml-3 ">
              <p>
                <span>username</span>
                <span>nice post</span>
              </p>
              <div className="flex items-center space-x-3 text-xs opacity-60">
                <span>1 min ago</span>
                <span>23 likes</span>
                <button className="">Replay</button>
              </div>
            </div>
          </div>
          {isCommentReplay ? (
            <AiFillHeart
              onClick={handleLikeCommentReplay}
              className="text-xs hover:opacity-50 cursor-pointer text-red-600"
            />
          ) : (
            <AiOutlineHeart
              onClick={handleLikeCommentReplay}
              className="text-xs hover:opacity-50 cursor-pointer"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
