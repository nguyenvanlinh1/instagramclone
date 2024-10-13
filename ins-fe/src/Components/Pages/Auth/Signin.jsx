import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin } from "../../../State/AuthApi/Action";
import { OAuthConfig } from "../../../Config/OAuthConfig";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { user } = useSelector((store) => store);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignin = () => {
    dispatch(signin(data));
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleContinueWithGoogle = () => {
    const callbackUri = OAuthConfig.redirectUri;
    const authUri = OAuthConfig.authUri;
    const clientId = OAuthConfig.clientId;

    const targetUrl = `${authUri}?redirect_uri=${encodeURIComponent(
      callbackUri
    )}&response_type=code&client_id=${clientId}&scope=openid%20email%20profile`;

    console.log(targetUrl);

    window.location.href = targetUrl;
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <div className="flex flex-col p-8 border border-stone-200">
        <div className="flex justify-center items-center mb-5">
          <img
            className="w-[50%] h-[50%]"
            src="https://th.bing.com/th/id/OIP.DexBeSiGPUP4igHscKierwHaCi?w=329&h=120&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          ></img>
        </div>
        <div className="space-y-5">
          <Input
            placeholder="username, or email..."
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
          <Button
            width="full"
            borderRadius="20px"
            bgColor="blue.200"
            onClick={handleSignin}
          >
            Login
          </Button>
        </div>
        <div className="flex flex-col-3 items-center justify-between w-full py-5">
          <p>-------------------------</p>
          <p>OR</p>
          <p>-------------------------</p>
        </div>
        <div className="flex items-center justify-center">
          <FcGoogle className="text-2xl" />
          <Button
            colorScheme="blue"
            border="none"
            _hover={{ bg: "none" }}
            _active={{ bg: "none" }}
            bg="none"
            textColor="blue.600"
            onClick={handleContinueWithGoogle}
          >
            Log in with Google
          </Button>
        </div>
        <Button
          colorScheme="blue"
          border="none"
          _hover={{ bg: "none" }}
          _active={{ bg: "none" }}
          bg="none"
          textColor="blue.400"
        >
          Forgot password?
        </Button>
      </div>
      <div className="flex items-center justify-center p-3 mt-5 border border-stone-200">
        <p>Don't have an account?</p>
        <Button
          colorScheme="blue"
          border="none"
          _hover={{ bg: "none" }}
          _active={{ bg: "none" }}
          bg="none"
          textColor="blue.600"
          onClick={() => navigate("/signup")}
        >
          Sign up?
        </Button>
      </div>
    </div>
  );
};

export default Signin;
