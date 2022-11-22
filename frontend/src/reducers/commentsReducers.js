import {
    COMMENTS_UPDATE_REQUEST,
    COMMENTS_UPDATE_SUCCESS,
    COMMENTS_UPDATE_FAIL,
    COMMENTS_CREATE_FAIL,
    COMMENTS_CREATE_REQUEST,
    COMMENTS_CREATE_SUCCESS,
    COMMENTS_DELETE_FAIL,
    COMMENTS_DELETE_REQUEST,
    COMMENTS_DELETE_SUCCESS,
    COMMENTS_LIST_FAIL,
    COMMENTS_LIST_REQUEST,
    COMMENTS_LIST_SUCCESS,
    COMMENTS_LIKE_REQUEST,
    COMMENTS_LIKE_FAIL,
    COMMENTS_LIKE_SUCCESS,
  } from "../constants/commentsConstants";
  
  export const commentListReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
      case COMMENTS_LIST_REQUEST:
        return { loading: true };
      case COMMENTS_LIST_SUCCESS:
        return { loading: false, comments: action.payload };
      case COMMENTS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const commentCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMENTS_CREATE_REQUEST:
        return { loading: true };
      case COMMENTS_CREATE_SUCCESS:
        return { loading: false, success: true };
      case COMMENTS_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const commentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMENTS_DELETE_REQUEST:
        return { loading: true };
      case COMMENTS_DELETE_SUCCESS:
        return { loading: false, success: true };
      case COMMENTS_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const commentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMENTS_UPDATE_REQUEST:
        return { loading: true };
      case COMMENTS_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case COMMENTS_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const commentLikeReducer = ( state={}, action)=> {
    switch (action.type) {
      case COMMENTS_LIKE_REQUEST:
        return { loading: true };
      case COMMENTS_LIKE_SUCCESS:
        return { loading: false, success: true };
      case COMMENTS_LIKE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  