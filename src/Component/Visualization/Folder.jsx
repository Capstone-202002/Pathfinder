import React, { useState, useEffect } from "react";
import {makeStyles} from  '@material-ui/core/styles';
import { IconButton, Typography, Paper , Button} from "@material-ui/core";
import {FolderSharp, ArrowRight} from '@material-ui/icons';
import {motion} from "framer-motion";
const folderMinHeight = "80px";
const folderMaxHeight = "180px";
const rightArrowVariants = {
  initial:{
    opacity : 0,
  },
  active:{
    opacity : 1,
    transition:{
      delay: 0.5
    }
  }
}
const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    width:"210px",
    //marginBottom : "10px",
    paddingTop : "10px",
    paddingBottom:"10px"
  },
  folderDiv:{
    display: "flex",
    flexDirection : "column",
    position: "relative",
    width : "170px",
    minHeight : folderMinHeight,
    maxHeight : folderMaxHeight,
    alignItems: "center"
  },
  rightArrowDiv:{
    display: "flex",
    width : "40px",
    alignItems : "center",
    verticalAlign: "middle"
  },
  folderHeadDiv:{
    position : "relative",
    height: "30px",
    width : "80px",
    backgroundColor : "#DEF6FF",
    borderRadius : "10px",
    elevation : "0",
    right : "15px"
  },
  folderBodyDiv:{
    height : setFolderHeight(),
    width : "110px",
    backgroundColor : "#DEF6FF",
    borderTopRightRadius : "10px",
    borderBottomRightRadius : "10px",
    borderBottomLeftRadius : '10px',
    position: "relative",
    top : "-10px"
  },
  folderNameText:{
    position: "absolute",
    color: theme.palette.background.default,
    marginLeft : "5px",
    right : "70px"
  },
  arrowRight:{
    color : theme.palette.text.primary,
    fontSize: "40px"
  },
  APSImportBusDiv:{
    width : '60px',
    height : '60px',
    position : 'absolute',
    top : "30px",
    right : '110px'
  },
  APSImportBusButton:{
    width : '100%',
    height : '100%',
    backgroundColor : '#00680A',
    borderRadius : '0'
  },
  APSExportBusDiv:{
    width : '60px',
    height : '60px',
    position : 'absolute',
    top : "30px",
    left : '110px'
  },
  APSExportBusButton:{
    width : '100%',
    height : '100%',
    backgroundColor : '#CB0C0C',
    borderRadius : '0'
  }
}))


function Folder(props) {
  const [folderClicked, setFolderClicked] = useState(false);
  const [APSClicked, setAPSFolderClicked] = useState(false);
  const isFolderClicked = (e) =>{
    if(APSClicked){
      return;
    }
    if(folderClicked){
      setFolderClicked(false);
    }else{
    setFolderClicked(true);
    }
  }
  const isAPSClicked = (e) =>{
    if(APSClicked){
      setAPSFolderClicked(false);
    }else{
      setAPSFolderClicked(true);
    }
  }
  const info = props.info;
  const classes = useStyles();
  // 기타 정보들이

  return (
    <>
      {/*<div style={divStyle}>이름: {name}, 폴더임</div>*/}
      <div className={classes.wrapper}>
        <motion.div className={classes.folderDiv}
          whileHover={{ scale : 1.2,
          }}
          onClick={() => { props.folderClicked(info); isFolderClicked() }}
        >
          {folderClicked
          ?<>
          <Paper className={classes.folderHeadDiv} elevation={0}>
          </Paper>
          <Paper className={classes.folderBodyDiv} elevation ={12}>
          </Paper>
          </>
          :<>
          <Paper className={classes.folderHeadDiv} elevation={0}>
          </Paper>
          <Paper className={classes.folderBodyDiv} elevation ={0}>
          </Paper>
          </>
          }
          <Typography variant="body2" className={classes.folderNameText}>{info.name}</Typography>
          <div className={classes.APSImportBusDiv}>
            <Button className={classes.APSImportBusButton} onClick={() => {isAPSClicked()}}>
              Import Bus
            </Button>
          </div>
          <div className={classes.APSExportBusDiv}>
            <Button className={classes.APSExportBusButton} onClick={() => {isAPSClicked()}}>
              Export Bus
            </Button>
          </div>
        </motion.div>
        <div className={classes.rightArrowDiv}>
          {folderClicked
            ?<><motion.div className={classes.rightArrowDiv}
            variants={rightArrowVariants}
            initial = "initial"
            animate = "active"
          >
            <ArrowRight className={classes.arrowRight}/>
          </motion.div>
          </>
            :<><motion.div
            variants={rightArrowVariants}
            initial = "initial"
            animate = "initial"
            >
            
          </motion.div>
          </>
          }
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