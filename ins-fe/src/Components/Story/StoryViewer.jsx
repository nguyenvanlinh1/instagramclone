import React, { useEffect, useState } from "react";
import Progressbar from "./Progressbar";
import { Input } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllStoryByUsername, likeStory, unLikeStory } from "../../State/Story/Action";
import { isLikedStory } from "../../State/Story/Logic";
import { useParams } from "react-router-dom";

const StoryViewer = ({ stories }) => {
  const { story, user } = useSelector((store) => store);
  const { username } = useParams();
  // useEffect(() => {
  //   if (username) {
  //     dispatch(getAllStoryByUsername(username));
  //   } else {
  //     console.log("No username found in params");
  //   }
  // }, [username, story.story]);

  const [isStoryLiked, setIsStoryLiked] = useState(false);
  console.log(isStoryLiked)

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex + 1);
    } else if (currentStoryIndex === stories.length - 1) {
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    if (stories && stories.length > 0) {
      console.log(stories.length)
      setIsStoryLiked(
        isLikedStory(stories[currentStoryIndex], user.user.data?.result.userId)
      );
    }
  }, [stories, currentStoryIndex, user.user.data?.result.userId]);

  const handleLikeStory = () => {
    if (isStoryLiked) {
      dispatch(unLikeStory(stories[currentStoryIndex]?.storyId));
    } else {
      dispatch(likeStory(stories[currentStoryIndex]?.storyId));
    }
    setIsStoryLiked(!isStoryLiked);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextStory();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentStoryIndex]);

  console.log(currentStoryIndex);

  return (
    <div className="">
      {stories ? (
        <div className="relative w-full flex justify-center bg-black space-x-5">
          {" "}
          <div className="flex justify-center flex-col items-center h-[100vh] w-[30%] space-y-3">
            <img
              className="w-full h-[500px] object-cover"
              src={stories[currentStoryIndex]?.imageList[0].imageUrl}
            ></img>
            <div className={`absolute top-0 left-0 w-full flex`}>
              {stories && stories?.map((_, index) => (
                <Progressbar
                  index={index}
                  duration={3000}
                  activeIndex={activeIndex}
                  key={index}
                />
              ))}
            </div>
            <p className="text-white">{stories[currentStoryIndex]?.caption}</p>
            <Input
              placeholder="Replay to story..."
              borderRadius="25px"
              textColor="whiteAlpha.900"
            ></Input>
          </div>
          <div className="flex flex-col items-center justify-center w-8">
            <div>
              <div className="text-2xl text-white flex items-center flex-col">
                {isStoryLiked ? (
                  <AiFillHeart
                    className="text-3xl text-red-600"
                    onClick={handleLikeStory}
                  />
                ) : (
                  <AiOutlineHeart
                    className="text-3xl"
                    onClick={handleLikeStory}
                  />
                )}
                <p>{stories[currentStoryIndex]?.likedStoryByUser.length}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="font-bold text-2xl text-white">No stories have been uploaded yet.</p>
        </div>
      )}
    </div>
  );
};

export default StoryViewer;
