import React from "react";
import ReqUserPostCart from "./ReqUserPostCart";

const ReqUserPostPart = ({ postItem }) => {
  return (
    <div>
      <div className="flex flex-wrap">
        {postItem?.map((item) => (
          <ReqUserPostCart key={item.postId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ReqUserPostPart;
