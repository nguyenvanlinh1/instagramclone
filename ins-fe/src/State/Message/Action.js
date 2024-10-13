import { api } from "../../Config/Config";
import { CREATE_INFO_FAIL, CREATE_MESSAGE, DELETE_INFO_FAIL, DELETE_MESSAGE, GET_ALL_INFO_FAIL, GET_MESSAGES } from "../Type/ActionType";

export const createMessage = (req) => async(dispatch) => {
    try {
        console.log(req);
        const data = await api.post(`/message/send`, req);
        dispatch({type:CREATE_MESSAGE, payload:data})
    } catch (error) {
        dispatch({type:CREATE_INFO_FAIL, error:error.message})
    }
}

export const getChatMessage = (chatId) => async(dispatch) => {
    try {
        console.log(chatId)
        const data = await api.get(`/message/chat/${chatId}`);
        console.log("data", data)
        dispatch({type:GET_MESSAGES, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const deleteMessage = (messageId) => async(dispatch) => {
    try {
        const data = await api.delete(`/message/delete/${messageId}`);
        dispatch({type:DELETE_MESSAGE, payload:data})
    } catch (error) {
        dispatch({type:DELETE_INFO_FAIL, error:error.message})
    }
}