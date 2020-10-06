import React, { useState, useEffecct } from "react";
import Base from "../Base/Base";
import Section from "./Section";

function Visualization() {
  var gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  };

  var title = "Visualilzation";

  var contents = (
    <div style={gridStyle}>
      <Section key="1" />
      <Section key="2" />
      <Section key="3" />
    </div>
  );

  return (
    <>
      <Base contents={contents} title={title}></Base>
    </>
  );
}

export default Visualization;
