import React, {useState, useRef, useEffect} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {motion} from 'framer-motion';
import Scrollbars from 'react-custom-scrollbars';
import MuiAlert from '@material-ui/lab/Alert';
import {Paper, Typography, Button, Divider } from  '@material-ui/core';
import Folder from './Folder';
import RightClickSnackbar from "../../Popup/RightClickSnackbar";
import {selectVdir} from '../../../API/db';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
    VirtualDirectoryWrapper:{
        width:'100%',
        height:'100%'
    },
    VirtualDirectoryWrapperPaper:{
        width : '100%',
        height : '100%',
        padding : '30px',
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill,minmax(210px, auto))',
        gap:'10px',

    },
    horizonDiv:{
        width: '100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },

}));

export default function VirtualDirectoryMain(props){
    const classes = useStyles();
    const constraintsRef = React.createRef();
    const [folderOpen, setFolderOpen] = useState(false);
    const [somethingUpdated, setSomethingUpdated] = useState(-1);
    function getFolderOpen(data){
        setFolderOpen(data);
    }
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    useEffect(() => {
        props.systemText('VirtualDirectoryReady');
        //console.log(folderOpen);
      });
    function getUpdate(data){
        setSomethingUpdated(data);
        setOpen(true);
    }
    var renderSection;
    selectVdir((result)=>renderSection=result);
    var virtualDirectoryRenderer = renderSection.map((renderInfo, index)=>(
        <Folder constraintsRef={constraintsRef} key={index} info={renderInfo} update={getUpdate}/>
    ));
    
    return (
        <>
            <motion.div className={classes.VirtualDirectoryWrapper}
                initial={{x:-250, opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{delay:0.2, duration : 0.5}}
            >
                <Scrollbars>
                    <Paper className={classes.VirtualDirectoryWrapperPaper} elevation={0} ref={constraintsRef}>
                        {virtualDirectoryRenderer}
                    </Paper>
                </Scrollbars>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning">
                     가상 디렉토리가 폴더에서 제거되었어요!
                    </Alert>
                </Snackbar>
            </motion.div>
        </>
    );
}