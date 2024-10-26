import { FIND_INFO_FAIL, FIND_USER, GET_ALL_INFO, GET_ALL_INFO_FAIL, GET_INFO_FAIL, GET_USER, GET_USER_NOT_FOLLOW, GET_USERNAME, SIGNOUT, UPDATE_INFO_FAIL, UPDATE_USER } from "../Type/ActionType";

const init = {
    users:[],
    user:"",
    error:"",
    byusername:"",
    usernotfollow:[],
}

export const userReducer = (state = init, action) => {
    switch(action.type){
        case GET_USER:
            return {...state, user:action.payload}
        case GET_ALL_INFO:
            return {...state, users:action.payload}
        case GET_USERNAME:
            return {...state, byusername:action.payload}
        case UPDATE_USER:
            return {...state, user:action.payload}
        case GET_USER_NOT_FOLLOW:
            return {...state, usernotfollow:action.payload}
        case FIND_USER:
            return {...state, users:action.payload}
        case GET_INFO_FAIL:
        case GET_ALL_INFO_FAIL:
        case UPDATE_INFO_FAIL:
        case FIND_INFO_FAIL:
            return {...state, error:action.error}
        case SIGNOUT:
            return {...init}
        default:
            return state;
    }
}