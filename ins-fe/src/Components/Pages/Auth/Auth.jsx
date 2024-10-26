import React from "react";
import "./Auth.css";
import Signin from "./Signin";

const Auth = () => {
  return (
    <div>
      <div>
        <div className="grid grid-cols-2 h-[100vh]">
          <div className="flex justify-center items-center">
            <div className="mobileWallpaper bg-contain w-full h-[75vh] bg-center"></div>
          </div>
          <div className="flex justify-center items-center">
            <Signin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
