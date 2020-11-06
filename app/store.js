import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

const initialState = {
  user: {},
};

const GET_USER = "GET_USER";

const gotUser = (user) => ({
  type: GET_USER,
  user,
});

export const getUser = () => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.get("/auth/user");
      dispatch(gotUser(user));
    } catch (err) {
      console.error("There was a problem fetching this user!");
      console.error(err);
    }
  };
};

export const login = (formData) => {
  return async (dispatch) => {
    try {
      const { data: updatedDetails } = await axios.put("/auth/login", formData);
      dispatch(gotUser(updatedDetails));
    } catch (err) {
      console.error("There was a problem updating this user!");
      console.error(err);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.delete("/auth/logout");
      dispatch(gotUser(initialState.user));
    } catch (err) {
      console.error("There was a problem deleting this user!");
      console.error(err);
    }
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
