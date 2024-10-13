import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserChat } from "../../State/Message/Logic";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteChat } from "../../State/Chat/Action";

const MessagePrimary = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const {user} = useSelector(store => store);
  const uu = user.user.data?.result;

  const handleShowMessage = (chatId) => {
    navigate(`/message/${chatId}`);
  };

  const handleDeleteChat = (chatId) => {
    dispatch(deleteChat(chatId));
  };


  console.log(item)

  return (
    <div>
      {item?.map((itemChat, index) => (
        <div className="flex items-center justify-between px-3" key={index}>
          <div
            className="flex space-x-3 ml-5 p-3 cursor-pointer"
            onClick={() => handleShowMessage(itemChat?.chatId)}
          >
            <img
              className="w-12 h-12 rounded-full"
              src={
                uu?.userId === itemChat?.users[0]?.userId
                  ? itemChat?.users[1]?.userImage ||
                    "https://hzshop.ir/img/accountimg.png"
                  : itemChat?.users[0]?.userImage ||
                    "https://hzshop.ir/img/accountimg.png"
              }
            ></img>
            <div className="flex flex-col">
              <p>{(itemChat?.chatName).split("_")[0]}</p>
              <p>send a message</p>
            </div>
          </div>
          <div>
            <Button sx={{bgColor:"white", }} onClick={onOpen}>
              <HiDotsHorizontal />
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Chat
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure you want to delete this conversation?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      ml={3}
                      onClick={() => handleDeleteChat(itemChat?.chatId)}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagePrimary;
