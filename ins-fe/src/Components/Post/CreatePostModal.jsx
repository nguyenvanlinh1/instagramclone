import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModal.css";
import { GrEmoji } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";

const CreatePostModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState();
  const [isDragOver, setIsDragOver] = useState(false);
  const [caption, setCaption] = useState();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.file[0];
    if (
      droppedFile.type.starsWith("image/") ||
      droppedFile.type.starsWith("video/")
    ) {
      setFile(droppedFile);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTranfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (
      (file && file.type.startsWith("image/")) ||
      file.type.startsWith("video/")
    ) {
      setFile(file);
      console.log(file);
    } else {
      setFile(null);
      alert("Please select an image");
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  return (
    <div>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <div className="flex justify-center py-1 px-10 items-center">
            <p className="font-semibold text-xl">Create New Post</p>
            {/* <Button variant={"ghost"} size="sm" colorScheme={"blue"}>
              Share
            </Button> */}
          </div>
          <ModalBody>
            <div className="flex justify-between pb-5 h-[70vh]">
              <div className="w-[50%] flex items-center">
                {!file && (
                  <div
                    className="drag-drop h-full"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <FaPhotoVideo className="text-5xl" />
                      <p>Drag Photos or Video here</p>
                      <label
                        htmlFor="file-upload"
                        className="custom-file-upload"
                      >
                        {" "}
                        Select From Computer
                      </label>
                      <input
                        className="fileInput"
                        type="file"
                        id="file-upload"
                        accept="image/*, video/*"
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                )}
                {file && (
                    <img
                      className="max-h-full w-full"
                      src={URL.createObjectURL(file)}
                      alt=""
                    />
                )}
              </div>
              <div className="border-2 h-full"></div>
              <div className="w-[50%]">
                <div className="flex items-center px-2">
                  <img
                    className="w-7 h-7 rounded-full"
                    src="https://th.bing.com/th/id/OIP.mJ1NiAi2HGhUjJU17k4VVAHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    alt=""
                  />
                  <p className="font-semibold ml-4">username</p>
                </div>
                <div className="p-2">
                  <textarea
                    className="captionInput"
                    name="caption"
                    id=""
                    rows={8}
                    placeholder="Write a caption"
                    onChange={handleCaptionChange}
                  ></textarea>
                </div>
                <div className="flex justify-between px-2">
                  <GrEmoji />
                  <p>{caption?.length} / 2000</p>
                </div>
                <hr />
                <div className="flex items-center justify-between p-2">
                  <input
                    className="locationInput"
                    type="text"
                    placeholder="location"
                    name="location"
                  />
                  <FaLocationDot />
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
