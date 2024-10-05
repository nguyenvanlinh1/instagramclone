import React from "react";

const SaveArticleCard = () => {
  return (
    <div>
      <div className="">
        <div className="relative">
          <div className="grid grid-cols-2 border border-slate-300">
            {[1, 2, 3].slice(0, 4).map((item, index) => (
              <img
                className="cursor-pointer object-cover h-40 w-full"
                key={index}
                src="https://th.bing.com/th/id/OIP.6m6AZ7QHFj5JUAc6eWE6CQHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7"
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
