import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unFollowUser } from "../../../State/Follow/Action";
import FollowedCard from "./FollowedCard";

const ListFollowed = ({ onClose, isOpen, followed, follow }) => {
  const [isActive, setIsActive] = useState("people");
  const handleClick = (value) => {
    setIsActive(value);
  };
  const dispatch = useDispatch();

  const handleFollow = (req) => {
    dispatch(unFollowUser(req));
  };

  return (
    <div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">Following</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid grid-cols-2 mb-2">
              <p
                className={`p-2 text-center cursor-pointer ${
                  isActive === "people" ? "border-b border-b-black" : " "
                }`}
                onClick={() => handleClick("people")}
              >
                People
              </p>
              <p
                className={`p-2 text-center cursor-pointer ${
                  isActive !== "people" ? "border-b border-b-black" : " "
                }`}
                onClick={() => handleClick("hashtags")}
              >
                Hashtags
              </p>
            </div>
            {isActive === "people" ? (
              <>
                {" "}
                <Input borderRadius="20px" placeholder="Search ..." />
                {followed?.result?.map((item, index) => (
                  <FollowedCard key={index} follow={follow} item={item}/>
                ))}{" "}
              </>
            ) : (
              ""
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ListFollowed;
