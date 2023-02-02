import { USER_LOADED } from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: null,
  loading: false,
  user: {
    account: "",
    eth: null,
  },
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.account,
        balance: action.balance,
        eth: action.eth,
      };
    default:
      return state;
  }
};

export default auth;
