import React, { useState, useEffect } from "react";
import {makeStyles} from  '@material-ui/core/styles';
import { InsertDriveFileSharp } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  fileDiv:{
    display: 'flex',
    width: "170px",
    height : "40px"
  },
  fileIcon:{
    width : "20px",
    color : theme.palette.text.primary
  },
  fileName:{
    width  : "150px",
    color : theme.palette.text.primary
  }
}))


function File(props) {
  const classes = useStyles();
  const name = props.name;
  // 기타 정보들이

  return (
    <>
      {/*<div style={divStyle}>이름: {name}, 파일임</div>*/}
      <div className={classes.fileDiv}>
        <InsertDriveFileSharp className={classes.fileIcon}/>
        <Typography className={classes.fileName}>이름 : {name}, 파일임</Typography>
      </div>
    </>
  );
}

export default File;