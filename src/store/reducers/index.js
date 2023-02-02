import { combineReducers } from "redux";
import auth from "./auth";
import ethers from "./ethers";
import errors from "./errors";
import dialogue from "./dialogue";
import filter from "./filter";

const rootReducer = combineReducers({
	auth,
	ethers,
	errors,
	dialogue,
	filter,
});

export default rootReducer;
