import React, { useEffect, useState } from "react";
import "./Progressbar.css"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Progress,
} from "@chakra-ui/react";
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



      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Progress size="xs" isIndeterminate />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal> */}
