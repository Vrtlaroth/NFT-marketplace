import {
  SET_FILTER_OPTIONS,
  FILTER_COMPLETE,
  CLEAR_FILTERS,
} from "./web3ActionTypes";
import { routes, pagination } from "./ethers";

export const filterTypes = {
  PRICE_RANGE: "PRICE_RANGE",
  ONSALE: "ONSALE",
  SORT: "SORT",
};

export const setFilters = (
  options = {
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
  }
) => {
  return async (dispatch, getState) => {
    if (Object.keys(options).length === 0) {
      dispatch({ type: CLEAR_FILTERS });
      return;
    }

    let paginationOptions = {
      page: 1,
      route: options.filterOptions.route,
    };

    let filters = {
      filterType: options.filterType,
      filtered: true,
      filterOptions: {
        ...getState().filter.filterOptions,
        ...options.filterOptions,
      },
    };

    if (paginationOptions.route === routes.MY_GHOSTS) {
      await dispatch(filterAndSort(getState().ethers.ghosts, filters));
    }
    if (paginationOptions.route === routes.MARKETPLACE) {
      await dispatch(filterAndSort(getState().ethers.items, filters));
    }

    dispatch(pagination(paginationOptions));
  };
};
export const filterAndSort = (items, filters = {}) => {
  return async (dispatch, getState) => {
    let filteredItems = [];
    if (filters === {}) {
      filters = getState().filter;
    }

    if (
      filters.filterOptions.priceMax > 0 ||
      filters.filterOptions.priceMin > 0
    ) {
      filters.filterType = filterTypes.PRICE_RANGE;
    }
    if (filters.filterType === filterTypes.PRICE_RANGE) {
      filteredItems = filterByPriceRange(
        items,
        filters.filterOptions.priceMin,
        filters.filterOptions.priceMax
      );
    }
    if (filters.filterType === filterTypes.ONSALE) {
      filteredItems = filterByListing(
        items,
        filters.filterOptions.onSale,
        filters.filterOptions.notOnSale
      );
    }

    // SORT
    if (filters.filterOptions.sort || filters.filterType === filterTypes.SORT) {
      filteredItems = sortByPrice(
        filteredItems.length > 0 ? filteredItems : items,
        filters.filterOptions.sortDirection
      );
    }

    dispatch({
      type: FILTER_COMPLETE,
      filter: { options: filters, filteredItems: filteredItems },
    });
  };
};

const sortByPrice = (items, sortDirection) => {
  let newItems = [];
  if (sortDirection === "asc") {
    newItems = items.sort((a, b) => {
      let res = a.price - b.price;
      return res;
    });
  }
  if (sortDirection === "desc") {
    newItems = items.sort((a, b) => {
      let res = a.price - b.price;
      return res;
    });
    newItems = newItems.reverse();
  }
  return newItems;
};

const filterByPriceRange = (items, min = null, max = null) => {
  let sortNewItems = [];
  sortNewItems = items.filter(function (item, i) {
    if (!min && item.price < max) {
      return true;
    } else if (!max && item.price > min) {
      return true;
    } else if (item.price <= max && item.price >= min) {
      return true;
    }
    return false;
  });
  return sortNewItems;
};

const filterByListing = (currentItems, onSale = true, notOnSale = true) => {
  let filteredItems = [];

  if (onSale && !notOnSale) {
    filteredItems = currentItems.filter((item) => {
      return item.listed;
    });
  } else if (!onSale && notOnSale) {
    filteredItems = currentItems.filter((item) => {
      return !item.listed;
    });
  } else if (!onSale && !notOnSale) {
    filteredItems = [];
  } else if (onSale && notOnSale) {
    filteredItems = currentItems;
  }
  return filteredItems;
};

/*export const sortByRange = (items, sortDirection) => {
  type: SET_PRICE_RANGE,
  payload,
};*/

/*const initialState = {};
const sortStore = (state = initialState, action) => {
  switch (action.type) {
    case SORT_ASC_DSC:
      let sortedAdcDsc =
        action.payload.direction === "asc"
          ? sortAsc(state.filteredGhosts, "price")
          : sortDesc(state.filteredGhosts, "price");

      return {
        ...state,
        filteredGhosts: sortedAdcDsc,
      };
  }
};

export default sortStore;
*/

/*function sortAsc(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field] > b[field]) {
      return 1;
    }
    if (b[field] > a[field]) {
      return -1;
    }
    return 0;
  });
}

function sortDesc(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field] > b[field]) {
      return -1;
    }
    if (b[field] > a[field]) {
      return 1;
    }
    return 0;
  });
}
*/
