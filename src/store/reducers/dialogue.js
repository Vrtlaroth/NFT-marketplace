import {
  LIST_GHOST,
  PURCHASE_GHOST,
  CANCEL_GHOST,
  EDIT_GHOST,
  CLOSE_DIALOG,
} from "../actions/web3ActionTypes";

let initialState = {
  open: false,
  title: "Default",
  subtitle: "",
  content: "Default text",
  action: "No Action",
  data: {},
  input: {
    show: true,
    type: "text",
    placeholder: "Default placeholder text...",
  },
};

const dialogue = (state = initialState, action) => {
  switch (action.type) {
    case LIST_GHOST:
      return {
        ...state,
        ...action.message,
      };
    case PURCHASE_GHOST:
      return {
        ...state,
        ...action.message,
      };
    case CANCEL_GHOST:
      return {
        ...state,
        ...action.message,
      };
    case EDIT_GHOST:
      return {
        ...state,
        ...action.message,
      };
    case CLOSE_DIALOG:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default dialogue;
