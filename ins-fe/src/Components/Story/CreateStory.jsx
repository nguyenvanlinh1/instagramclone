import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import { FaPhotoVideo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createStory, getAllStoryByUser } from "../../State/Story/Action";

const CreateStory = ({ isOpen, onClose }) => {
  const { story } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getAllStoryByUser());
  }, []);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [data, setData] = useState({
    caption: "",
    images: [{ imageUrl: "" }],
  });

  const handleFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file.type.startWith("image/") || file.type.startWith("video/")) {
      setFile(file);
    }
  };

  const handleText = (e) => {
    setData({
      ...data,
      caption: e.target.value,
    });
  };

  const handleImage = async (e) => {
    const image = e.target.files[0];
    const url = await uploadToCloudinary(image);
    setData((prev) => ({
      ...prev,
      images: prev.images.map((img, index) =>
        index === 0 ? { ...img, imageUrl: url } : img
      ),
    }));
    setFile(image);
  };

  const handleCreateStory = (req) => {
    dispatch(createStory(req));
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Story</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="space-y-2">
              {!file && (
                <div className="drag-drop h-full" onDrop={handleFile}>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <FaPhotoVideo className="text-5xl" />
                    <p>Drag Photos or Video here</p>
                    <Button bgColor="#0095F6">
                      <label htmlFor="file_upload">Change Photo</label>
                      <input
                        type="file"
                        id="file_upload"
                        style={{ display: "none" }}
                        multiple
                        accept="video/*, image/*"
                        name="imageUrl"
                        onClick={handleImage}
                      ></input>
                    </Button>
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
            <div className="mt-2">
              <Textarea
                placeholder="Write a caption"
                name="caption"
                onChange={handleText}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleCreateStory(data)}
            >
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateStory;
