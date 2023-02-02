import React, { Component } from "react";
import store from "../../store/index";
import { purchase } from "../../store/actions/ethers";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import { CardActionArea, Checkbox } from "@mui/material";
import CardContent from "@mui/material/CardContent";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import SearchBar from "material-ui-search-bar";

import Ghost from "../../assets/img/fg_placeholder.png";
import Lock from "../../assets/img/icon/lock.png";

import "./marketplaceSearchedCard.scss";
import "../../assets/scss/components/_button.scss";
import "../../assets/scss/partials/_typography.scss";
import "../../assets/scss/components/_disabledCards.scss";

export default class SearchedCard extends Component {
	/*const [items, setItems] = useState(data);
  const [searched, setSearched] = useState("");*/

	constructor(props) {
		super(props);

		this.state = {
			items: this.props.data,
			searched: "",
		};
	}

	componentWillReceiveProps(props) {
		if (props.data !== this.state.items) {
			this.setState({ items: props.data });
		}
	}
	/*sortByPriceAsc = () => {
	let sortedDataAsc = this.state.item.sort((a, b) => {
	  return parseInt(a.price) - parseInt(b.price);
	});
	this.setState({
	  data: sortedDataAsc,
	});
  };

  sortByPriceDsc = () => {
	let sortedDataDsc = this.state.item.sort((a, b) => {
	  return parseInt(b.price) - parseInt(a.price);
	});
	this.setState({
	  data: sortedDataDsc,
	});
  };*/

	requestSearch = (searchedVal) => {
		if (!searchedVal) {
			this.setState({ items: store.getState().ethers.items });
			return;
		}

		const filteredItems = this.state.items.filter((item) => {
			let result =
				item.ghost.toString().toLowerCase().includes(searchedVal) ||
				item.price.toString().toLowerCase().includes(searchedVal);

			return result;
		});
		this.setState({ items: filteredItems });
	};

	handlePurchase(item, e) {
		e.preventDefault();
		store.dispatch(purchase(item));
	}

	render() {
		return (
			<div className="marketplace">
				<div className="wrapper">
					<div className="search-container" >
						<SearchBar

							value={this.searched}
							onChange={(searchVal) => this.requestSearch(searchVal)}
							onCancelSearch={() => this.requestSearch("")}
							placeholder="Search by ghost name"
							className="search-container__searchbar"
						/>
						<div className="search-container__btns">
							<button>On Sale</button>
							<button>Recently Sold</button>
						</div>
					</div>

					<Box className="mpcard" display="grid">
						<Grid
							className="mpcard__grid"
							container
							sx={{ width: "80%", margin: "auto" }}
							spacing={5}
						>
							{!this.state.items === 0 && (
								<div className="mpcard__no-items">
									<h3>No results</h3>
								</div>
							)}
							{this.state.items &&
								this.state.items.map((item, index) => (
									<Grid
										className="mpcard__grid__item"
										item
										xs={15}
										sm={6}
										md={4}
										lg={3}
									>
										<Card
											className="mpcard__grid__item__content"
											sx={{
												width: "100%",
												display: "block",
												textAlign: "center",
											}}
										>
											<CardContent className="mpcard__grid__item__content__contentitem">
												<CardMedia
													component="img"
													src={item.image}
													alt="Ghost"
													key={item.id}
												/>

												<div className="mpcard__grid__item__content__contentitem__title-container">
													<h6 className="mpcard__grid__item__content__contentitem__title-container__title subheading__secondary">
														Ghost #{item.ghost}
													</h6>

													<span className="mpcard__grid__item__content__contentitem__title-container__nft-number">
														<a
															href={item.address}
															target="_blank"
															rel="noopener noreferrer"
														>
															{item.lister}
														</a>
													</span>
												</div>
											</CardContent>

											<div className="mpcard__grid__item__content__wrapper">
												<Typography
													className="mpcard__grid__item__content__wrapper__paragraph"
													variant="body2"
												>
													{item.price}FTM
												</Typography>

												<CardActionArea
													style={{ backgroundColor: "white", display: "block" }}
													className="mpcard__grid__item__content__wrapper__bottom disabled"
												>
													<div
														className="mpcard__grid__item__content__wrapper__bottom__button "
														onClick={this.handlePurchase.bind(this, item)}
													>
														{/* <img src={Lock} alt="lock icnon" /> */}
														<p>BUY</p>
													</div>
												</CardActionArea>
											</div>
										</Card>
									</Grid>
								))}
						</Grid>
					</Box>
				</div>
			</div>
		);
	}
}
