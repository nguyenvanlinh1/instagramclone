import React, { useEffect, useState } from "react";
import StoryViewer from "../../Story/StoryViewer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllStoryByUsername } from "../../../State/Story/Action";

const StoryMain = () => {
  const {story} = useSelector(store => store);
  const param = useParams();
  const dispatch = useDispatch();
  const [storyViewerKey, setStoryViewerKey] = useState(0);

  useEffect(() => {
    dispatch(getAllStoryByUsername(param.username))
  },[param.username, storyViewerKey, story.story])

  const handleStoryChange = () => {
    setStoryViewerKey((prev) => prev + 1);
  };

  return (
    <div>
      <StoryViewer storyItem={story.stories.data?.result} onStoryChange={handleStoryChange}/>
    </div>
  );
};

export default StoryMain;
