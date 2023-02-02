// import React from 'react';
// import { connect } from 'react-redux';
// import { getCollections, getCollection, getItems } from '../store/actions/nft';

// const HomePage = (props) => {
//   const { collections, items, collection } = props;

//   console.log(collections, items, collection);

//   return <div></div>;
// };

// const mapStateToProps = (state) => ({
//   collections: state.nft.collections,
//   items: state.nft.items,
// });

// export default connect(mapStateToProps, {
//   getCollections,
//   getCollection,
//   getItems,
// })(HomePage);

import React from "react";
import GhostImg from "../../assets/img/ghost.png";
import Coffin from "../../assets/img/hp_coffin.png";
import Cart from "../../assets/img/hp_cart.png";
import Swords from "../../assets/img/hp_swords.png";
import Twitter from "../../assets/img/icon/twitter.png";
import Discord from "../../assets/img/icon/discord.png";
import Fantom from "../../assets/img/icon/fantom.png";
import Genkham from "../../assets/img/genkham.png";
import Dubwise from "../../assets/img/dubwise.png";
import Oldmate from "../../assets/img/oldmate.png";
import Treecko from "../../assets/img/treecko.png";

import "./HomePage.scss";

export default class Homepage extends React.Component {
	render() {
		return (
			<section className="homepage-container">
				<article className="homepage-container__first-container">
					<img src={GhostImg} alt="Ghost icon" />

					<div className="first-container__item">
						<h1 className="heading">Introducing Fantom Ghosts</h1>
						<h1 className="subheading">Welcome to the fantom ghosts club</h1>

						<p className="text">
							FantomGhosts is a collection of 10,000 Ghost NFTs—unique digital
							collectibles living on the Fantom blockchain.Fantom Ghosts is
							built for the community from the ground up, and aims to play a key
							part in establishing the Fantom NFT and GameFI scene.
						</p>
						<div className="search-container__btns">
							<button>button 1</button>
							<button>button 2</button>
						</div>
					</div>
				</article>

				<article className="homepage-container__second-container">
					<h2 className="heading">ECONOMY</h2>

					<div className="flex-container">
						<div className="flex-container__item flex-container__item--left">
							<div className="flex-container__item-circle"></div>
							<p className="subheading__secondary first--paragraph">
								"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
								consectetur, adipisci velit..."
							</p>
						</div>

						<div className="flex-container__item flex-container__item--right">
							<p className="subheading__secondary second--paragraph">
								"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
								consectetur, adipisci velit..."
							</p>
							<div className="flex-container__item-circle"></div>
						</div>
					</div>
				</article>

				<article className="features-container">
					<h2 className="heading">FEATURES</h2>

					<div className="features-container__items">
						<div className="features-container__item">
							<img src={Coffin} alt="Coffin icon" />
							<p className="text neque">
								Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
								consectetur, adipisci velit...
							</p>
							<button className="btn__black">button</button>
						</div>

						<div className="features-container__item">
							<img src={Cart} alt="Cart icon" />
							<p className="text neque">
								Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
								consectetur, adipisci velit...
							</p>
							<button className="btn__black">button</button>
						</div>

						<div className="features-container__item">
							<img src={Swords} alt="Swords icon" />
							<p className="text neque">
								Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
								consectetur, adipisci velit...
							</p>
							<button className="btn__black">button</button>
						</div>
					</div>
				</article>

				<article className="communty-container">
					<h2 className="heading">COMMUNITY</h2>

					<div className="communty-container__flex-items">
						<a href="https://twitter.com/ftmghosts" target="_blank">
							<img src={Twitter} alt="Twitter icon" />
						</a>

						<img src={Discord} alt="Discord icon" />
						<img src={Fantom} alt="Fantom icon" />
					</div>
				</article>

				<article className="team-container">
					<h2 className="heading">THE TEAM</h2>

					<div className="team-imgs">
						<img src={Genkham} alt="Genkham icon" />
						<img src={Dubwise} alt="Dubwise icon" />
						<img src={Oldmate} alt="Oldmate icon" />
						<img src={Treecko} alt="Treecko icon" />
					</div>
				</article>

				<article className="faq-container">
					<h2 className="heading">FAQ</h2>

					<div className="faq-items">
						<div className="text faq-item">HOW TO GET KEYS</div>
						<div className="text faq-item">HOW TO USE KEYS</div>
						<div className="text faq-item">HOW TO STAKE YOUR KEYS</div>
					</div>
				</article>
			</section>
		);
	}
}
