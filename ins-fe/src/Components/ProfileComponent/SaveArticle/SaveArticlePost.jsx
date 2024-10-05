import React from "react";
import { FaPlus } from "react-icons/fa";
import SaveArticleCard from "./SaveArticleCard";

const SaveArticlePost = () => {
  return (
    <div>
      <div className="flex items-center justify-between pb-5">
        <div>
          <span className="opacity-70 text-sm">
            Only you can see what you've saved
          </span>
        </div>
        <div className="flex items-center space-x-1 text-blue-700">
          <FaPlus />
          <button>New Collection</button>
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-3 gap-2">
          {[1, 1, 1].map((item, index) => (
            <SaveArticleCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaveArticlePost;
