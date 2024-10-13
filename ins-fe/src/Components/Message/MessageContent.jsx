import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { BsCameraVideoFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findChatById } from "../../State/Chat/Action";
import { getUserChat } from "../../State/Message/Logic";

const MessageContent = () => {
  const [isUser, setIsUser] = useState({});
  const { chat } = useSelector((store) => store);
  const dispatch = useDispatch();
  const param = useParams();
  useEffect(() => {
    dispatch(findChatById(param.chatId));
  }, [param]);

  const cc = chat.chat.data?.result;

  useEffect(() => {
    if (cc) {
      setIsUser(getUserChat(cc?.createBy, cc?.users, cc.group));
    }
  }, []);

  console.log("ABC", isUser);

  return (
    <div>
      <div>
        {isUser ? (
          <div>
            <div className="flex justify-between border-b border-b-slate-300">
              <div className="flex items-center space-x-2 p-5">
                <img
                  className="w-12 h-12 rounded-full"
                  src={isUser.userImage ? isUser.userImage : "https://hzshop.ir/img/accountimg.png"}
                ></img>
                <p></p>
                <BsFillPatchCheckFill className="text-blue-600" />
              </div>
              <div className="text-3xl flex items-center space-x-5 p-5">
                <FaPhone />
                <BsCameraVideoFill />
                <AiFillInfoCircle />
              </div>
            </div>
            <div className="flex flex-col items-center mt-8">
              <img
                className="w-24 h-24 rounded-full"
                src={isUser.userImage ? isUser.userImage : "https://hzshop.ir/img/accountimg.png"}
              ></img>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-2xl">{isUser.fullName}</p>
                <BsFillPatchCheckFill className="text-blue-600 text-xl" />
              </div>
              <div className="mb-5">
                <p className="font-thin">{isUser.username} · Instagram</p>
              </div>
              <Button colorScheme="yellow" size="md">
                View Profile
              </Button>
            </div>
            <div className="h-[43vh] scroll-smooth">
              <div class="flex items-start gap-2.5">
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://th.bing.com/th/id/OIP.fWYUvmImpkTbvB7j7vXB0gHaEu?rs=1&pid=ImgDetMain"
                  alt="Jese image"
                />
                <div class="flex flex-col gap-1 w-full max-w-[320px]">
                  <div class="flex items-center space-x-2 rtl:space-x-reverse">
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">
                      Bonnie Green
                    </span>
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                      11:46
                    </span>
                  </div>
                  <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p class="text-sm font-normal text-gray-900 dark:text-white">
                      {" "}
                      That's awesome. I think our users will really appreciate
                      the improvements.
                    </p>
                  </div>
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Delivered
                  </span>
                </div>
              </div>
              <div class="flex justify-end items-start gap-2.5">
                <div class="flex flex-col gap-1 w-full max-w-[320px] text-right">
                  <div class="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                      11:46
                    </span>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">
                      Bonnie Green
                    </span>
                  </div>
                  <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-se-xl dark:bg-gray-700">
                    <p class="text-sm font-normal text-gray-900 dark:text-white">
                      That's awesome. I think our users will really appreciate
                      the improvements.
                    </p>
                  </div>
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Delivered
                  </span>
                </div>
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://th.bing.com/th/id/OIP.fWYUvmImpkTbvB7j7vXB0gHaEu?rs=1&pid=ImgDetMain"
                  alt="Jese image"
                />
              </div>
            </div>
            <div className="p-5 sticky">
              <InputGroup>
                <InputLeftElement width="3rem">
                  <Button
                    h="3rem"
                    size="md"
                    bg="none"
                    _hover="none"
                    _active="none"
                    mt="2"
                  >
                    <BsEmojiSmile />
                  </Button>
                </InputLeftElement>
                <Input
                  borderRadius={50}
                  border="1px"
                  variant="outline"
                  placeholder="Messages..."
                  size="lg"
                ></Input>
                <InputRightElement width="8rem">
                  <Button
                    h="3rem"
                    size="md"
                    bg="none"
                    _hover="none"
                    _active="none"
                    mt="2"
                  >
                    <FaMicrophone />
                  </Button>
                  <Button
                    h="3rem"
                    size="md"
                    bg="none"
                    _hover="none"
                    _active="none"
                    mt="2"
                  >
                    <FaImage />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MessageContent;
