import React, { useState, useEffect } from "react";
import {makeStyles, useTheme} from  '@material-ui/core/styles';
import { InsertDriveFileSharp } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import {motion} from "framer-motion";


function File(props) {
  
  function ChangeFileNameColor(size){
    console.log(size);
    if (size < 104857600) {
      return '#AEE1FF';
    }
    else if (size < 268435456) {
      return '#ACFFBA';
    }
    else if (size < 536870912) {
      return '#E0FFB8';
    }
    else if (size < 1073741824) {
      return '#FFEF9F';
    }
    else if (size < 2147483648) {
      return '#FFD175';
    }
    else {
      return '#FF8D8D';
    }
    //ChangeFileName's Color by here
    //const theme = useTheme();
    //const hex = '#FF0000'
    //return hex;
    
    //Level 1  #FF8D8D    0~~
    //Level 2  #FFD175    104857600
    //Level 3  #FFEF9F    268435456
    //Level 4  #E0FFB8    536870912
    //Level 5  #ACFFBA    1073741824
    //Level 6  #AEE1FF    2147483648    
    //usage : color : '#FFFFFF' // color = '#FFFFFF'
  }

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
      color : ChangeFileNameColor(props.info.size)
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