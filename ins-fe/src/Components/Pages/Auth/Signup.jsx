import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../State/AuthApi/Action";

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    fullname: "",
  });

  console.log(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true)
    dispatch(signup(data));
    setTimeout(() => {
      setLoading(false)
      navigate("/");
    }, 2000);
  };
  console.log(data);
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="">
        <div className="flex flex-col p-8 border border-stone-200">
          <div className="flex justify-center items-center mb-5">
            <img
              className="w-[50%] h-[50%]"
              src="https://th.bing.com/th/id/OIP.DexBeSiGPUP4igHscKierwHaCi?w=329&h=120&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            ></img>
          </div>
          <p className="font-semibold opacity-70 text-center pb-5">
            Sign up to see photos and videos from your friends.
          </p>
          <div className="flex items-center justify-center bg-blue-500 rounded-lg">
            <FcGoogle className="text-2xl" />
            <Button
              colorScheme="blue"
              border="none"
              _hover="none"
              _active="none"
              bg="none"
              textColor="white"
            >
              Log in with Google
            </Button>
          </div>
          <div className="flex flex-col-3 items-center justify-between w-full py-5">
            <p>-------------------------</p>
            <p>OR</p>
            <p>-------------------------</p>
          </div>
          <div className="space-y-5">
            <Input
              placeholder="email..."
              size="md"
              name="email"
              onChange={handleChange}
            />
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Input
              placeholder="fullname..."
              size="md"
              name="fullname"
              onChange={handleChange}
            />
            <Input
              placeholder="username..."
              size="md"
              name="username"
              onChange={handleChange}
            />
            {loading ? (
              <button
                type="button"
                class="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="mr-2 animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
                loading
              </button>
            ) : (
              <Button
                width="full"
                borderRadius="20px"
                bgColor="blue.200"
                onClick={handleSignup}
              >
                Sign up
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center p-3 mt-5 border border-stone-200">
          <p>Don't have an account?</p>
          <Button
            colorScheme="blue"
            border="none"
            _hover="none"
            _active="none"
            bg="none"
            textColor="blue.600"
            onClick={() => navigate("/login")}
          >
            Sign in?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
