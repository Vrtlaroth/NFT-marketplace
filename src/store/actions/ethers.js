import { ethers } from "ethers";
import {
	NETWORK_CORRECT,
	NETWORK_FAIL,
	GHOSTS_SUCCESS,
	GHOSTS_ERROR,
	MARKETPLACE_SUCCESS,
	MARKETPLACE_ERROR,
	TRANSFER_ERROR,
	TRANSFER_SUCCESS,
	GHOST_LISTED,
	LIST_ERROR,
	PURCHASE_ERROR,
	GHOST_EDITED,
	EDIT_ERROR,
	LISTING_CANCELED,
	CANCEL_ERROR,
	GHOST_PURCHASED,
	CLEAR_STATE,
	CHANGE_PAGE,
} from "./web3ActionTypes";
import { loadUser } from "./auth";
import { filterTypes, filterAndSort } from "./filter";
import {
	cancelListingError,
	connectError,
	editListingError,
	getGhostsError,
	handleNewNetworkError,
	listGhostError,
	purchaseError,
	purchaseGhostError,
	getMarketplaceItemsError,
} from "./errors";

const paginationOptions = {
	page: 0,
	route: "",
};

export const routes = {
	MY_GHOSTS: "MY_GHOSTS",
	MARKETPLACE: "MARKETPLACE",
};

export const handleNewNetwork = () => {
	return async (dispatch) => {
		try {
			const chainId = await window.ethereum.request({ method: "eth_chainId" });
			let networkId = process.env.REACT_APP_NETWORK_ID;
			if (networkId === chainId) {
				// Network correct
				return { type: NETWORK_CORRECT, payload: true };
			} else {
				try {
					await window.ethereum.request({
						method: "wallet_switchEthereumChain",
						params: [
							{
								chainId: process.env.REACT_APP_NETWORK_ID_HEX,
							},
						],
					});
					return { type: NETWORK_CORRECT, payload: true };
				} catch (err) {
					console.log("Network not found" + err.message);
					dispatch(handleNewNetworkError(err.message));
					return { type: NETWORK_FAIL, payload: false };
				}
			}
		} catch (err) {
			console.log("Network not found" + err.message);
			dispatch(handleNewNetwork(err.message));
			return { type: NETWORK_FAIL, payload: false };
		}
	};
};

export const connect = () => {
	return async (dispatch) => {
		let ethereum = new ethers.providers.Web3Provider(window.ethereum, "any");
		ethereum
			.send("eth_requestAccounts", [])
			.then((acc) => {
				dispatch(loadUser(acc));
			})
			.catch((error) => {
				if (error.code === 4001) {
					// EIP-1193 userRejectedRequest error
					console.log("Please connect to MetaMask.");
					//dispatch(connectError(err.message));
					return { type: NETWORK_FAIL, payload: false };
				} else {
					console.error(error);
					//dispatch(connectError(err.message));
					return { type: NETWORK_FAIL, payload: false };
				}
			});
	};
};

export const handleNewAccounts = (newAccounts) => {
	return async (dispatch) => {
		dispatch(loadUser(newAccounts));
	};
};

// GHOSTS
export const getGhosts = () => {
	return async (dispatch, getState) => {
		try {
			let eth = getState().auth.user.eth;
			const address = await eth.signer.getAddress();
			// let ghosts = await eth.ghostContract.balanceOf(address);
			// ghosts = parseInt(ghosts.toString());
			// console.log(ghosts);
			let newItems = [];

			let ghosts = await eth.marketplaceContract.getInventory(address);
			let listed = ghosts[1];
			ghosts = ghosts[0].map((x) => parseInt(x.toString()));

			// const address = await eth.signer.getAddress();
			let marketplace = {};
			marketplace.ghosts = await eth.marketplaceContract.getAllGhostsOnSale();

			marketplace.hexPrice = await eth.marketplaceContract.getPrices();
			marketplace.ghosts = marketplace.ghosts.map((x) =>
				parseInt(x.toString())
			);
			marketplace.prices = marketplace.hexPrice.map((x) =>
				ethers.utils.formatEther(x)
			);

			for (var i = 0; i < ghosts.length; i++) {
				let priceIndex = marketplace.ghosts.indexOf(ghosts[i]);
				newItems.push({
					id: ghosts[i],
					image: `/img/ghosts/${ghosts[i]}.png`,
					listed: listed[i],
					price: priceIndex >= 0 ? marketplace.prices[priceIndex] : null,
				});
			}
			dispatch({ type: GHOSTS_SUCCESS, ghosts: newItems });
		} catch (err) {
			dispatch(getGhostsError(err.message));
			dispatch({ type: GHOSTS_ERROR, payload: false });
		}
	};
};

