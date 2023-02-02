import {
  LIST_GHOST,
  DIALOG_ERROR,
  PURCHASE_GHOST,
  CANCEL_GHOST,
  EDIT_GHOST,
  CLOSE_DIALOG,
} from "../actions/web3ActionTypes";
import { listGhost, purchaseGhost, cancelListing, editListing } from "./ethers";

const LIST = "LIST";
const PURCHASE = "PURCHASE";
const CANCEL = "CANCEL";
const EDIT = "EDIT";

export const closeDialog = () => {
  return async (dispatch) => {
    let data = {
      open: false,
      title: "",
      content: "",
      action: "",
      data: null,
      input: {
        show: false,
        type: "text",
        placeholder: "Default placeholder...",
      },
    };
    return { type: LIST_GHOST, message: data };
  };
};

export const handleDialogResult = (action, item, price = 0) => {
  return async (dispatch) => {
    switch (action.toUpperCase()) {
      case LIST:
        dispatch(listGhost(item, price));
        dispatch({ type: CLOSE_DIALOG, payload: false });
        break;
      case PURCHASE:
        dispatch(purchaseGhost(item));
        dispatch({ type: CLOSE_DIALOG, payload: false });
        break;
      case CANCEL:
        dispatch(cancelListing(item));
        dispatch({ type: CLOSE_DIALOG, payload: false });
        break;
      case EDIT:
        dispatch(editListing(item, price));
        dispatch({ type: CLOSE_DIALOG, payload: false });
        break;
      default:
        dispatch({ type: DIALOG_ERROR, payload: false });
        break;
    }
  };
};

export const handleDialogAction = (action, item) => {
  switch (action.toUpperCase()) {
    case LIST:
      return openListDialog(item);
    case PURCHASE:
      return openPurchaseDialog(item);
    case CANCEL:
      return openCancelDialog(item);
    case EDIT:
      return openEditDialog(item);
    default:
      return { type: DIALOG_ERROR, payload: false };
  }
};

function openListDialog(item) {
  let data = {
    open: true,
    title: "List Ghost #" + item.id,
    content: "Name the price in the input box below:",
    action: "List",
    data: item,
    input: {
      show: true,
      type: "text",
      placeholder: "Insert price...",
    },
  };
  return { type: LIST_GHOST, message: data };
}

function openPurchaseDialog(item) {
  let data = {
    open: true,
    title: "Purchase Ghost #" + item.id,
    content: "Are sure you wanna buy this Ghost?",
    action: "Purchase",
    data: item,
    input: {
      show: false,
    },
  };

  return { type: PURCHASE_GHOST, message: data };
}

function openCancelDialog(item) {
  let data = {
    open: true,
    title: "Cancel listing for Ghost #" + item.id,
    content: "Are you sure you want to cancel this ghost listing?",
    action: "Cancel",
    data: item,
    input: {
      show: false,
    },
  };
  return { type: CANCEL_GHOST, message: data };
}

function openEditDialog(item) {
  let data = {
    open: true,
    title: "Edit Ghost #" + item.id,
    subtitle: "Listed for: " + item.price + "FTM",
    content: "Name the price in the input box below:",
    action: "Edit",
    data: item,
    input: {
      show: true,
      type: "text",
      placeholder: "Insert price...",
    },
  };
  return { type: EDIT_GHOST, message: data };
}
