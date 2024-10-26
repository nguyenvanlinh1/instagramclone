import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import "./ReqUserPostCard.css";

const ReqUserPostCart = ({item}) => {
  return (
    <div className="p-1">
      <div className="post w-72 h-72">
        <img
          className="cursor-pointer"
          src={item?.imageList[0].imageUrl}
        ></img>
        <div className="overlay">
          <div className="overlay-text flex justify-between">
            <div>
              <AiFillHeart /><span>{item?.likedByUsers.length}</span>
            </div>
            <div>
              <FaComment /><span>{item?.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqUserPostCart;