export const listGhost = (item, price) => {
	return async (dispatch, getState) => {
		try {
			let eth = getState().auth.user.eth;
			const newPrice = ethers.utils.parseEther(price);
			let list = await eth.marketplaceContract.updateListing(item.id, newPrice);
			let approve = await eth.ghostContract.approve(
				process.env.REACT_APP_MARKETPLACE_ADDRESS,
				item.id
			);
			dispatch({ type: CLEAR_STATE });
			dispatch(getGhosts(true));
			dispatch({ type: GHOST_LISTED, listed: true });
		} catch (err) {
			dispatch(listGhostError(err.message));
			dispatch({ type: LIST_ERROR, payload: false });
		}
	};
};
export const editListing = (item, price) => {
	return async (dispatch, getState) => {
		try {
			let eth = getState().auth.user.eth;
			const newPrice = ethers.utils.parseEther(price);
			await eth.marketplaceContract.updateListing(item.id, newPrice);

			dispatch({ type: CLEAR_STATE });
			dispatch(getGhosts(true));
			dispatch({ type: GHOST_EDITED, edited: true });
		} catch (err) {
			dispatch(editListingError(err.message));
			dispatch({ type: EDIT_ERROR, payload: false });
		}
	};
};

export const cancelListing = (item) => {
	return async (dispatch, getState) => {
		try {
			let eth = getState().auth.user.eth;
			let listing = await eth.marketplaceContract.updateListing(item.id, 0);

			dispatch({ type: CLEAR_STATE });
			dispatch(getGhosts(true));
			dispatch({ type: LISTING_CANCELED, payload: false });
		} catch (err) {
			dispatch(cancelListingError(err.message));
			dispatch({ type: CANCEL_ERROR, payload: false });
		}
	};
};

// MARKETLPACE
export const purchaseGhost = (item) => {
	return async (dispatch, getState) => {
		try {
			const extraOptions = {
				value: item.price,
			};
			let eth = getState().auth.user.eth;
			let purchase = await eth.marketplaceContract.purchaseGhost(
				item.id,
				extraOptions
			);

			dispatch({ type: CLEAR_STATE });
			dispatch(getMarketplaceItems());
			dispatch({ type: GHOST_PURCHASED, payload: false });
		} catch (err) {
			dispatch(purchaseGhostError(err.message));
			dispatch({ type: PURCHASE_ERROR, payload: false });
		}
	};
};

export const getMarketplaceItems = () => {
	return async (dispatch, getState) => {
		try {
			let eth = getState().auth.user.eth;
			let newItems = {
				collection: [],
			};
			const address = await eth.signer.getAddress();
			newItems.ghosts = await eth.marketplaceContract.getAllGhostsOnSale();
			newItems.listers = await eth.marketplaceContract.getAllListers();
			newItems.hexPrice = await eth.marketplaceContract.getPrices();
			newItems.ghosts = newItems.ghosts.map((x) => parseInt(x.toString()));
			newItems.prices = newItems.hexPrice.map((x) =>
				ethers.utils.formatEther(x)
			);

			for (var i = 0; i < newItems.ghosts.length; i++) {
				let lister;

				let link;
				if (newItems.listers[i] === address) {
					lister = "You";
					link = "my-ghosts";
				} else {
					lister =
						newItems.listers[i].substr(0, 7) +
						"..." +
						newItems.listers[i].substr(-7);
					link = "https://rinkeby.etherscan.io/address/" + newItems.listers[i];
				}
				newItems.collection.push({
					id: i,
					ghost: newItems.ghosts[i],
					lister: lister,
					listerLong: newItems.listers[i],
					address: link,
					price: newItems.prices[i],
					priceLong: newItems.hexPrice[i],
					image: `/img/ghosts/${newItems.ghosts[i]}.png`,
				});
			}
			delete newItems.ghosts;
			delete newItems.listers;

			await dispatch({
				type: MARKETPLACE_SUCCESS,
				items: newItems.collection,
			});
		} catch (err) {
			dispatch(getMarketplaceItemsError(err.message));
			dispatch({ type: MARKETPLACE_ERROR, payload: false });
		}
	};
};

export const purchase = (item) => {
	return async (dispatch, getState) => {
		try {
			let eth = getState().auth.user.eth;
			const extraOptions = {
				value: item.priceLong,
			};
			let transfer = await eth.marketplaceContract.purchaseGhost(
				item.ghost,
				extraOptions
			);
			await transfer.await();

			dispatch({ type: TRANSFER_ERROR, payload: transfer });
		} catch (err) {
			dispatch(purchaseError(err.message));
			dispatch({ type: TRANSFER_ERROR, payload: false });
		}
	};
};

export const pagination = (options = paginationOptions) => {
	return async (dispatch, getState) => {
		let total = 0;
		let min = 0;
		let max = 0;
		let perPage = 0;
		let items = {};
		let newItems = [];
		let filter = getState().filter.filtered || false;

		if (options.route === routes.MARKETPLACE) {
			perPage = 8;
			items = getState().ethers.items;
		}
		if (options.route === routes.MY_GHOSTS) {
			perPage = 12;
			items = getState().ethers.ghosts;
		}
		if (filter) {
			items = getState().filter.filteredItems;
		}

		if (items) {
			max = options.page * perPage;

			if (max !== 0 && max > 0) {
				total = Math.ceil(items.length / perPage);
				min = max - perPage;
				newItems = items.slice(min, max);
			}
		} else {
			newItems = items;
		}

		let paginate = {
			page: options.page,
			perPage: options.perPage,
			totalPages: total,
			currentPage: options.page,
			currentItems: newItems,
		};

		dispatch({
			type: CHANGE_PAGE,
			payload: { paginate: paginate, filtered: filter },
		});
	};
};
