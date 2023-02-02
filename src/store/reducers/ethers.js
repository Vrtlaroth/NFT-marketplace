import {
  NETWORK_CORRECT,
  NETWORK_FAIL,
  GHOSTS_SUCCESS,
  GHOSTS_ERROR,
  MARKETPLACE_SUCCESS,
  MARKETPLACE_ERROR,
  GHOST_LISTED,
  GHOST_EDITED,
  LISTING_CANCELED,
  GHOST_PURCHASED,
  CLEAR_STATE,
  CHANGE_PAGE,
} from "../actions/web3ActionTypes";

let initialState = {
  loading: null,
  dataLoaded: false,
  filtered: false,
  ghosts: [],
  items: [],
  paginate: {
    page: 1,
    perPage: 12,
    totalPages: 999,
    currentPage: 1,
    currentItems: [],
  },
};

const ethers = (state = initialState, action) => {
  switch (action.type) {
    case NETWORK_CORRECT:
      return {
        ...state,
        loading: false,
      };
    case NETWORK_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GHOSTS_SUCCESS:
      return {
        ...state,
        loading: true,
        dataLoaded: true,
        ghosts: action.ghosts,
      };
    case GHOSTS_ERROR:
      return {
        ...state,
        loading: false,
        dataLoaded: false,
        ghosts: [],
      };
    case MARKETPLACE_SUCCESS:
      return {
        ...state,
        loading: true,
        dataLoaded: true,
        items: action.items,
      };
    case MARKETPLACE_ERROR:
      return {
        ...state,
        loading: false,
        dataLoaded: false,
        items: [],
      };
    case GHOST_LISTED:
      return {
        ...state,
      };
    case GHOST_EDITED:
      return {
        ...state,
      };
    case LISTING_CANCELED:
      return {
        ...state,
      };
    case GHOST_PURCHASED:
      return {
        ...state,
      };
    case CLEAR_STATE:
      return {
        ...initialState,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        loading: false,
        paginate: action.payload.paginate,
        filtered: action.payload.filtered,
      };
    default:
      return state;
  }
};

export default ethers;
