import React, { useState, useEffect } from "react";

function Folder(props) {
  const name = props.name;
  // 기타 정보들이

  var divStyle = {
    marginBottom: "10px",
    border: "7px solid #ed9e53",
    color: "Black",
  };

  return (
    <>
      <div style={divStyle}>이름: {name}, 폴더임</div>
    </>
  );
}

export default Folder;
