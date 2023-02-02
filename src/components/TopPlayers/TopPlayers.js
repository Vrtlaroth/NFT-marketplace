import React, { Component } from "react";
import "./TopPlayers.scss";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";

export default class TopPlayers extends Component {
  render() {
    return (
      <div className="player-container">
        <Box>
          <div className="card-container">
            <Card className="player__expand">
              <CardContent className="player__content">
                <span className="img--first"></span>
              </CardContent>
            </Card>

            <Card className="player">
              <CardContent className="player__content">
                <span className="img--second"></span>
              </CardContent>
            </Card>

            <Card className="player">
              <CardContent className="player__content">
                <span className="img--third"></span>
              </CardContent>
            </Card>
          </div>
        </Box>
      </div>
    );
  }
}
