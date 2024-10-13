import { api } from "../../Config/Config"
import {CREATE_INFO_FAIL, CREATE_POST, DELETE_INFO_FAIL, DELETE_POST, GET_ALL_INFO_FAIL, GET_POST, GET_POST_LIKED, GET_POST_SAVED, GET_USERNAME, UPDATE_INFO_FAIL, UPDATE_POST } from "../Type/ActionType";

export const createPost = (req) => async(dispatch) =>{
    try {
        const data = await api.post(`/post/create`, req);
        dispatch({type:CREATE_POST, payload:data})
    } catch (error) {
        dispatch({type:CREATE_INFO_FAIL, error:error.message})
    }
}

export const updatePost = (req, postId) => async(dispatch) =>{
    try {
        const data = await api.put(`/post/update/${postId}`, req);
        dispatch({type:UPDATE_POST, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}

export const deletePost = (postId) => async(dispatch) =>{
    try {
        const data = await api.delete(`/post/delete/${postId}`);
        dispatch({type:DELETE_POST, payload:data})
    } catch (error) {
        dispatch({type:DELETE_INFO_FAIL, error:error.message})
    }
}

export const getAllPostByUser = () => async(dispatch) =>{
    try {
        const data = await api.get(`/post/`);
        dispatch({type:GET_POST, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const getAllPostByUserId = (userId) => async(dispatch) =>{
    try {
        const data = await api.get(`/post/${userId}`);
        dispatch({type:GET_POST, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const getAllPostByUserSaved = (userId) => async(dispatch) =>{
    try {
        const data = await api.get(`/post/saved/${userId}`);
        dispatch({type:GET_POST_SAVED, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const getAllPostByUserLiked = (userId) => async(dispatch) =>{
    try {
        const data = await api.get(`/post/liked/${userId}`);
        dispatch({type:GET_POST_LIKED, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const getAllPostFromUserFollowed = (userId) => async(dispatch) =>{
    try {
        const data = await api.get(`/post/all/${userId}`);
        dispatch({type:GET_POST, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}


export const likePost = (postId) => async(dispatch) =>{
    try {
        const data = await api.put(`/post/like/${postId}`);
        dispatch({type:UPDATE_POST, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}

export const unLikePost = (postId) => async(dispatch) =>{
    try {
        const data = await api.put(`/post/unlike/${postId}`);
        const updatedPost = data.data.result;
        dispatch({type:UPDATE_POST, payload:updatedPost})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}

export const savePost = (postId) => async(dispatch) =>{
    try {
        const data = await api.put(`/post/save/${postId}`);
        dispatch({type:UPDATE_POST, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}

export const unSavePost = (postId) => async(dispatch) =>{
    try {
        const data = await api.put(`/post/unsaved/${postId}`);
        dispatch({type:UPDATE_POST, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}


