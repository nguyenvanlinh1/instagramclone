import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import Progressbar from "./Progressbar";

const StoryViewerContainner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;

const StoryImage = styled.img`
  max-height: 90vh;
  object-fit: contain;
`;

const StoryViewer = ({ stories }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

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
    const interval = setInterval(() => {
      handleNextStory();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentStoryIndex]);
  return (
    <div className="relative w-full">
      <StoryViewerContainner>
        <StoryImage src={stories?.[currentStoryIndex].image}></StoryImage>
        <div className="absolute top-0 flex w-full ">
          {stories.map((_, index) => (
            <Progressbar
              index={index}
              duration={5000}
              activeIndex={activeIndex}
              key={index}
            />
          ))}
        </div>
      </StoryViewerContainner>
    </div>
  );
};

export default StoryViewer;
