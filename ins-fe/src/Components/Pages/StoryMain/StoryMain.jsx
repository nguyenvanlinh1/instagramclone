import React, { useEffect, useState } from "react";
import StoryViewer from "../../Story/StoryViewer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getAllStoryByUsername } from "../../../State/Story/Action";

const StoryMain = () => {
  const { story } = useSelector((store) => store);
  const location = useLocation();
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (username) {
      dispatch(getAllStoryByUsername(username));
    } else {
      console.log("No username found in params");
    }
  }, [location, username, story.story]);

  return (
    <div>
      <StoryViewer stories={story.stories.data?.result} />
    </div>
  );
};

export default StoryMain;
