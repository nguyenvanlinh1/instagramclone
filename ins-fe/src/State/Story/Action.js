import { api } from "../../Config/Config";
import { CREATE_INFO_FAIL, CREATE_STORY, DELETE_INFO_FAIL, DELETE_STORY, GET_ALL_INFO_FAIL, GET_STORY, UPDATE_INFO_FAIL, UPDATE_STORY } from "../Type/ActionType";

export const createStory = (req) => async(dispatch) =>{
    try {
        const data = await api.post(`/story/create`, req);
        dispatch({type:CREATE_STORY, payload:data})
    } catch (error) {
        dispatch({type:CREATE_INFO_FAIL, error:error.message})
    }
}


export const deleteStory = (storyId) => async(dispatch) =>{
    try {
        const data = await api.delete(`/story/delete/${storyId}`);
        dispatch({type:DELETE_STORY, payload:data})
    } catch (error) {
        dispatch({type:DELETE_INFO_FAIL, error:error.message})
    }
}

export const getAllStoryByUser = () => async(dispatch) =>{
    try {
        const data = await api.get(`/story/`);
        dispatch({type:GET_STORY, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const getAllStoryFromUserFollowed = (userId) => async(dispatch) =>{
    try {
        const data = await api.get(`/story/${userId}`);
        dispatch({type:GET_STORY, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const getAllStoryByUsername = (username) => async(dispatch) =>{
    try {
        const data = await api.get(`/story/username?username=${username}`);
        dispatch({type:GET_STORY, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}


export const likeStory = (storyId) => async(dispatch) =>{
    try {
        const data =await api.put(`/story/like/${storyId}`);
        dispatch({type:UPDATE_STORY, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}

export const unLikeStory = (storyId) => async(dispatch) =>{
    try {
        const data =await api.put(`/story/unlike/${storyId}`);
        dispatch({type:UPDATE_STORY, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}



