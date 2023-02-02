import React, { Component } from "react";
import "./ExtractSouls.scss";

export default class ExtractSouls extends Component {
  render() {
    return (
      <div>
        <div className="illustration">Extract Souls Illustration</div>

        <section className="soul-container">
          <article className="soul-container__article">
            <h1>Statistics</h1>
            <div className="stats-items">
              <div className="stats-item">
                <span className="stats-item__first stats-circle"></span>
                <div className="stats-item__data">
                  <span>99</span>
                  <span>Total Staked</span>
                </div>
              </div>

              <div className="stats-item">
                <span className="stats-item__second stats-circle"></span>
                <div className="stats-item__data">
                  <span>99</span>
                  <span>Daily Rewards</span>
                </div>
              </div>

              <div className="stats-item">
                <span className="stats-item__third stats-circle"></span>
                <div className="stats-item__data">
                  <span>99</span>
                  <span>Pending Rewards</span>
                </div>
              </div>

              <div className="stats-item">
                <span className="stats-item__forth stats-circle"></span>
                <div className="stats-item__data">
                  <span>99</span>
                  <span>All My Keys</span>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    );
  }
}
