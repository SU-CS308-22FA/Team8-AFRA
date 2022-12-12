import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_SENDOTP_FAIL,
  USER_SENDOTP_SUCCESS,
  USER_SENDOTP_REQUEST,
  USER_VERIFYOTP_SUCCESS,
  USER_VERIFYOTP_FAIL,
  USER_VERIFYOTP_REQUEST
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};


export const userOTPReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SENDOTP_REQUEST:
      return { loading: true };
    case USER_SENDOTP_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_SENDOTP_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const userOTPVrifyReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFYOTP_REQUEST:
      return { loading: true };
    case USER_VERIFYOTP_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_VERIFYOTP_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};