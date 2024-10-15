import {
  CREATE_INFO_FAIL,
  CREATE_POST,
  DELETE_INFO_FAIL,
  DELETE_POST,
  GET_ALL_INFO_FAIL,
  GET_POST,
  GET_POST_LIKED,
  GET_POST_SAVED,
  UPDATE_INFO_FAIL,
  UPDATE_POST,
} from "../Type/ActionType";

const init = {
  posts: [],
  post: "",
  error: "",
  notification:"",
  postLiked:[],
  postSaved:[],
};

export const postReducer = (state = init, action) => {
  switch (action.type) {
    case GET_POST:
      return {...state, posts: action.payload};
    case DELETE_POST:
      return { ...state, notification: action.payload };
    case GET_POST_LIKED:
      return { ...state, postLiked: action.payload};
    case GET_POST_SAVED:
      return { ...state, postSaved: action.payload};
    case UPDATE_POST:
      return {
        ...state,
        updatePost: action.payload,
      };
    case CREATE_POST:
      return { ...state, post: action.payload };
    case GET_ALL_INFO_FAIL:
    case UPDATE_INFO_FAIL:
    case DELETE_INFO_FAIL:
    case CREATE_INFO_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
