import axios from "axios"
import { SIGNIN, SIGNIN_FAIL, SIGNOUT, SIGNUP_FAIL } from "../Type/ActionType";

export const signin = (req) => async (dispatch) => {
    try {
        const data = await axios.post("http://localhost:8888/auth/sign_in", req)
        if(data.data?.result?.token){
            localStorage.setItem("accessToken", data.data?.result?.token);
            dispatch({type:SIGNIN, payload:data})
        } 
    } catch (error) {
        console.log("Error:",error);
        dispatch({type:SIGNIN_FAIL, error:error.message})
    }
}

export const signup = (req) => async(dispatch) => {
    try {
        const data = await axios.post("http://localhost:8888/auth/sign_up", req)
        if(data.data?.result?.token){
            localStorage.setItem("accessToken", data.data?.result?.token);
            dispatch({type:SIGNIN, payload:data})
        }
    } catch (error) {
        dispatch({type:SIGNUP_FAIL ,error:error.message})
    }
}

export const logout = () => async(dispatch) => {
    localStorage.clear("accessToken");
    dispatch({type:SIGNOUT})
}