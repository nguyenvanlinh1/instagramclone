import React, { useState } from "react";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import ReqUserPostCart from "./ReqUserPostCart";
import { useNavigate } from "react-router-dom";
import SaveArticleCard from "../SaveArticle/SaveArticleCard";
import TaggedCard from "../TaggedArticle/TaggedCard";

const ReqUserPostPart = () => {
  return (
    <div>
      <div>
        <div className="flex flex-wrap">
          {[1, 1, 1, 1, 1].map((index) => (
            <ReqUserPostCart key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReqUserPostPart;
