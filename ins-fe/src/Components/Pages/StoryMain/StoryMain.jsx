import React from "react";
import StoryViewer from "../../Story/StoryViewer";

const StoryMain = () => {
  const story = [
    {
      image:
        "https://th.bing.com/th/id/OIP.mJ1NiAi2HGhUjJU17k4VVAHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.m6qTNQCrpa7YR03CCqWq9gHaJ4?w=206&h=275&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.6m6AZ7QHFj5JUAc6eWE6CQHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];
  return (
    <div>
      <StoryViewer stories={story} />
    </div>
  );
};

export default StoryMain;
