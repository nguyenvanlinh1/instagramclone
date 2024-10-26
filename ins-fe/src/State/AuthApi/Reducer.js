import {SIGNIN, SIGNIN_FAIL, SIGNOUT, SIGNUP, SIGNUP_FAIL } from "../Type/ActionType";

const init = {
    token:"",
    error:""
}

export const authReducer =  (state = init, action) => {
    switch(action.type){
        case SIGNIN:
        case SIGNUP:
            return {...state, token:action.payload}
        case SIGNIN_FAIL:
        case SIGNUP_FAIL:
            return {...state, error:action.error}
        case SIGNOUT:
            return {...init}
        default:
            return state;
    }
}