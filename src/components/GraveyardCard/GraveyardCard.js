import React, { Component } from "react";
import statistics from "../../store/statistics";

import Card from "@mui/material/Card";

import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import "./GraveyardCard.scss";

export default class Cards extends Component {
  render() {
    return (
      <>
        <Box display="grid" className="card-container">
          <Grid
            className="card-container__items"
            container
            sx={{ width: "80%", margin: "auto" }}
            spacing={5}
          >
            {statistics.map(function (item) {
              return (
                <Grid className="grid-item" item xs={15} sm={6} md={4}>
                  <Card
                    className="card"
                    sx={{
                      width: "100%",
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    <CardContent>
                      <div className="card__top">
                        <div className="card__top__circles">
                          <span className="stats-circle">&nbsp;</span>
                          <span className="stats-circle">&nbsp;</span>
                        </div>
                        <div className="card__top__stats">
                          <div className="card__top__stats__name">
                            GHO-BNB LP
                            <span className="stats-circle-small">&nbsp;</span>
                          </div>
                          <div className="card__top__stats__details">
                            <span className="card__top__stats__details__avg">
                              Average APY: 0%
                            </span>
                            <span className="card__top__stats__details__x">
                              0x
                            </span>
                            <span className="icon--arrow-down"></span>
                          </div>
                        </div>
                      </div>
                      <div className="card__flex-item">
                        <span className="stats-circle-small stats-circle--first"></span>

                        <div>
                          <Typography
                            className="text"
                            gutterBottom
                            variant="body2"
                          >
                            {item.totalStaked}
                          </Typography>
                          <Typography variant="body2">{item.amount}</Typography>
                        </div>
                      </div>

                      <div className="card__flex-item">
                        <span className="stats-circle-small stats-circle--second"></span>
                        <div>
                          <Typography className="text" variant="body2">
                            {item.value}
                          </Typography>
                          <Typography className="text" variant="body2">
                            {item.price}
                          </Typography>
                        </div>
                      </div>

                      <div className="card__flex-item">
                        <span className="stats-circle-small stats-circle--third"></span>
                        <div>
                          <Typography variant="body2" className="text">
                            {item.myStaked}
                          </Typography>
                          <Typography variant="body2">{item.amount}</Typography>
                        </div>
                      </div>

                      <div className="card__flex-item">
                        <span className="stats-circle-small stats-circle-small--fourth"></span>
                        <div>
                          <Typography variant="body2" className="text">
                            {item.balance}
                          </Typography>
                          <Typography variant="body2">{item.amount}</Typography>
                        </div>
                      </div>

                      <div className="card__flex-item">
                        <span className="stats-circle-small stats-circle--fifth"></span>
                        <div>
                          <Typography variant="body2" className="text">
                            {item.revards}
                          </Typography>
                          <Typography variant="body2" className="text">
                            {item.key}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                    <div className="button__container">
                      <CardActionArea className="button__container__area">
                        <button>Withdraw</button>
                      </CardActionArea>
                      <CardActionArea className="button__container__area">
                        <button>Unlock</button>
                      </CardActionArea>
                    </div>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </>
    );
  }
}
