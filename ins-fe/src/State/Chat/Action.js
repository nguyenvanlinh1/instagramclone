import { api } from "../../Config/Config"
import { CREATE_CHAT, CREATE_INFO_FAIL, DELETE_CHAT, DELETE_INFO_FAIL, FIND_CHAT, FIND_INFO_FAIL, GET_ALL_INFO_FAIL, GET_CHAT, UPDATE_CHAT, UPDATE_INFO_FAIL } from "../Type/ActionType";

export const createChat = (req) => async(dispatch) => {
    try {
        const data =await api.post(`/chat/create/single`, req);
        console.log("Data", data)
        dispatch({type:CREATE_CHAT, payload:data})
    } catch (error) {
        dispatch({type:CREATE_INFO_FAIL, error:error.message})
    }
}

export const createGroupChat = (req) => async(dispatch) => {
    try {
        const data =await api.post(`/chat/create/group`, req);
        dispatch({type:CREATE_CHAT, payload:data})
    } catch (error) {
        dispatch({type:CREATE_INFO_FAIL, error:error.message})
    }
}

export const findChatById = (chatId) => async(dispatch) => {
    try {
        const data =await api.get(`/chat/${chatId}`);
        dispatch({type:FIND_CHAT, payload:data})
    } catch (error) {
        dispatch({type:FIND_INFO_FAIL, error:error.message})
    }
}

export const findAllChatByUserId = () => async(dispatch) => {
    try {
        const data =await api.get(`/chat/user`);
        console.log(data)
        dispatch({type:GET_CHAT, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const addUserToGroup = (chatId, userId) => async(dispatch) => {
    try {
        const data =await api.put(`/chat/${chatId}/create/${userId}`);
        dispatch({type:UPDATE_CHAT, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}

export const removeUserToGroup = (chatId, userId) => async(dispatch) => {
    try {
        const data =await api.put(`/chat/${chatId}/delete/${userId}`);
        dispatch({type:UPDATE_CHAT, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}

export const deleteChat = (chatId) => async(dispatch) => {
    try {
        const data = await api.delete(`/chat/delete/${chatId}`);
        dispatch({type:DELETE_CHAT, payload:data})
    } catch (error) {
        dispatch({type:DELETE_INFO_FAIL, error:error.message})
    }
}