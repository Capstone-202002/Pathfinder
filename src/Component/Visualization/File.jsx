import React, { useState, useEffect } from "react";

function File(props) {
  const name = props.name;
  // 기타 정보들이

  var divStyle = {
    marginBottom: "10px",
    border: "7px solid #04c41e",
    color: "Black",
  };

  return (
    <>
      <div style={divStyle}>이름: {name}, 파일임</div>
    </>
  );
}

export default File;
