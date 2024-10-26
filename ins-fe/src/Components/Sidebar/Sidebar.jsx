import React, { useEffect, useRef, useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { mainSide } from "./SidebarConfig";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "../Post/CreatePostModal";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import Search from "../Search/Search";
import { FaInstagram } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../State/AuthApi/Action";

const Sidebar = () => {
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("");
  const [previousTab, setPreviousTab] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSidebar, setIsSiderbar] = useState(false);

  const sidebarRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Nếu click ra ngoài sidebar, set isSearchVisible và isSidebar thành false
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Nếu activeTab là "Search", đặt lại activeTab thành previousTab
        if (activeTab === "Search" && previousTab === "Message") {
          setActiveTab(previousTab); // Trở về tab trước đó
          setIsSearchVisible(false); // Ẩn thanh tìm kiếm
          setIsSiderbar(true); // Hiển thị sidebar
        } else if (activeTab === "Message") {
          setIsSearchVisible(false); // Ẩn thanh tìm kiếm
          setIsSiderbar(true); // Hiển thị sidebar
        } else {
          setIsSiderbar(false);
        }
      }
    };

    // Gắn sự kiện khi click chuột
    document.addEventListener("mousedown", handleClickOutside);
    // Dọn dẹp sự kiện khi component bị unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeTab, previousTab]);

  const handleTabClick = (title) => {
    setActiveTab(setPreviousTab);
    setActiveTab(title);
    if (title === "Profile") {
      navigate(`/${user?.user.data?.result?.username}`);
    } else if (title === "Home") {
      navigate("/");
      setIsSearchVisible(false);
      setIsSiderbar(false);
    } else if (title === "Create") {
      onOpen();
    } else if (title === "Reels") {
      navigate("/reels");
      setIsSearchVisible(false);
      setIsSiderbar(false);
    } else if (title === "Search") {
      setIsSearchVisible(true);
      setIsSiderbar(true);
    } else if (title === "Message") {
      navigate("/message");
      setIsSiderbar(true);
      setIsSearchVisible(false);
    } else {
      setIsSearchVisible(false);
      setIsSiderbar(false);
      navigate("/");
    }
  };

  const handleClick = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    }, 1000)
  };

  return (
    <div
      ref={sidebarRef}
      className="sticky top-0 h-[100vh] pl-5 border-r border-r-slate-300"
    >
      {isSidebar ? (
        <div className="flex justify-start h-full w-[200%]">
          <div className="flex flex-col justify-between h-full">
            <div className="mt-5">
              <FaInstagram className="text-4xl" />
            </div>
            <div className="mt-10">
              {mainSide.map((item, index) => (
                <div
                  className="flex items-center cursor-pointer text-3xl mb-5"
                  key={index}
                  onClick={() => handleTabClick(item.title)}
                >
                  {activeTab === item.title ? item.activeIcon : item.icon}
                </div>
              ))}
            </div>
            <Menu>
              <MenuButton colorScheme="pink">
                <div className="flex items-center cursor-pointer pb-10 font-semibold">
                  <IoReorderThreeOutline className="text-5xl" />
                </div>
              </MenuButton>
              <MenuList>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Your Activity</MenuItem>
                <MenuItem>Saved</MenuItem>
                <MenuItem>Switch Appearence</MenuItem>
                <MenuItem>Report a problem</MenuItem>
                <MenuDivider />
                <MenuItem>Threads</MenuItem>
                <MenuDivider />
                <MenuItem>Switch Account</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleClick}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
          {isSearchVisible ? (
            <div className="flex z-10">
              <Search />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="mt-5">
            <img
              className="w-40"
              src="https://th.bing.com/th/id/OIP.DexBeSiGPUP4igHscKierwHaCi?rs=1&pid=ImgDetMain"
            ></img>
          </div>
          <div className="mt-10">
            {mainSide.map((item, index) => (
              <div
                className="flex items-center mb-5 cursor-pointer text-3xl"
                key={index}
                onClick={() => handleTabClick(item.title)}
              >
                {activeTab === item.title ? item.activeIcon : item.icon}
                <p
                  className={`ml-3 text-lg ${
                    activeTab === item.title ? "font-bold" : "font-semibold"
                  }`}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          <Menu>
            <MenuButton colorScheme="pink">
              <div className="flex items-center cursor-pointer pb-10 font-semibold">
                <IoReorderThreeOutline className="text-5xl" /> More
              </div>
            </MenuButton>
            <MenuList>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Your Activity</MenuItem>
              <MenuItem>Saved</MenuItem>
              <MenuItem>Switch Appearence</MenuItem>
              <MenuItem>Report a problem</MenuItem>
              <MenuDivider />
              <MenuItem>Threads</MenuItem>
              <MenuDivider />
              <MenuItem>Switch Account</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleClick}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      )}

      <CreatePostModal onClose={onClose} isOpen={isOpen} />
    </div>
  );
};

export default Sidebar;
