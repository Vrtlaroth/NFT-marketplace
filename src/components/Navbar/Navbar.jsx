import React, { Component } from "react";
import store from "../../store/index";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import WalletButton from "../WalletButton/WalletButton";

import "./Navbar.scss";
import { NAV_MENU_ITEMS, NAV_MENU_DROPDOWN } from "../../constants/NAV_MENU";


export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuOpen: false,
			userMenuOpen: false,
			loggedIn: false,
			address: ""
		};

		this.menuRef = React.createRef();
		this.userMenuRef = React.createRef();
	}

	componentDidMount() {
		store.subscribe(() => {
			let state = store.getState();
			let userAddress = state.auth.user.account;

			userAddress = userAddress.substr(0, 7) + "..." + userAddress.substr(userAddress.length - 7);

			this.setState((prevState) => { return { loggedIn: state.auth.isAuthenticated, address: userAddress } });
		});
	}
	handleMenu = (event) => {
		this.setState({ menuOpen: !this.state.menuOpen });

		if (!this.state.menuOpen) {
			this.menuRef.current.style.display = "flex";
		} else {
			this.menuRef.current.style.display = "none";
		}
		if (this.state.userMenuOpen) {
			this.handleUserMenu();
		}
	};
	handleUserMenu = (event) => {
		this.setState({ userMenuOpen: !this.state.userMenuOpen });

		if (!this.state.userMenuOpen) {
			this.userMenuRef.current.style.display = "flex";
		} else {
			this.userMenuRef.current.style.display = "none";
		}

		if (this.state.menuOpen) {
			this.handleMenu();
		}
	};

	render() {
		return (
			<nav className="nav">
				<span
					className="nav__hamburger icon--hamburger"
					onClick={this.handleMenu}
				></span>

				<a href="/" className="nav__logo">
					<span className="img--logo"></span>
				</a>

				<div className="nav__links" ref={this.menuRef}>
					{NAV_MENU_ITEMS.map(
						(page) =>
							page.active && (
								<a
									href={page.link}
									onClick={this.handleCloseNavMenu}
									className="nav__links__button"
								>
									<div className="nav__links__icon">
										<span className={page.icon}> </span>
									</div>
									<p className="nav__links__text">{page.title}</p>
								</a>
							)
					)}
				</div>

				{!this.state.loggedIn && <WalletButton />}

				{this.state.loggedIn && (
					<div className="nav__user">
						<Tooltip title="Open settings">
							<IconButton onClick={this.handleUserMenu}>
								<Avatar>MY</Avatar>
							</IconButton>
						</Tooltip>
					</div>
				)}

				<div className="nav__dropdown" ref={this.userMenuRef}>
					{NAV_MENU_DROPDOWN.menuItems.map(
						(item) =>
							item.active && (
								<a
									href={item.link}
									onClick={this.handleCloseNavMenu}
									className=" nav__links__button nav__links__button--dropdown"
								>
									<div className=" nav__links__icon ">
										{<span className={item.icon}> </span>}
									</div>
									<p className=" nav__links__text">{item.title === "address" ? this.state.address : item.title}</p>
								</a>
							)
					)}
				</div>
			</nav>
		);
	}
}
