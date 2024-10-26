import React from "react";
import ReelItem from "./ReelItem";

const Reels = () => {
  return (
    <div className="">
      {[1, 1, 1, 1, 1, 1].map((_, index) => (
        <ReelItem key={index} />
      ))}
    </div>
  );
};

export default Reels;
