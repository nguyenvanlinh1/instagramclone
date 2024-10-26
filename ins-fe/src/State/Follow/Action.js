import { api } from "../../Config/Config";
import { GET_ALL_INFO_FAIL, GET_FOLLOWED, GET_FOLLOWER, GET_FOLLOWER_FAIL, UPDATE_INFO, UPDATE_INFO_FAIL } from "../Type/ActionType";


export const getFollower = (userId) => async(dispatch) =>{
    try {
        const data = await api.get(`/follower/${userId}`);
        dispatch({type:GET_FOLLOWER, payload:data})
    } catch (error) {
        dispatch({type:GET_FOLLOWER_FAIL, error:error.message})
    }
}

export const getFollowed = (userId) => async(dispatch) =>{
    try {
        const data = await api.get(`/followed/${userId}`);
        dispatch({type:GET_FOLLOWED, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const getMyFollower = () => async(dispatch) =>{
    try {
        const data = await api.get(`/follower`);
        dispatch({type:GET_FOLLOWER, payload:data})
    } catch (error) {
        dispatch({type:GET_FOLLOWER_FAIL, error:error.message})
    }
}

export const getMyFollowed = () => async(dispatch) =>{
    try {
        const data = await api.get(`/followed`);
        dispatch({type:GET_FOLLOWED, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const followUser = (userId) => async(dispatch) =>{
    try {
        const data = await api.put(`/follow/${userId}`);
        dispatch({type:UPDATE_INFO, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}

export const unFollowUser = (userId) => async(dispatch) =>{
    try {
        const data = await api.put(`/unfollow/${userId}`);
        dispatch({type:UPDATE_INFO, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}