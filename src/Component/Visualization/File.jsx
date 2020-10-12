import React, { useState, useEffect } from "react";
import {makeStyles, useTheme} from  '@material-ui/core/styles';
import { InsertDriveFileSharp } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import {motion} from "framer-motion";


function File(props) {
  const useStyles = makeStyles((theme) => ({
    fileDiv:{
      display: 'flex',
      width: "170px",
      height : "40px",
      paddingLeft : "20px"
    },
    fileIcon:{
      width : "20px",
      color : theme.palette.text.primary
    },
    fileName:{
      width  : "150px",
      //color : theme.palette.text.primary
      color : ChangeFileNameColor()
    }
  }))
  const classes = useStyles();
  const info = props.info;
  // 기타 정보들이

  return (
    <>
      {/*<div style={divStyle}>이름: {name}, 파일임</div>*/}
      <motion.div className={classes.fileDiv}
        whileHover = {{scale : 1.2}}
      >
        <InsertDriveFileSharp className={classes.fileIcon}/>
        <Typography className={classes.fileName}>{info.name}</Typography>
      </motion.div>
    </>
  );
}

export default File;


function ChangeFileNameColor(){
  //ChangeFileName's Color by here
  const theme = useTheme();
  const hex = '#FF0000'
  return hex;

  //Level 1  #FF8D8D
  //Level 2  #FFD175
  //Level 3  #FFEF9F
  //Level 4  #E0FFB8
  //Level 5  #ACFFBA
  //Level 6  #AEE1FF
  //usage : color : '#FFFFFF' // color = '#FFFFFF'
}