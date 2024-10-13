import React from "react";

const SaveArticleCard = ({datasave}) => {
  return (
    <div>
      <div className="h-[200%] border border-stone-300">
        <div className="relative">
          <div className="grid grid-cols-2">
            {datasave?.slice(0, 4).map((item, index) => (
              <img
                className="cursor-pointer object-cover h-40 w-full"
                key={index}
                src={item.imageList[0].imageUrl}
              ></img>
            ))}
          </div>
          <div className="">
            <div className="absolute top-72 left-10">
              <span className="font-semibold text-xl text-[#333]">All posts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveArticleCard;
