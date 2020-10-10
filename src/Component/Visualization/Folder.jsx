import React, { useState, useEffect } from "react";
import {makeStyles} from  '@material-ui/core/styles';
import { IconButton, Typography } from "@material-ui/core";
import {FolderSharp} from '@material-ui/icons';
const folderMinHeight = "80px";
const folderMaxHeight = "180px";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    width:"210px",
    marginBottom : "10px"
  },
  folderDiv:{
    position: "relative",
    width : "170px",
    minHeight : folderMinHeight,
    maxHeight : folderMaxHeight,
    padding : "30px"
  },
  rightArrowDiv:{
    width : "40px"
  },
  folderButton:{
    position: "absolute",
    heigh:"100%"
  },
  folderIcon:{
    height:"100%",
  },
  folderNameText:{
    position: "absolute",
    color: theme.palette.text.primary
  }
}))


function Folder(props) {
  const name = props.name;
  const classes = useStyles();
  // 기타 정보들이
  return (
    <>
      {/*<div style={divStyle}>이름: {name}, 폴더임</div>*/}
      <div className={classes.wrapper}>
        <div className={classes.folderDiv}>
          <IconButton className={classes.folderButton}>
            <FolderSharp className={classes.folderIcon}/>
          </IconButton>
          <Typography variant="body2" className={classes.folderNameText}>이름 : {name}, 폴더임</Typography>
        </div>
        <div className={classes.rightArrowDiv}>

        </div>
      </div>
    </>
  );
}

export default Folder;


function setFolderHeight(){
  //Calculate folder's height
  return folderMinHeight;
}
