import {
  CREATE_INFO_FAIL,
  CREATE_STORY,
  DELETE_INFO_FAIL,
  DELETE_STORY,
  GET_ALL_INFO_FAIL,
  GET_STORY,
  UPDATE_INFO_FAIL,
  UPDATE_STORY,
} from "../Type/ActionType";

const init = {
  stories: [],
  story: "",
  error: "",
};

export const storyReducer = (state = init, action) => {
  switch (action.type) {
    case GET_STORY:
    case DELETE_STORY:
      return { ...state, stories: action.payload };
    case CREATE_STORY:
    case UPDATE_STORY:
      return { ...state, story: action.payload };
    case GET_ALL_INFO_FAIL:
    case UPDATE_INFO_FAIL:
    case DELETE_INFO_FAIL:
    case CREATE_INFO_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
