import React from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SearchList = ({item}) => {
  const navigate = useNavigate();

  const handleClick = (username) => {
    navigate(`/${username}`)
  }
  return (
    <div>
      {item?.map((userItem, index) => (
        <div key={index} className="mt-5 cursor-pointer" onClick={() => handleClick(userItem.username)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <img
                  className="w-12 h-12 rounded-full"
                  src={
                    userItem.userImage
                      ? userItem.userImage
                      : "https://hzshop.ir/img/accountimg.png"
                  }
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p>{userItem.fullName}</p>
                <p className="opacity-60">{userItem.username}</p>
              </div>
            </div>
            <MdCancel className="text-2xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchList;
