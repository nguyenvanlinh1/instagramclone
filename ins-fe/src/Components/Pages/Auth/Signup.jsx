import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../State/AuthApi/Action";

const Signup = () => {
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

  const handleSignup = () => {
    dispatch(signup(data));
    navigate("/home")
}
console.log(data)
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
            <Button
              width="full"
              borderRadius="20px"
              bgColor="blue.200"
              onClick={handleSignup}
            >
              Sign up
            </Button>
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
            Sign up?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
