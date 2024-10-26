import React, { useEffect, useState } from "react";
import "./Progressbar.css"
const Progressbar = ({ index, activeIndex, duration }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      },);
    }, duration / 100);
    return () => {
      clearInterval(interval);
    };
  }, [duration, activeIndex]);
  
  const isActive = (index === activeIndex);

  return (
    <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
      <div
        className={isActive ? "progress-bar" : ""}
        style={{width: `${progress}%`}}
      ></div>
    </div>
  );
};

export default Progressbar;
