import React, { useState, useEffect } from "react";
import Element from "./Element";
import {makeStyles} from  '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  wrapper:{
    height : "100%",
    width : "210px"
  }

}))

function Section(props) {
  const classes = useStyles();
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
  return (
    <>
      {/*<div style={sectionStyle}>{contentsList}</div>*/}
      <div className={classes.wrapper}>
        {contentsList}
      </div>
    </>
  );
}

export default Section;
