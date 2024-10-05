import React, { useState } from "react";
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

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleTabClick = (title) => {
    setActiveTab(title);
    if (title === "Profile") {
      navigate("/username");
    } else if (title === "Home") {
      navigate("/");
    } else if (title === "Create") {
      onOpen();
    } else if (title === "Search") {
      setIsSearchVisible(true);
    } else {
      setIsSearchVisible(false);
    }
  };
  return (
    <div className="sticky top-0 h-[100vh] pl-5 w-[200%]">
      {isSearchVisible ? (
        <div className="flex justify-start h-full">
          <div className="flex flex-col justify-between h-full">
            <div className="mt-5">
              <FaInstagram className="text-5xl" />
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
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="flex z-10">
            <Search />
          </div>
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
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      )}

      <CreatePostModal onClose={onClose} isOpen={isOpen} />
    </div>
  );
};

export default Sidebar;
