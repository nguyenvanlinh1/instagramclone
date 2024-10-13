import { Box, CircularProgress } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Authenticate = () => {

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const authCodeRegex = /code=([^&]+)/;
        const isMatch = window.location.href.match(authCodeRegex);
        if(isMatch){
            const authCode = isMatch[1];
            fetch(
                `http://localhost:8888/auth/outbound/authentication?code=${authCode}`, {
                    method: "POST"
                }
            )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("accessToken", data?.result?.token)
                setIsLogin(true);
            })
        }
    }, [])


    useEffect(() => {
        if(isLogin){
            navigate("/")
        }
    }, [isLogin, navigate]);

  return (
    <div>
      <Box as="button" borderRadius="md" bg="tomato" color="white" px={4} h={8}>
        <CircularProgress isIndeterminate color="green.300"></CircularProgress>
        <p>Please wait!!! Authenticating...</p>
      </Box>
    </div>
  );
};

export default Authenticate;
