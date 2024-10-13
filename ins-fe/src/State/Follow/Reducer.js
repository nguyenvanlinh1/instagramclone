import { GET_ALL_INFO_FAIL, GET_FOLLOWED, GET_FOLLOWER, GET_FOLLOWER_FAIL, UPDATE_INFO, UPDATE_INFO_FAIL } from "../Type/ActionType"

const init = {
    followed:[],
    follower:[],
    notification:"",
    error:""
}

export const followReducer = (state = init, action) => {
    switch(action.type){
        case GET_FOLLOWED:
            return {...state, followed:action.payload}
        case GET_FOLLOWER:
            return {...state, follower:action.payload}
        case UPDATE_INFO:
            return {...state, notification:action.payload}
        case GET_ALL_INFO_FAIL:
        case UPDATE_INFO_FAIL:
        case GET_FOLLOWER_FAIL:
            return {...state, error:action.error}
        default:
            return state;
    }
}