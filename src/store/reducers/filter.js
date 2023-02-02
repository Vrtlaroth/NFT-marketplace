import {
  SORT_ITEMS_BY_PRICE,
  SET_PRICE_RANGE,
  FILTER_BY_LISTING,
  FILTER_COMPLETE,
  SET_FILTER_OPTIONS,
  CLEAR_FILTERS,
} from "../actions/web3ActionTypes";

const initialState = {
  filteredItems: [],
  filterType: "",
  filtered: false,
  filterOptions: {
    route: "",
    sort: false,
    sortDirection: "",
    onSale: true,
    notOnSale: true,
    priceMin: 0,
    priceMax: 0,
  },
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_OPTIONS:
      return {
        ...state,
        ...action.filter,
      };
    case FILTER_COMPLETE:
      return {
        ...state,
        ...action.filter.options,
        filteredItems: action.filter.filteredItems,
      };
    case CLEAR_FILTERS:
      return {
        ...initialState,
      };
    case SORT_ITEMS_BY_PRICE:
    case SET_PRICE_RANGE:
    case FILTER_BY_LISTING:
    default:
      return state;
  }
};

export default filter;
