import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import React, { useState } from "react";

const ReelItem = () => {
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handlePostLike = () => {
    setIsPostLiked(!isPostLiked);
  };

  const handleSavePost = () => {
    setIsSaved(!isSaved);
  };
  return (
    <div>
      <div className="w-[50%] flex justify-center items-center mx-auto">
        <div className="w-[55%] mt-5 h-[90%] bg-black">
          <img
            className="w-full h-full object-cover"
            src="https://i.pinimg.com/originals/d4/79/62/d479622dba90ab55f1e84fd980a81f2d.jpg"
            alt=""
          />
        </div>
        <div className="w-[10%] grid grid-rows-2 h-full">
          <div></div>
          <div className="text-xl grid grid-rows-5 gap-4 px-5">
            <div>
              {isPostLiked ? (
                <AiFillHeart
                  className="text-3xl text-red-600"
                  onClick={handlePostLike}
                />
              ) : (
                <AiOutlineHeart className="text-3xl" onClick={handlePostLike} />
              )}
              <p>59</p>
            </div>
            <div>
              <div>
                <FaRegComment className="text-3xl" />
                <p>89</p>
              </div>
            </div>
            <div>
              {isSaved ? (
                <BsBookmarkFill
                  className="text-3xl text-yellow-500"
                  onClick={handleSavePost}
                />
              ) : (
                <BsBookmark onClick={handleSavePost} className="text-3xl" />
              )}
            </div>
            <div>
              <Menu>
                <MenuButton>
                  <HiDotsHorizontal className="text-3xl cursor-pointer hover:opacity-50" />
                </MenuButton>
                <MenuList>
                  <MenuItem sx={{ color: "red" }}>Repost</MenuItem>
                  <MenuDivider />
                  <MenuItem sx={{ color: "blue" }}>Follow </MenuItem>
                  <MenuDivider />
                  <MenuItem>Cancel </MenuItem>
                  <MenuDivider />
                </MenuList>
              </Menu>
            </div>
            <div>
              <img
                className="w-9 h-9 rounded-md border-2 border-black"
                src="https://i.pinimg.com/originals/d4/79/62/d479622dba90ab55f1e84fd980a81f2d.jpg"
              ></img>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default ReelItem;
