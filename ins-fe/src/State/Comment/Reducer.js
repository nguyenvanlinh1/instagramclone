import {
  CREATE_COMMENT_POST,
  CREATE_COMMENT_POST_REPLAY,
  CREATE_COMMENT_STORY,
  CREATE_INFO_FAIL,
  DELETE_COMMENT_POST,
  DELETE_COMMENT_STORY,
  DELETE_INFO_FAIL,
  GET_ALL_INFO_FAIL,
  GET_COMMENT_POST,
  GET_COMMENT_STORY,
  UPDATE_COMMENT_POST,
  UPDATE_COMMENT_STORY,
  UPDATE_INFO_FAIL,
} from "../Type/ActionType";

const init = {
  commentPosts: [],
  commentStorys: [],
  comment: "",
  error: "",
  notification: "",
};

export const commentReducer = (state = init, action) => {
  switch (action.type) {
    case GET_COMMENT_POST:
      return { ...state, commentPosts: action.payload };
    case DELETE_COMMENT_POST:
    case DELETE_COMMENT_STORY:
      return { ...state, notification: action.payload };
    case GET_COMMENT_STORY:
      return { ...state, commentStorys: action.payload };
    case UPDATE_COMMENT_STORY:
    case UPDATE_COMMENT_POST:
      return { ...state, updateComment: action.payload };
    case CREATE_COMMENT_POST:
    case CREATE_COMMENT_STORY:
      return { ...state, comment: action.payload };
    case CREATE_COMMENT_POST_REPLAY:
      return { ...state, commentReplay: action.payload };
    case GET_ALL_INFO_FAIL:
    case DELETE_INFO_FAIL:
    case CREATE_INFO_FAIL:
    case UPDATE_INFO_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
