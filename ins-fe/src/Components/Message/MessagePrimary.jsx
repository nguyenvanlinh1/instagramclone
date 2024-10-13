import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import MessageContent from "./MessageContent";
import { useNavigate } from "react-router-dom";

const MessagePrimary = ({ item }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const { message, user } = useSelector((store) => store);
  const [stompClient, setStompClient] = useState();
  const [isConnect, setIsConnect] = useState(false);
  const [isMessage, setIsMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("Hello");

  // const connect = () => {
  //   const Sock = new SockJS("http:localhost:8888/websocket");
  //   const temp = over(Sock);
  //   console.log(temp)
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //     "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
  //   }
  //   setStompClient(temp);
  //   temp.connect({headers}, onConnect, onError);
  // };
  // function getCookie(name) {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) {
  //     return parts.pop().split(";").shift();
  //   }
  //   console.log(`${name} không tồn tại trong cookie`);
  // }

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
    console.log("Connected Websocket");
    setIsConnect(true);
    stompClient.subscribe("/group", (message) => {
      if (message.body) {
        console.log("Received message:", JSON.parse(message.body));
        const receivedMessage = JSON.parse(message.body);
        setIsMessage((prevMessages) => [...prevMessages, receivedMessage]);
      }
    });
  };

  useEffect(() => {
    if (message.message && stompClient) {
      setIsMessage([...isMessage, isMessage.message]);
      stompClient?.send("/app/message", {}, JSON.stringify(message.message));
    }
  }, [message.message]);

  const onMessageReceive = (payload) => {
    console.log("Receive message", JSON.parse(payload.body));
    const receivedMessage = JSON.parse(payload.body);
    setIsMessage([...message, receivedMessage]);
  };

  useEffect(() => {
    if (isConnect && stompClient && user.user && item) {
      const subscription = stompClient.subscribe(
        "/group/public" + item.chatId,
        onMessageReceive
      );
      console.log("ABC");
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnect]);

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    setIsMessage(message.messages);
  }, [message.messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: "/app/message",
        body: JSON.stringify({ content: newMessage }),
      });
      console.log(newMessage);
    }
    setNewMessage("");
  };

  console.log(item);

  const handleShowMessage = (chatId) => {
    navigate(`/message/${chatId}`)
  }

  return (
    <div>
      {item?.map((itemChat, index) => (
        <div
          key={index}
          className="flex space-x-3 ml-5 p-3 cursor-pointer"
          onClick={() => handleShowMessage(itemChat?.chatId)}
        >
          <img
            className="w-12 h-12 rounded-full"
            src="https://th.bing.com/th/id/OIP.b5edp1KXoRzsAFa0F68cFAHaLH?w=204&h=306&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          ></img>
          <div className="flex flex-col">
            <p>{itemChat?.createdBy?.username}</p>
            <p>send a message</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagePrimary;
