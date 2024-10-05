import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import "./ReqUserPostCard.css";

const ReqUserPostCart = () => {
  return (
    <div className="p-1">
      {/* <div className='flex items-center justify-between pb-5'>
            <div><span className='opacity-70 text-sm'>Only you can see what you've saved</span></div>
            <div className='flex items-center space-x-1 text-blue-700'>
            <FaPlus/>
                <button>New Collection</button>
            </div>
        </div> */}
      <div className="post w-72 h-72">
        <img
          className="cursor-pointer"
          src="https://th.bing.com/th/id/OIP.6m6AZ7QHFj5JUAc6eWE6CQHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        ></img>
        <div className="overlay">
          <div className="overlay-text flex justify-between">
            <div>
              <AiFillHeart /><span>10</span>
            </div>
            <div>
              <FaComment /><span>0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqUserPostCart;
