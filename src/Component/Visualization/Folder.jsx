import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { IconButton, Typography, Paper, Button } from "@material-ui/core";
import { FolderSharp, ArrowRight } from '@material-ui/icons';
import { motion } from "framer-motion";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import {addVDirectory} from '../API/db';
import SnackbarContext from './VisualizationSnackbarContext';
import { openDirectorySelectDialog } from '../API/io'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useTracked} from '../../SettingContext';
const openExplorer = require('../Visualization/FileWindowOpen/OpenExplorer');
//const folderMinHeight = "80px";
const folderMinHeight = 80;
const folderMaxHeight = "180px";
const rightArrowVariants = {
  initial: {
    opacity: 0,
  },
  active: {
    opacity: 1,
    transition: {
      delay: 0.5
    }
  }
}

function Folder(props) {
  const [settings, setSettings]=useTracked();
  const theme = useTheme();
  function setFolderHeight(totalSize, folderSize) {
    //기본80
    //차지하는 용량 1퍼센트당 1픽셀
    //console.log('토탈: ', totalSize);
    //console.log('폴더: ', folderSize);
    if(settings.directoryViewFolderSizeOperation===false){
      return folderMinHeight;
    }
    if (totalSize === 0) {
      return folderMinHeight;
    }

    var folderHeight = folderMinHeight + ((folderSize / totalSize) * 100);
    return folderHeight;
  }

  const useStyles = makeStyles((theme) => ({
    wrapper: {
      display: "flex",
      width: "210px",
      //marginBottom : "10px",
      //paddingTop : "10px",
      paddingBottom: "10px",
      marginTop: "20px",
      marginLeft: '15px',
      webkitJustifyContent: 'flex-end',
      justifyContent: 'space-between'
    },
    folderDiv: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "170px",
      minHeight: folderMinHeight,
      maxHeight: folderMaxHeight,
      alignItems: "center"
    },
    rightArrowDiv: {
      display: "flex",
      width: "40px",
      alignItems: "center",
      verticalAlign: "middle"
    },
    folderHeadDiv: {
      position: "relative",
      height: "30px",
      width: "80px",
      backgroundColor: settings.directoryViewFolderColor,
      borderRadius: "10px",
      elevation: "0",
      right: "15px"
    },
    folderBodyDiv: {
      height: setFolderHeight(props.totalSize, props.info.size),
      width: "110px",
      backgroundColor: settings.directoryViewFolderColor,
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
      borderBottomLeftRadius: '10px',
      position: "relative",
      top: "-10px"
    },
    //folder's Name Text Typhograph
    folderNameText: {
      position: "float",
      color: theme.palette.text.primary,
    },
    arrowRight: {
      color: theme.palette.text.primary,
      fontSize: "40px"
    },
    APSImportBusDiv: {
      width: '60px',
      height: '60px',
      position: 'absolute',
      top: "30px",
      right: '110px'
    },
    APSImportBusButton: {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      borderRadius: '10',
      textColor : theme.palette.text.primary,
      color : theme.palette.text.primary,
      cursor: 'pointer',
      border : '1px dotted white',
      outline:'0'
    },
    APSExportBusDiv: {
      width: '60px',
      height: '60px',
      position: 'absolute',
      top: "30px",
      left: '110px'
    },
    APSExportBusButton: {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      borderRadius: '10',
      textColor : theme.palette.text.primary,
      color : theme.palette.text.primary,
      cursor: 'pointer',
      border : '1px dotted white',
      outline:'0'
    }
  }))
  const [folderClicked, setFolderClicked] = useState(false);
  const [APSClicked, setAPSFolderClicked] = useState(false);
  const isFolderClicked = (e) => {
    if (APSClicked) {
      return;
    }
    if (folderClicked) {
      setFolderClicked(false);
    } else {
      setFolderClicked(true);
    }
  }
  const isAPSClicked = (e) => {
    if (APSClicked) {
      setAPSFolderClicked(false);
    } else {
      setAPSFolderClicked(true);
    }
  }
  const info = props.info;
  const classes = useStyles();
  // 기타 정보들이

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleAddVirtualDirectory(){
    addVDirectory({VDir:'vdir', FileName:info.name, RealPath:info.absPath, Extension:'dir', Size:'0'});
    setSnackBarOpen(true);
    handleClose();
  }
  function handleOpenExplorer(){
    handleClose();
    openExplorer(info.RealPath, err =>{
      if(err){
        console.log(err);
      }
    })
    
  }
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackBarOpen(false);
      };
  function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }
  
  return (
    <>
      {/*<div style={divStyle}>이름: {name}, 폴더임</div>*/}
      <div className={classes.wrapper}>
        <motion.div className={classes.folderDiv}
          whileHover={{
            scale: 1.2, originX: 0
          }}
          onClick={() => { props.folderClicked(info); isFolderClicked() }}
          onContextMenu = {handleClickOpen}
        >
          {folderClicked
            ? <>
              <Paper className={classes.folderHeadDiv} elevation={0}>
              </Paper>
              <Paper className={classes.folderBodyDiv} elevation={12}>
              </Paper>
            </>
            : <>
              <Paper className={classes.folderHeadDiv} elevation={0}>
              </Paper>
              <Paper className={classes.folderBodyDiv} elevation={0}>
              </Paper>
            </>
          }
          <Typography variant="body2" className={classes.folderNameText}>{info.name}</Typography>
          {/*
          <div className={classes.APSImportBusDiv}>
            <motion.button className={classes.APSImportBusButton} onClick={() => { isAPSClicked() }}
              initial={{opacity:0}}
              whileHover={{opacity : 1}}
            >
              Import Bus
            </motion.button>
          </div>
          <div className={classes.APSExportBusDiv}>
            <motion.button className={classes.APSExportBusButton} onClick={() => { isAPSClicked() }}
              initial={{opacity:0}}
              whileHover={{opacity : 1}}
            >
              Export Bus
            </motion.button>
          </div>
          */}
        </motion.div>
          
        <div className={classes.rightArrowDiv}>
          {folderClicked
            ? <><motion.div className={classes.rightArrowDiv}
              variants={rightArrowVariants}
              initial="initial"
              animate="active"
            >
              <ArrowRight className={classes.arrowRight} />
            </motion.div>
            </>
            : <><motion.div
              variants={rightArrowVariants}
              initial="initial"
              animate="initial"
            >

            </motion.div>
            </>
          }
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {info.name} 폴더에 대해 어떤 작업을 실행할까요?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            아래 행동 중에 하나를 골라주세요
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/*
        <Button color="secondary" variant="outlined" size="small" onClick={handleClose}>
                        폴더 탐색
        </Button>*/}
        <Button color="primary" variant="outlined" size="small" onClick={handleOpenExplorer}>
                        탐색기에서 열기
        </Button>
        <Button color="secondary" variant="outlined" size="small" onClick={handleAddVirtualDirectory}>
              가상 디렉토리에 추가
        </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackBarClose}>
                    <Alert onClose={handleSnackBarClose} severity="success">
                      {info.name} 폴더가 가상 디렉토리에 추가되었어요!
                    </Alert>
      </Snackbar>
    </>
  );
}

export default Folder;


