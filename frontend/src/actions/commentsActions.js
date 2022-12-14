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
  COMMENTS_REPLY_REQUEST,
  COMMENTS_REPLY_SUCCESS,
  COMMENTS_REPLY_FAIL,
  COMMENTS_LIST_REPLY_REQUEST,
  COMMENTS_LIST_REPLY_SUCCESS,
  COMMENTS_LIST_REPLY_FAIL,
} from "../constants/commentsConstants";
import axios from "axios";

export const listComments = (selection,matchID) => async (dispatch, getState) => {
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
    if (selection === 0) {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/comments/`, {matchID},
        config
      );
      dispatch({
        type: COMMENTS_LIST_SUCCESS,
        payload: data,
      });
    }

    if (selection === 1) {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/comments/SortedByLike`, {matchID},
        config
      );
      dispatch({
        type: COMMENTS_LIST_SUCCESS,
        payload: data,
      });
    }
    if (selection === 2) {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/comments/SortedByDate`, {matchID},
        config
      );
      dispatch({
        type: COMMENTS_LIST_SUCCESS,
        payload: data,
      });
    }
    if (selection === 3) {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/comments/SortedByLikeReverse`, {matchID},
        config
      );
      dispatch({
        type: COMMENTS_LIST_SUCCESS,
        payload: data,
      });
    }
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


export const listReplies = (parentId) => async (dispatch, getState) => {
  try {
    
      dispatch({
        type: COMMENTS_LIST_REPLY_REQUEST,
      });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log("List replies function called");
    const {data} = await axios.post(
      `${process.env.REACT_APP_URL}/api/comments/getreplies`, {parentId:parentId},
      config
    );


    console.log("data is");
    console.log(data);

      dispatch({
        type: COMMENTS_LIST_REPLY_SUCCESS,
        payload: data,
      });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: COMMENTS_LIST_REPLY_FAIL,
      payload: message,
    });
  }
};

export const commentFiltered = (filters,matchID) => async (dispatch, getState) => {
  console.log(filters);
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
    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/comments/FilterComments`,
      { filters, matchID },
      config
    );
    dispatch({
      type: COMMENTS_LIST_SUCCESS,
      payload: data,
    });
    if(data.length===0){
      dispatch({
        type: COMMENTS_LIST_FAIL,
        payload: "There is no such comment",
      });

    }
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

export const listWordComments = (searchWord,matchID) => async (dispatch, getState) => {
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

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/comments/ListByWord/${searchWord}`, {matchID},
      config
    );
    dispatch({
      type: COMMENTS_LIST_SUCCESS,
      payload: data,
    });

    if(data.length===0){
      dispatch({
        type: COMMENTS_LIST_FAIL,
        payload: "There is no comment including " + searchWord,
      });

    }
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

export const listUserComments = (searchUser,matchID) => async (dispatch, getState) => {
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

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/comments/ListByUser/${searchUser}`, {matchID}, 
      config
    );
    dispatch({
      type: COMMENTS_LIST_SUCCESS,
      payload: data,
    });
    if(data.length===0){
      dispatch({
        type: COMMENTS_LIST_FAIL,
        payload: "There is no comment sent by " + searchUser,
      });

    }
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

export const createCommentAction =
  (title, content, matchId) => async (dispatch, getState) => {
    console.log(matchId)
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
      const userId= userInfo._id;
      const userrole = userInfo.userrole;
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/comments/create/${matchId}`,
        { title, content, username, userId, userrole },
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

  export const replyCommentAction =
  (title, content,parentId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMENTS_REPLY_REQUEST,
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
      const userId= userInfo._id;
      const userrole = userInfo.userrole;
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/comments/reply`,
        { title, content, username,parentId,userId,userrole },
        config
      );
      dispatch({
        type: COMMENTS_REPLY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENTS_REPLY_FAIL,
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

    const { data } = await axios.delete(
      `${process.env.REACT_APP_URL}/api/comments/${id}`,
      config
    );

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

export const updateCommentAction =
  (id, title, content) => async (dispatch, getState) => {
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
        { title, content },
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

export const updateLikeAction =
  (id, title, content, likes) => async (dispatch, getState) => {
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
      const username = userInfo.username;

      //console.log("I am sending this values for like action from frontend to backend");
      //console.log(title);
      //console.log(content);
      //console.log(likes);
      const { data } = await axios.put(
        `${process.env.REACT_APP_URL}/api/comments/likes/${id}`,
        { title, content, likes, username },
        config
      );

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
