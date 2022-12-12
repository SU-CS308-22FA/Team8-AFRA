import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  commentCreateReducer,
  commentDeleteReducer,
  commentListReducer,
  commentUpdateReducer,
} from "./reducers/commentsReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  userOTPReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  commentList: commentListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  commentCreate: commentCreateReducer,
  commentDelete: commentDeleteReducer,
  commentUpdate: commentUpdateReducer,
  userUpdate: userUpdateReducer,
  userOTP: userOTPReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
