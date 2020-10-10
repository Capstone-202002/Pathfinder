import React, { useState, useEffect } from "react";
import Base from "../Base/Base";
import Mainframe from "../UI/Mainframe/Mainframe"
import Section from "./Section";

function Visualization() {
  var gridStyle = {
    display: "flex",
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
      <Mainframe contents={contents} title={title}></Mainframe>
    </>
  );
}

export default Visualization;
