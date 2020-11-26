import React, {useState, useRef, useEffect} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {motion} from 'framer-motion';
import Scrollbars from 'react-custom-scrollbars';
import {Paper, Typography, Button, Divider } from  '@material-ui/core';
import Folder from './Folder';
import RightClickSnackbar from "../../Popup/RightClickSnackbar";

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
    function getFolderOpen(data){
        setFolderOpen(data);
    }
    useEffect(() => {
        props.systemText('VirtualDirectoryReady');
        console.log(folderOpen);
      });
    return (
        <>
            <motion.div className={classes.VirtualDirectoryWrapper}
                initial={{x:-250, opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{delay:0.2, duration : 0.5}}
            >
                <Scrollbars>
                    <Paper className={classes.VirtualDirectoryWrapperPaper} elevation={0} ref={constraintsRef}>
                        <Folder constraintsRef={constraintsRef} />
                        <Folder constraintsRef={constraintsRef} />
                        <Folder constraintsRef={constraintsRef} />
                        <Folder constraintsRef={constraintsRef} />
                        <Folder constraintsRef={constraintsRef} />
                        <Folder constraintsRef={constraintsRef} />
                    </Paper>
                </Scrollbars>
                <RightClickSnackbar SnackbarType={'VirtualDirectory'} folderOpen={folderOpen}/>
            </motion.div>
        </>
    );
}