import React, { Component } from "react";

import "./Footer.scss";

export default class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<footer>
				<div className="gradient"></div>
				<div className="footer">
					<div className="footer__logo">
						<span className="img--logo"></span>
					</div>
					<div className="footer__column">
						<h5 className="footer__title">Fantom Ghosts NFT</h5>
						<p className="footer__text">
							10,000 unique randomly generated 64x64 NFT's on the Fantom
							Blockchain!
						</p>
					</div>
					<div className="footer__column">
						<h5 className="footer__title">RESOURCES</h5>
						<ul className="footer__links">
							<li className="link">
								<a href="#">Mint</a>
							</li>
							<li className="link">
								<a href="#">Roadmap</a>
							</li>
							<li className="link">
								<a href="#">FAQ</a>
							</li>
							<li className="link">
								<a href="#">TEAM</a>
							</li>
						</ul>
					</div>
					<div className="footer__column">
						<h5 className="footer__title">COMMUNITY</h5>
						<div className="footer__social">
							<span className="icon--discord"></span>
							<span className="icon--fantom"></span>
							<span>
								<a href="https://twitter.com/ftmghosts" target="_blank">
									<span className="icon--twitter"></span>
								</a>
							</span>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}
