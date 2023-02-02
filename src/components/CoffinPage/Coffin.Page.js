import React, { Component } from "react";
import "./Coffin.scss";

export default class Coffin extends Component {
  render() {
    return (
      <div className="coffin">
        <div className="coffin__container">
          <span className="img--coffin"></span>
          <div className="key__container">
            <div className="key__container__item">
              <span className="img--key"></span>
            </div>
            <div className="key__container__number">1</div>
            <div className="key__text">KEY</div>
          </div>
          <button className="btn__approve">Approve</button>
          <div className="statistics-items">
            <div className="statistics-item">
              <span className="stats-circle-small stats-circle-small--first">
                &nbsp;
              </span>
              <div className="statistics-item__box">
                <span>50%</span>
                <span>Common</span>
              </div>
            </div>

            <div className="statistics-item">
              <span className="stats-circle-small stats-circle-small--second">
                &nbsp;
              </span>
              <div className="statistics-item__box">
                <span>35%</span>
                <span>Uncommon</span>
              </div>
            </div>

            <div className="statistics-item">
              <span className="stats-circle-small stats-circle-small--third">
                &nbsp;
              </span>
              <div className="statistics-item__box">
                <span>12%</span>
                <span>Unique</span>
              </div>
            </div>

            <div className="statistics-item">
              <span className="stats-circle-small stats-circle-small--forth">
                &nbsp;
              </span>
              <div className="statistics-item__box">
                <span>2.5%</span>
                <span>Rare</span>
              </div>
            </div>

            <div className="statistics-item">
              <span className="stats-circle-small stats-circle-small--fifth">
                &nbsp;
              </span>
              <div className="statistics-item__box">
                <span>0.5%</span>
                <span>Epic</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bar-navigation">
          <ul>
            <li>Time</li>
            <li>Type</li>
            <li>Amount</li>
            <li>Status</li>
            <li>TX</li>
          </ul>
        </div>
      </div>
    );
  }
}
