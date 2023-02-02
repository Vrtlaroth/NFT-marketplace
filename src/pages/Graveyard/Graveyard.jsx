import React from "react";
import Card from "../../components/GraveyardCard/GraveyardCard";

import "./Graveyard.scss";
export default class Graveyard extends React.Component {
	render() {
		return (
			<section className="graveyard-container">
				<article className="graveyard-container__article">
					<h1 className="subheading">Statistics</h1>
					<div className="statistcs-items">
						<div className="statistcs-item text">
							<span className="stats-circle stats-circle--first"></span>
							<div>
								<span>99</span>
								<span>Total Staked</span>
							</div>
						</div>

						<div className="statistcs-item text">
							<span className="stats-circle stats-circle--second"></span>
							<div>
								<span>99</span>
								<span>Daily Rewards</span>
							</div>
						</div>

						<div className="statistcs-item text">
							<span className="stats-circle stats-circle--third"></span>
							<div>
								<span>99</span>
								<span>Pending Rewards</span>
							</div>
						</div>

						<div className="statistcs-item text">
							<span className="stats-circle stats-circle--forth"></span>
							<div>
								<span>99</span>
								<span>All My Keys</span>
							</div>
						</div>
					</div>
				</article>
				<Card />
			</section>
		);
	}
}
