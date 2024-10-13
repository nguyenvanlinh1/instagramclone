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

const ListFollowed = ({ onClose, isOpen, followed }) => {
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
                  <div
                    className="flex justify-between items-center mt-5"
                    key={index}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        className="w-12 h-12 rounded-full"
                        src={
                          item?.userImage
                            ? item?.userImage
                            : "https://hzshop.ir/img/accountimg.png"
                        }
                        alt=""
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-md font-semibold">
                            {item.username}
                          </p>
                        </div>
                        <p className="">{item.fullName}</p>
                      </div>
                    </div>
                    <Button
                      bgColor="#0095f6"
                      borderRadius="20px"
                      textColor="whiteAlpha.900"
                      _hover={{ textColor: "black" }}
                      onClick={() => handleFollow(item.userId)}
                    >
                      Unfollow
                    </Button>
                  </div>
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
