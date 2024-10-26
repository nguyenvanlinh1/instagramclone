import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../State/Follow/Action";
import { useNavigate } from "react-router-dom";

const SuggetionCard = ({ item }) => {
  const { follow } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFollow = () => {
    dispatch(followUser(item.userId));
  };

  const handleProfile = (username) => {
    navigate(`/${username}`)
  }
  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-3">
        <img
          className="w-9 h-9 rounded-full cursor-pointer"
          src={
            item.userImage
              ? item.userImage
              : "https://hzshop.ir/img/accountimg.png"
          }
          alt=""
          onClick={() => handleProfile(item.username)}
        />
        <div>
          <p className="text-sm font-semibold">{item.username}</p>
          <p className="text-sm font-semibold opacity-70">Follows you</p>
        </div>
      </div>
      <p
        className="text-blue-700 hover:opacity-50 cursor-pointer"
        onClick={handleFollow}
      >
        Follow
      </p>
    </div>
  );
};

export default SuggetionCard;
