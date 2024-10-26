import React, { useEffect, useState } from "react";
import Progressbar from "./Progressbar";
import { Input } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { likeStory, unLikeStory } from "../../State/Story/Action";
import { isLikedStory } from "../../State/Story/Logic";

const StoryViewer = ({ storyItem, onStoryChange }) => {
  const [isStoryLiked, setIsStoryLiked] = useState(false);
  const {user} = useSelector(store => store);

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const dispatch = useDispatch();
  
  const handleNextStory = () => {
    if (currentStoryIndex < storyItem.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex + 1);
    } else if (currentStoryIndex === storyItem.length - 1) {
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  };
  
  useEffect(() => {
    setIsStoryLiked(isLikedStory(storyItem[currentStoryIndex], user.user.data?.result.userId))
  }, [currentStoryIndex])

  const handleLikeStory = () => {
    if(isStoryLiked){
      dispatch(unLikeStory(storyItem[currentStoryIndex]?.storyId));
    }
    else{
      dispatch(likeStory(storyItem[currentStoryIndex]?.storyId));
    }
    onStoryChange();
    setIsStoryLiked(!isStoryLiked);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextStory();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentStoryIndex]);

  return (
    <div className="relative w-full flex justify-center bg-black space-x-5">
      <div className="flex justify-center flex-col items-center h-[100vh] w-[30%] space-y-3">
        <img
          className="w-full h-[500px] object-cover"
          src={storyItem[currentStoryIndex]?.imageList[0].imageUrl}
        ></img>
        <div className={`absolute top-0 left-0 w-full flex`}>
          {storyItem?.map((_, index) => (
            <Progressbar
              index={index}
              duration={5000}
              activeIndex={activeIndex}
              key={index}
            />
          ))}
        </div>
        <p className="text-white">{storyItem[currentStoryIndex]?.caption}</p>
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
              <AiOutlineHeart className="text-3xl" onClick={handleLikeStory} />
            )}
            <p>{storyItem[currentStoryIndex]?.likedStoryByUser.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
