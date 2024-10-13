import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./AuthApi/Reducer";
import { userReducer } from "./User/Reducer";
import { postReducer } from "./Post/Reducer";
import { storyReducer } from "./Story/Reducer";
import { commentReducer } from "./Comment/Reducer";
import { chatReducer } from "./Chat/Reducer";
import { messageReducer } from "./Message/Reducer";
import { followReducer } from "./Follow/Reducer";

const rootReducer = combineReducers({
    auth:authReducer,
    user:userReducer,
    post:postReducer,
    story:storyReducer,
    comment:commentReducer,
    chat:chatReducer,
    message:messageReducer,
    follow:followReducer,
})

const composedEnhancer  = applyMiddleware(thunk)

export const store = legacy_createStore(rootReducer, composedEnhancer);