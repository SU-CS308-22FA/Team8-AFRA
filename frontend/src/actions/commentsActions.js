import {
    COMMENTS_CREATE_FAIL,
    COMMENTS_CREATE_REQUEST,
    COMMENTS_CREATE_SUCCESS,
    COMMENTS_DELETE_FAIL,
    COMMENTS_DELETE_REQUEST,
    COMMENTS_DELETE_SUCCESS,
    COMMENTS_LIST_FAIL,
    COMMENTS_LIST_REQUEST,
    COMMENTS_LIST_SUCCESS,
    COMMENTS_UPDATE_FAIL,
    COMMENTS_UPDATE_REQUEST,
    COMMENTS_UPDATE_SUCCESS,
    COMMENTS_LIKE_FAIL,
    COMMENTS_LIKE_REQUEST,
    COMMENTS_LIKE_SUCCESS,
  } from "../constants/commentsConstants";
  import axios from "axios";
  
  export const listComments = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMENTS_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

    const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/comments`, config);
    dispatch({
        type: COMMENTS_LIST_SUCCESS,
        payload: data,
    });

    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENTS_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  export const createCommentAction = (title, content) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: COMMENTS_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const username = userInfo.username;
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/comments/create`,
        {title, content,username},
        config
      );
      dispatch({
        type: COMMENTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENTS_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const deleteCommentAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMENTS_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`${process.env.REACT_APP_URL}/api/comments/${id}`, config);
  
      dispatch({
        type: COMMENTS_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENTS_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updateCommentAction = (id, title, content) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: COMMENTS_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `${process.env.REACT_APP_URL}/api/comments/${id}`,
        {  title, content},
        config
      );
  
      dispatch({
        type: COMMENTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };
  
  
  export const updateLikeAction = (id,title, content,likes) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMENTS_LIKE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const username=userInfo.username;
      const { data } = await axios.put(`${process.env.REACT_APP_URL}/api/comments/likes/${id}`, {title, content,likes,username},config);
      
      dispatch({
        type: COMMENTS_LIKE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENTS_LIKE_FAIL,
        payload: message,
      });
    }
  };