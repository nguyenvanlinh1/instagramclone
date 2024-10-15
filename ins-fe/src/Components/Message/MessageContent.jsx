import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { FaPhone } from "react-icons/fa6";
import { BsCameraVideoFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import { FaFacebookMessenger } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findChatById } from "../../State/Chat/Action";
import {
  createMessage,
  deleteMessage,
  getChatMessage,
} from "../../State/Message/Action";

function timeDifference(pastTime) {
  const currentTime = new Date();
  const pastDate = new Date(pastTime);

  const diffInMs = currentTime - pastDate;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return diffInMinutes + "M";
  } else if (diffInHours < 24) {
    return diffInHours + "H";
  } else {
    return diffInDays + "N";
  }
}

const MessageContent = () => {
  const { chat, message, user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const param = useParams();

  const [stompClient, setStompClient] = useState();
  const [isConnect, setIsConnect] = useState(false);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const connect = () => {
    let sock = new SockJS("http://localhost:8888/websocket");
    const temp = over(sock);

    setStompClient(temp);
    temp.connect({}, onConnect, onError);
  };

  const onError = (error) => {
    console.log("Error connecting to WebSocket", error);
  };

  const onConnect = () => {
    setIsConnect(true);
  };

  useEffect(() => {
    if (message.message && stompClient) {
      setMessages([...messages, message.message.data?.result]);
      stompClient?.send(
        "/app/message",
        {},
        JSON.stringify(message.message.data?.result)
      );
    }
  }, [message.message]);

  useEffect(() => {
    if (
      isConnect &&
      stompClient &&
      user.user &&
      chat.chat.data?.result?.chatId
    ) {
      const subscription = stompClient.subscribe(
        "/group/" + chat.chat.data?.result?.chatId.toString(),
        onMessageReceive
      );
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnect]);

  const onMessageReceive = (payload) => {
    const receivedMessage = JSON.parse(payload.body);
    setMessages([...messages, receivedMessage]);
  };

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    setMessages(message.messages.data?.result);
  }, [message.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [content, setContent] = useState("");
  const handleChangeInput = (e) => {
    setContent(e.target.value);
  };
  useEffect(() => {
    dispatch(findChatById(param.chatId));
  }, [param.chatId]);

  useEffect(() => {
    dispatch(getChatMessage(param.chatId));
  }, [param, message.notification]);

  const cc = chat.chat.data?.result;
  const uu = user.user.data?.result;

  const handleSendMessage = () => {
    dispatch(
      createMessage({
        userId: uu.userId,
        chatId: param.chatId,
        content: content,
      })
    );
    setContent("");
  };

  const handleDeleteMessage = (messageId) => {
    dispatch(deleteMessage(messageId));
  };

  return (
    <div>
      {param.chatId ? (
        <div>
          <div className="flex justify-between border-b border-b-slate-300">
            <div className="flex items-center space-x-2 p-5">
              <img
                className="w-12 h-12 rounded-full"
                src={
                  uu?.userId === cc?.users[0]?.userId
                    ? cc?.users[1]?.userImage ||
                      "https://hzshop.ir/img/accountimg.png"
                    : cc?.users[0]?.userImage ||
                      "https://hzshop.ir/img/accountimg.png"
                }
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
          <div className="overflow-y-auto">
            <div className="flex flex-col items-center mt-8">
              <img
                className="w-24 h-24 rounded-full"
                src={
                  uu?.userId === cc?.users[0]?.userId
                    ? cc?.users[1]?.userImage ||
                      "https://hzshop.ir/img/accountimg.png"
                    : cc?.users[0]?.userImage ||
                      "https://hzshop.ir/img/accountimg.png"
                }
              ></img>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-2xl">
                  {uu?.userId === cc?.users[0].userId
                    ? cc?.users[1].fullName
                    : cc?.users[0].fullName}
                </p>
                <BsFillPatchCheckFill className="text-blue-600 text-xl" />
              </div>
              <div className="mb-5">
                <p className="font-thin">
                  {uu?.userId === cc?.users[0].userId
                    ? cc?.users[1].username
                    : cc?.users[0].username}{" "}
                  · Instagram
                </p>
              </div>
              <Button colorScheme="yellow" size="md">
                View Profile
              </Button>
            </div>
            <div className="h-[43vh]">
              {messages &&
                messages.map((item, index) => {
                  const isSender = item?.sender?.userId !== uu?.userId;
                  return isSender ? (
                    <div className="flex items-start gap-2.5" key={index}>
                      <img
                        className="w-8 h-8 rounded-full"
                        src={
                          item?.sender.userImage
                            ? item?.sender.userImage
                            : "https://hzshop.ir/img/accountimg.png"
                        }
                        alt="User image"
                      />
                      <div className="flex flex-col gap-1 w-full max-w-[320px]">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.sender.username}
                          </span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {timeDifference(item.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between leading-1.5 px-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-se-xl dark:bg-gray-700 group">
                          <p className="text-sm font-normal text-gray-900 dark:text-white">
                            {item.content}
                          </p>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<HiDotsHorizontal />}
                              variant="outline"
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-none"
                            />
                            <MenuList>
                              <MenuItem
                                icon={<MdDelete />}
                                onClick={() =>
                                  handleDeleteMessage(item.messageId)
                                }
                              >
                                Delete
                              </MenuItem>
                              <MenuItem icon={<MdCancel />}>Cancel</MenuItem>
                            </MenuList>
                          </Menu>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex justify-end items-start gap-2.5"
                      key={index}
                    >
                      <div className="flex flex-col gap-1 w-full max-w-[320px] text-right">
                        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {timeDifference(item.createdAt)}
                          </span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.sender.username}
                          </span>
                        </div>
                        <div className="flex items-center justify-between leading-1.5 px-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-se-xl dark:bg-gray-700 group">
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<HiDotsHorizontal />}
                              variant="outline"
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-none"
                            />
                            <MenuList>
                              <MenuItem
                                icon={<MdDelete />}
                                onClick={() =>
                                  handleDeleteMessage(item.messageId)
                                }
                              >
                                Delete
                              </MenuItem>
                              <MenuItem icon={<MdCancel />}>Cancel</MenuItem>
                            </MenuList>
                          </Menu>
                          <p className="text-sm font-normal text-gray-900 dark:text-white">
                            {item.content}
                          </p>
                        </div>
                      </div>
                      <img
                        className="w-8 h-8 rounded-full"
                        src={
                          item?.sender.userImage
                            ? item?.sender.userImage
                            : "https://hzshop.ir/img/accountimg.png"
                        }
                        alt="User image"
                      />
                    </div>
                  );
                })}
            </div>
            <div ref={messagesEndRef}></div>
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
                name="message"
                onChange={handleChangeInput}
                value={content}
              ></Input>
              <InputRightElement width="8rem">
                {content !== "" ? (
                  <Button
                    sx={{
                      bgColor: "white",
                      color: "#0095F6",
                      _hover: { bgColor: "none", color: "red" },
                      mt: "2",
                    }}
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                ) : (
                  <div>
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
                  </div>
                )}
              </InputRightElement>
            </InputGroup>
          </div>
        </div>
      ) : (
        <div className="w-full h-[100vh] flex justify-center items-center flex-col space-y-3">
          <div className="p-8 border border-black rounded-full">
            <FaFacebookMessenger className="text-5xl" />
          </div>
          <p className="font-semibold">Tin nhắn của bạn</p>
          <p className="opacity-70">
            Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm
          </p>
          <Button sx={{ bgColor: "#0095F6" }} variant="solid">
            Send Message
          </Button>
        </div>
      )}
    </div>
  );
};

export default MessageContent;
