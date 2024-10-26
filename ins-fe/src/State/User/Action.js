import axios from "axios";
import { api } from "../../Config/Config";
import {
  FIND_INFO_FAIL,
  FIND_USER,
  GET_INFO_FAIL,
  GET_USER,
  GET_USER_NOT_FOLLOW,
  GET_USERNAME,
  UPDATE_INFO_FAIL,
  UPDATE_USER,
} from "../Type/ActionType";

export const getUser = (token) => async (dispatch) => {
  try {
    const data = await axios.get(`http://localhost:8888/user/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: GET_USER, payload: data });
  } catch (error) {
    dispatch({ type: GET_INFO_FAIL, error: error.message });
  }
};

export const updateUser = (req) => async (dispatch) => {
  try {
    const data = await api.put(`/user/update`, req);
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_INFO_FAIL, error: error.message });
  }
};

export const findUserByName = (username) => async (dispatch) => {
  try {
    const data = await api.get(`/user/search?name=${username}`);
    dispatch({ type: FIND_USER, payload: data });
  } catch (error) {
    dispatch({ type: FIND_INFO_FAIL, error: error.message });
  }
};

export const findUserByUsername = (username) => async (dispatch) => {
  try {
    const data = await api.get(`/user/username?username=${username}`);
    dispatch({ type: GET_USERNAME, payload: data });
  } catch (error) {
    dispatch({ type: FIND_INFO_FAIL, error: error.message });
  }
};

export const findUserNotFollow = () => async (dispatch) => {
  try {
    const data = await api.get(`/user/not_follow`);
    dispatch({ type: GET_USER_NOT_FOLLOW, payload: data });
  } catch (error) {
    dispatch({ type: FIND_INFO_FAIL, error: error.message });
  }
};
