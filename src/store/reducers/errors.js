import {
	TRANSFER_ERROR,
	MARKETPLACE_ERROR,
	GHOSTS_ERROR,
	NETWORK_FAIL,
	GENERAL_ERROR,
} from "../actions/web3ActionTypes";

const initialState = {
	message: null,
	severity: null,
};

const errors = (state = initialState, action) => {
	switch (action.type) {
		case GENERAL_ERROR:
			return { ...state.message.severity };
		case TRANSFER_ERROR:
			return { ...state.message.severity };
		case MARKETPLACE_ERROR:
			return { ...state.message.severity };
		case GHOSTS_ERROR:
			return { ...state.message.severity };
		case NETWORK_FAIL:
			return { ...state.message.severity };
		default:
			return state;
	}
};

export default errors;
