import { CREATE_CHAT, CREATE_INFO, CREATE_INFO_FAIL, DELETE_CHAT, DELETE_INFO, DELETE_INFO_FAIL, FIND_CHAT, FIND_INFO, FIND_INFO_FAIL, GET_ALL_INFO_FAIL, GET_CHAT, UPDATE_CHAT, UPDATE_INFO_FAIL } from "../Type/ActionType"

const init = {
    chats:[],
    chat:"",
    error:"",
    notification: ""
}

export const chatReducer = (state = init, action) => {
    switch(action.type){
        case GET_CHAT:
            return {...state, chats:action.payload}
        case DELETE_CHAT:
            return {...state, notification:action.payload}
        case CREATE_CHAT:
        case UPDATE_CHAT:
        case FIND_CHAT:
            return {...state, chat:action.payload}
        case GET_ALL_INFO_FAIL:
        case UPDATE_INFO_FAIL:
        case DELETE_INFO_FAIL:
        case CREATE_INFO_FAIL:
        case FIND_INFO_FAIL:
            return {...state, error:action.error}
        default:
            return state;
    }
}