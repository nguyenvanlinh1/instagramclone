import { CREATE_INFO_FAIL, CREATE_MESSAGE, DELETE_INFO_FAIL, DELETE_MESSAGE, GET_ALL_INFO_FAIL, GET_MESSAGES } from "../Type/ActionType"

const init = {
    messages:[],
    message:"",
    error:"",
    notification:""
}

export const messageReducer = (state = init, action) => {
    switch(action.type){
        case GET_MESSAGES:
            return {...state, messages:action.payload}
        case DELETE_MESSAGE:
            return {...state, notification:action.payload}
        case CREATE_MESSAGE:
            return {...state, message:action.payload}
        case GET_ALL_INFO_FAIL:
        case DELETE_INFO_FAIL:
        case CREATE_INFO_FAIL:
            return {...state, error:action.error}
        default:
            return state;
    }
}