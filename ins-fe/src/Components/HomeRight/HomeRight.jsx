import React, { useState } from "react";
import SuggetionCard from "./SuggetionCard";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FaCircleCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { logout } from "../../State/AuthApi/Action";
import { useNavigate } from "react-router-dom";

const HomeRight = ({ user, unf }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(logout());
      setLoading(false);
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <img
                className="w-12 h-12 rounded-full"
                src={
                  user?.userImage
                    ? user?.userImage
                    : "https://hzshop.ir/img/accountimg.png"
                }
                alt=""
              />
            </div>
            <div className="ml-3">
              <p>{user?.fullName}</p>
              <p className="opacity-60">{user?.username}</p>
            </div>
          </div>
          <Button onClick={onOpen}>Switch</Button>

          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Switch accounts</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                {[1, 1, 1].map((_, index) => (
                  <div
                    className="flex justify-between items-center mt-5"
                    key={index}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        className="w-9 h-9 rounded-full"
                        src="https://th.bing.com/th/id/OIP.mJ1NiAi2HGhUjJU17k4VVAHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                        alt=""
                      />
                      <div>
                        <p className="text-sm font-semibold">username</p>
                      </div>
                    </div>
                    <FaCircleCheck className="text-xl" />
                  </div>
                ))}
              </ModalBody>

              <ModalFooter>
                <div
                  className="w-full flex justify-center"
                  onClick={handleLogout}
                >
                  {loading ? (
                    <div
                      aria-label="Loading..."
                      role="status"
                      className="flex items-center space-x-2"
                    >
                      <svg
                        className="h-20 w-20 animate-spin stroke-gray-500"
                        viewBox="0 0 256 256"
                      >
                        <line
                          x1="128"
                          y1="32"
                          x2="128"
                          y2="64"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="24"
                        ></line>
                        <line
                          x1="195.9"
                          y1="60.1"
                          x2="173.3"
                          y2="82.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="24"
                        ></line>
                        <line
                          x1="224"
                          y1="128"
                          x2="192"
                          y2="128"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="24"
                        ></line>
                        <line
                          x1="195.9"
                          y1="195.9"
                          x2="173.3"
                          y2="173.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="24"
                        ></line>
                        <line
                          x1="128"
                          y1="224"
                          x2="128"
                          y2="192"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="24"
                        ></line>
                        <line
                          x1="60.1"
                          y1="195.9"
                          x2="82.7"
                          y2="173.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="24"
                        ></line>
                        <line
                          x1="32"
                          y1="128"
                          x2="64"
                          y2="128"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="24"
                        ></line>
                        <line
                          x1="60.1"
                          y1="60.1"
                          x2="82.7"
                          y2="82.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="24"
                        ></line>
                      </svg>
                      <span className="text-4xl font-medium text-gray-500">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    <p className="cursor-pointer text-blue-600 font-semibold hover:text-black">
                      Log in to another account
                    </p>
                  )}
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
        <div className="flex justify-between py-5">
          <p>Suggested for you</p>
          <a href="#">See all</a>
        </div>
        <div className="space-y-5">
          {unf?.map((item, index) => (
            <SuggetionCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
