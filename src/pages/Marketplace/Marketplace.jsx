import React from "react";
import store from "../../store/index";
import { getMarketplaceItems } from "../../store/actions/ethers";
import SearchedCard from "../../components/Marketplace/marketplaceSearchedCard";
import Pagination from "../../components/Pagination/Pagination";

import "./Marketplace.scss";
import { setFilters, filterTypes } from "../../store/actions/filter";
import { pagination, routes } from "../../store/actions/ethers";

export default class Marketplace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      allItems: [],
      filtered: false,
    };
    this.minPriceRef = React.createRef();
    this.maxPriceRef = React.createRef();
    this.sortAscRef = React.createRef();
    this.sortDescRef = React.createRef();
  }

  componentDidMount() {
    store.subscribe(() => {
      let newState = store.getState();
      if (newState.auth.isAuthenticated && !newState.ethers.dataLoaded) {
        store.dispatch(getMarketplaceItems());
      } else if (newState.ethers.loading && newState.ethers.dataLoaded) {
        let options = {
          page: 1,
          route: routes.MARKETPLACE,
        };
        store.dispatch(pagination(options));
      } else if (!newState.ethers.loading) {
        this.setState({ items: newState.ethers.paginate.currentItems });
      }
    });
  }

  async handleSort(type, direction, _e) {
    if (type === "price") {
      if (direction === "asc") {
        this.sortDescRef.current.checked = false;
      }
      if (direction === "desc") {
        this.sortAscRef.current.checked = false;
      }
    }
    let options = {
      filterType: filterTypes.SORT,
      filterOptions: {
        route: routes.MARKETPLACE,
        sort: true,
        sortDirection: direction,
      },
    };
    await store.dispatch(setFilters(options));

    options = {
      page: 1,
      route: routes.MARKETPLACE,
    };
    store.dispatch(pagination(options));
  }

  async handleFilterRange(_e) {
    let options = {
      filterType: filterTypes.PRICE_RANGE,
      filterOptions: {
        route: routes.MARKETPLACE,
        priceMax: this.maxPriceRef.current.value,
        priceMin: this.minPriceRef.current.value,
      },
    };
    await store.dispatch(setFilters(options));
    options = {
      page: 1,
      route: routes.MARKETPLACE,
    };
    store.dispatch(pagination(options));
  }

  async resetFilter() {
    let options = {
      page: 1,
      route: routes.MARKETPLACE,
    };
    await store.dispatch(setFilters({}));
    this.maxPriceRef.current.value = "";
    this.minPriceRef.current.value = "";
    this.sortAscRef.current.checked = false;
    this.sortDescRef.current.checked = false;
    store.dispatch(pagination(options));
  }

  render() {
    return (
      <>
        <div className="marketplace-container">
          <section className="marketplace-container__sort">
            {/* <div className="sort-container">
              <h1 className="subheading">Soul Power</h1>
              <div className="sort-container__item">
                <label className="text" for="min">
                  Minimum
                </label>
                <input type="number" className="ghost-input" />
              </div>
              <div className="sort-container__item">
                <label className="text" for="max">
                  Maximum
                </label>
                <input type="number" className="ghost-input" />
              </div>
            </div> */}

            <div className="sort-container">
              <h1 className="subheading">Price Field</h1>
              <div className="sort-container__item">
                <label className="text" for="min">
                  Minimum
                </label>
                <input
                  type="number"
                  min="0"
                  className="ghost-input"
                  ref={this.minPriceRef}
                />
              </div>
              <div className="sort-container__item">
                <label className="text" for="max">
                  Maximum
                </label>
                <input
                  type="number"
                  min="0"
                  className="ghost-input"
                  ref={this.maxPriceRef}
                />
              </div>
              <div className="filter-btns">
                <button onClick={this.handleFilterRange.bind(this)}>
                  Apply
                </button>
                <button onClick={this.resetFilter.bind(this)}>Reset</button>
              </div>
            </div>

            <div className="sort-container">
              <h1 className="subheading">Sort By</h1>
              <div className="sort-container__item">
                <h2 className="text sort-subheading">Price</h2>
                <div>
                  <input
                    type="checkbox"
                    ref={this.sortAscRef}
                    onClick={this.handleSort.bind(this, "price", "asc")}
                  />
                  <label className="text checkbox" for="desc">
                    Asc
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    onClick={this.handleSort.bind(this, "price", "desc")}
                    ref={this.sortDescRef}
                  />
                  <label className="text checkbox" for="asc">
                    Desc
                  </label>
                </div>
              </div>
              {/* 
              <div className="sort-container__item">
                <h2 className="text sort-subheading">Soul Power</h2>
                <div>
                  <input type="checkbox" />
                  <label className="text checkbox" for="desc">
                    Asc
                  </label>
                </div>
                <div>
                  <input type="checkbox" />
                  <label className="text checkbox" for="asc">
                    Desc
                  </label>
                </div>
              </div> */}
            </div>
          </section>
          <SearchedCard data={this.state.items} />
        </div>

        <div className="pagination-wrapper">
          <Pagination route={"MARKETPLACE"} />
        </div>
      </>
    );
  }
}
