import { api } from "../../Config/Config"
import { CREATE_COMMENT_POST, CREATE_COMMENT_POST_REPLAY, CREATE_COMMENT_STORY, CREATE_INFO_FAIL, DELETE_COMMENT_POST, DELETE_COMMENT_STORY, DELETE_INFO_FAIL, GET_ALL_INFO_FAIL, GET_COMMENT_POST, GET_COMMENT_STORY, UPDATE_COMMENT_POST, UPDATE_COMMENT_STORY, UPDATE_INFO_FAIL } from "../Type/ActionType"

export const createPostComment = (req, postId) => async(dispatch) => {
    try {
        const data = await api.post(`/comment/create/post/${postId}`, req)
        console.log("daat", data)
        dispatch({type:CREATE_COMMENT_POST, payload:data})
    } catch (error) {
        dispatch({type:CREATE_INFO_FAIL, error:error.message})
    }
}

export const createCommentPostReplay = (req, commentId) => async(dispatch) => {
    try {
        const data = await api.post(`/comment/create/post/${commentId}/replay`, req)
        dispatch({type:CREATE_COMMENT_POST_REPLAY, payload:data})
    } catch (error) {
        dispatch({type:CREATE_INFO_FAIL, error:error.message})
    }
}

export const createStoryComment = (req, storyId) => async(dispatch) => {
    try {
        const data = await api.post(`/comment/create/story/${storyId}`, req)
        dispatch({type:CREATE_COMMENT_STORY, payload:data})
    } catch (error) {
        dispatch({type:CREATE_INFO_FAIL, error:error.message})
    }
}

export const createCommentStoryReplay = (req, commentId) => async(dispatch) => {
    try {
        const data = await api.post(`/comment/create/story/${commentId}/replay`, req)
        dispatch({type:CREATE_COMMENT_STORY, payload:data})
    } catch (error) {
        dispatch({type:CREATE_INFO_FAIL, error:error.message})
    }
}

export const deleteCommentPost = (commentId) => async(dispatch) => {
    try {
        const data = await api.delete(`/comment/delete/post/${commentId}`)
        dispatch({type:DELETE_COMMENT_POST, payload:data})
    } catch (error) {
        dispatch({type:DELETE_INFO_FAIL, error:error.message})
    }
}

export const deleteCommentStory = (commentId) => async(dispatch) => {
    try {
        const data = await api.delete(`/comment/delete/story/${commentId}`)
        dispatch({type:DELETE_COMMENT_STORY, payload:data})
    } catch (error) {
        dispatch({type:DELETE_INFO_FAIL, error:error.message})
    }
}

export const getCommentPost = (postId) => async(dispatch) => {
    try {
        const data = await api.get(`/comment/post/${postId}`)
        dispatch({type:GET_COMMENT_POST, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const getCommentStory = (storyId) => async(dispatch) => {
    try {
        const data = await api.get(`/comment/story/${storyId}`)
        dispatch({type:GET_COMMENT_STORY, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const getCommentPostByCommentReplay = (commentId) => async(dispatch) => {
    try {
        const data = await api.get(`/comment/post/${commentId}/replay`)
        dispatch({type:GET_COMMENT_POST, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const getCommentStoryByCommentReplay = (commentId) => async(dispatch) => {
    try {
        const data = await api.get(`/comment/story/${commentId}/replay`)
        dispatch({type:GET_COMMENT_STORY, payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_INFO_FAIL, error:error.message})
    }
}

export const likeCommentPost = (commentId) => async(dispatch) => {
    try {
        const data = await api.put(`/comment/like/post/${commentId}`)
        dispatch({type:UPDATE_COMMENT_POST, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}

export const unLikeCommentPost = (commentId) => async(dispatch) => {
    try {
        const data = await api.put(`/comment/unlike/post/${commentId}`)
        dispatch({type:UPDATE_COMMENT_POST, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}

export const likeCommentStory = (commentId) => async(dispatch) => {
    try {
        const data = await api.put(`/comment/like/story/${commentId}`)
        dispatch({type:UPDATE_COMMENT_STORY, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}

export const unLikeCommentStory = (commentId) => async(dispatch) => {
    try {
        const data = await api.put(`/comment/unlike/story/${commentId}`)
        dispatch({type:UPDATE_COMMENT_STORY, payload:data})
    } catch (error) {
        dispatch({type:UPDATE_INFO_FAIL, error:error.message})
    }
}



