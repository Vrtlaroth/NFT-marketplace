import React from "react";
import TopPlayers from "../../components/TopPlayers/TopPlayers";
import TableMui from "../../components/TableMui/TableMui";

import "./Leaderboards.scss";

export default class Leaderboards extends React.Component {
  render() {
    return (
      <div class="leaderboards">
        <TopPlayers />
        <TableMui />
      </div>
    );
  }
}
