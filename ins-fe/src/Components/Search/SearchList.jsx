import React from "react";
import { MdCancel } from "react-icons/md";

const SearchList = ({item}) => {
    console.log(item)
  return (
    <div>
      {item.map((item, index) => (
        <div className="mt-5">
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <img
                  className="w-12 h-12 rounded-full"
                  src={
                    item.userImage
                      ? item.userImage
                      : "https://hzshop.ir/img/accountimg.png"
                  }
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p>{item.fullName}</p>
                <p className="opacity-60">{item.username}</p>
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
