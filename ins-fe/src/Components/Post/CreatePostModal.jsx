import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModal.css";
import { GrEmoji } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../State/Post/Action";

const CreatePostModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const {user} = useSelector(store => store);
  const [file, setFile] = useState();
  const [isDragOver, setIsDragOver] = useState(false);
  const [caption, setCaption] = useState();
  const [data, setData] = useState({
    caption: "",
    location: "",
    images: [{ imageUrl: "" }],
    status: "Public",
  });

  const handleText = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCaption(e.target.value)
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
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

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (
      (file && file.type.startsWith("image/")) ||
      file.type.startsWith("video/")
    ) {
      const url = await uploadToCloudinary(file);
      setData((prev) => ({
        ...prev,
        images: prev.images.map((img, index) =>
          index === 0 ? { ...img, imageUrl: url } : img
        ),
      }));
      setFile(file);
    } else {
      setFile(null);
      alert("Please select an image");
    }
  };

  const handleShare = (req) => {
      dispatch(createPost(req));
  } 

  return (
    <div>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <div className="flex justify-center py-1 px-10 items-center">
            <p className="font-semibold text-xl">Create New Post</p>
          </div>
          <ModalCloseButton/>
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
                        multiple
                        accept="image/*, video/*"
                        onChange={handleImage}
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
              <div className="w-[50%] space-y-5">
                <div className="flex items-center px-2">
                  <img
                    className="w-7 h-7 rounded-full"
                    src={user.user.data?.result?.userImage ? user.user.data?.result?.userImage :"https://hzshop.ir/img/accountimg.png"}
                    alt=""
                  />
                  <p className="font-semibold ml-4">{user.user.data?.result?.username}</p>
                </div>
                <div className="p-2">
                  <textarea
                    className="captionInput"
                    name="caption"
                    id=""
                    rows={8}
                    placeholder="Write a caption..."
                    onChange={handleText}
                  ></textarea>
                </div>
                <div className="flex justify-between px-2">
                  <GrEmoji />
                  <p>{caption?.length} / 2000</p>
                </div>
                <hr />
                <div className="px-3">
                  <InputGroup size="md">
                    <Input name="location" onChange={handleText} placeholder="Location..." />
                    <InputRightAddon><FaLocationDot /></InputRightAddon>
                  </InputGroup>
                </div>
                <div className="px-3">
                  <Select
                    name="status"
                    onChange={handleText}
                    value={data.status}
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </Select>
                </div>
                <div className="flex justify-center p-5">
                  <Button size="md" colorScheme={"blue"} onClick={() => handleShare(data)}>
                    Share
                  </Button>
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
