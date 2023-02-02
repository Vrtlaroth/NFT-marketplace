import axios from "axios";
import { ethers } from "ethers";

import setAuthToken from "../../utils/setAuthToken";
import { AUTH_ERROR, LOGOUT, USER_LOADED } from "./actionTypes";
import { ABI } from "../../constants/ABI";

export const loadUser = (accounts) => async (dispatch) => {
  if (accounts && accounts.length == 0) {
    dispatch(logout());
    return;
  }
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    let eth = {};
    let response = {};
    response.account = accounts[0];
    eth.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    eth.ghostContract = await new ethers.Contract(
      process.env.REACT_APP_FANTOM_ADDRESS,
      ABI.ghosts,
      eth.provider
    );
    eth.marketplaceContract = await new ethers.Contract(
      process.env.REACT_APP_MARKETPLACE_ADDRESS,
      ABI.marketplace,
      eth.provider
    );

    if (accounts && accounts.length > 0) {
      eth.signer = eth.provider.getSigner();
      eth.signer.address = await eth.signer.getAddress();
      // console.log("Fetched address: ", eth.signer.address);
      response.balance = await eth.signer.getBalance();
      eth.ghostContract = eth.ghostContract.connect(eth.signer);
      eth.marketplaceContract = eth.marketplaceContract.connect(eth.signer);
      response.eth = eth;
    }
    dispatch({ type: USER_LOADED, account: response });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = () => async (dispatch) => {
  try {
  } catch (err) {}
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
