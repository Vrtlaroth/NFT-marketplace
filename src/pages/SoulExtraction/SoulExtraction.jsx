import React from "react";
import ExtractSouls from "../../components/ExtractSouls/ExtractSouls";
import "./SoulExtraction.scss";

export default class SoulExtraction extends React.Component {
  render() {
    return (
      <div className="soulextraction">
        <ExtractSouls />
      </div>
    );
  }
}
