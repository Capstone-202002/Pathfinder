import React, { useState, useEffect } from "react";
import Element from "./Element";

function Section(props) {
  const name_list = [
    "예시폴더1",
    "예시폴더2",
    "예시파일1",
    "예시파일2",
    "예시파일3",
    "예시파일4",
  ];
  const folder_list = [true, true, false, false, false, false];

  var contentsList = name_list.map((name, index) => (
    <div>
      <Element name={name} isFolder={folder_list[index]} />
    </div>
  ));

  var sectionStyle = {
    marginRight: "10px",
    padding: "5px",
    border: "7px solid #77beed",
  };

  return (
    <>
      <div style={sectionStyle}>{contentsList}</div>
    </>
  );
}

export default Section;
