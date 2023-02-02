import React from "react";
import store from "../../store/index";
import { getGhosts, pagination, routes } from "../../store/actions/ethers";

import SearchedCard from "../../components/MyGhosts/myGhostsSearchedCard";
import Pagination from "../../components/Pagination/Pagination";
import "./MyGhosts.scss";

class MyGhosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ghosts: [],
      severity: "",
      message: "",
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      let state = store.getState();
      if (state.auth.isAuthenticated && !state.ethers.dataLoaded) {
        store.dispatch(getGhosts());
      } else if (state.ethers.loading && state.ethers.dataLoaded) {
        let options = {
          page: 1,
          route: routes.MY_GHOSTS,
        };
        store.dispatch(pagination(options));
      } else if (!state.ethers.loading) {
        this.setState({ ghosts: state.ethers.paginate.currentItems });
      }
    });
  }
  render() {
    return (
      <>
        <div className="myghosts-container">
          <SearchedCard data={this.state.ghosts} />
        </div>
        <Pagination route="MY_GHOSTS" />
      </>
    );
  }
}

export default MyGhosts;
