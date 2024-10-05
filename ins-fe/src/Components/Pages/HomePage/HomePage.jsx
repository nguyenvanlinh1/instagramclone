import React from "react";
import StoryCircle from "../../Story/StoryCircle";
import HomeRight from "../../HomeRight/HomeRight";
import PostCard from "../../Post/PostCard";
import { useDisclosure } from "@chakra-ui/react";
import Progressbar from "../../Story/Progressbar";

const HomePage = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <div>
      <div className="mt-10 flex w-[100%]">
        <div className="w-[55%] px-20">
          <div className="storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full">
            {[1, 1, 1, 1].map((_,index) => (
              <StoryCircle key={index} />
            ))}
          </div>
          <div className="space-y-5 w-full mt-10">
            {[1, 1, 1, 1].map((_,index) => (
              <PostCard key={index}/>
            ))}
          </div>
        </div>
        <div className="w-[45%] px-20">
          <HomeRight />
        </div>
        {/* <Progressbar/> */}
      </div>
    </div>
  );
};

export default HomePage;
