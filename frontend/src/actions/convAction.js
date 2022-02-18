import {
    USER_CONVERSATION_REQUEST,
    USER_CONVERSATION_SUCCESS,
    USER_CONVERSATION_FAIL,
} from "../constants/userConstants";
import axios from "axios";  

export const getConversations = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_CONVERSATION_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/messenger/${id}`);

    dispatch({ type: USER_CONVERSATION_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_CONVERSATION_FAIL, payload: error.response.data.message });
  }
};