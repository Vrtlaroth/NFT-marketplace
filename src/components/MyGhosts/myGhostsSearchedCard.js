import React, { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
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

import "./myGhostsSearchedCard.scss";
import "../../assets/scss/components/_button.scss";
import store from "../../store";
import { pagination, routes } from "../../store/actions/ethers";
import { handleDialogAction } from "../../store/actions/dialogue";
import { setFilters, filterTypes } from "../../store/actions/filter";
import "../../assets/scss/components/_disabledCards.scss";

export default class SearchedCard extends Component {
	/*const [items, setItems] = useState(data);
  const [searched, setSearched] = useState("");*/

	constructor(props) {
		super(props);

		this.state = {
			items: [],
			searched: "",
			filtered: true,
			onSale: true,
			notOnSale: true,
		};

		this.onSaleRef = React.createRef();
		this.notOnSaleRef = React.createRef();
	}

	componentWillReceiveProps(props) {
		if (props.data !== this.state.items) {
			this.setState({ items: props.data });
		}
	}

	filterByListing = async (e) => {
		if (e.target.id === "listed") {
			await this.setState({ onSale: !this.state.onSale });
		}
		if (e.target.id === "not-listed") {
			await this.setState({ notOnSale: !this.state.notOnSale });
		}
		let options = {
			filterType: filterTypes.ONSALE,
			filterOptions: {
				route: routes.MY_GHOSTS,
				onSale: this.state.onSale,
				notOnSale: this.state.notOnSale,
			},
		};
		await store.dispatch(setFilters(options));
	};

	handleGhosts = (item, action) => {
		store.dispatch(handleDialogAction(action, item));
	};

	render() {
		return (
			<div className="wrapper">
				<h2 class="myghosts-title">My Ghosts</h2>
				<div className="price-container__btns">
					<button className="btns">
						<input
							className="price-container__btns__checkbox"
							type="checkbox"
							id="listed"
							onClick={this.filterByListing.bind(this)}
							checked={this.state.onSale}
						/>
						On Sale
					</button>
					<button className="btns">
						<input
							className="price-container__btns__checkbox"
							type="checkbox"
							id="not-listed"
							onClick={this.filterByListing.bind(this)}
							checked={this.state.notOnSale}
						/>
						Not on Sale
					</button>
				</div>
				{(this.state.onSale || this.state.notOnSale) &&
					this.state.items &&
					this.state.items.length === 0 && (
						<div className="progress">
							<CircularProgress size="10rem" />
						</div>
					)}
				{!this.state.onSale &&
					!this.state.notOnSale &&
					this.state.items.length === 0 && (
						<div className="result">YOU HAVE NO GHOSTS ON SALE!</div>
					)}
				;
				<Box className="mpcard" display="grid">
					<Grid
						className="mpcard__grid"
						container
						sx={{ width: "80%", margin: "auto" }}
						spacing={5}
					>
						{(this.state.onSale || this.state.notOnSale) &&
							this.state.items &&
							this.state.items.map((item, index) => (
								<Grid
									className="mpcard__grid__item"
									item
									xs={15}
									sm={4}
									md={3}
									lg={2}
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
											<CardMedia component="img" src={item.image} alt="Ghost" />
										</CardContent>
										<div className="content">
											<h6 className="content__title">Ghost #{item.id}</h6>

											<span className="content__price">
												{item.price !== null ? item.price + "FTM" : ""}
											</span>
										</div>

										<div className="mpcard__grid__item__content__wrapper">
											{item && !item.listed && (
												<>
													<CardActionArea
														style={{
															backgroundColor: "white",
															display: "block",
														}}
														onClick={this.handleGhosts.bind(this, item, "list")}
													>
														<div className="card-actions_button card-actions__button bg-green">
															<p>LIST</p>
														</div>
													</CardActionArea>
												</>
											)}
											{item && item.listed && (
												<>
													<CardActionArea
														style={{
															backgroundColor: "white",
															display: "block",
														}}
														onClick={this.handleGhosts.bind(
															this,
															item,
															"cancel"
														)}
													>
														<div className="card-actions_button card-actions__button bg-red">
															<p>CANCEL</p>
														</div>
													</CardActionArea>
													<CardActionArea
														style={{
															backgroundColor: "white",
															display: "block",
														}}
														onClick={this.handleGhosts.bind(this, item, "edit")}
													>
														<div className="card-actions_button card-actions__button bg-green">
															<p>EDIT</p>
														</div>
													</CardActionArea>
												</>
											)}
										</div>
									</Card>
								</Grid>
							))}
					</Grid>
				</Box>
			</div>
		);
	}
}
