import React, { useState, useEffect } from "react";
import {makeStyles, useTheme} from  '@material-ui/core/styles';
import { InsertDriveFileSharp } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import {motion, useAnimation} from "framer-motion";
import Button from "@material-ui/core/Button"
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import SearchDisplay from './SearchDisplay';

const useStyles = makeStyles((theme) => ({
    snfDiv:{
        position:'absolute',
        right:'0px',
        top:'0px',
        width:'50px',
        height:'360px',
        display:'flex',
        flexDirection:'column',
        marginTop:'60px',
        overflowX:'hidden',
    },
    snfButtonWithMenu:{

    },
    snfDrawer:{
        width : '300px',
        height:'calc(100% - 80px)',
        top : '60px',
        bottom : '20px',
        backgroundColor :theme.palette.background.default
    },
    snfButton:{
        //position : 'float',
        display:'flex',
        width:'50px',
        height : '180px',
        borderBottomLeftRadius : '20px',
        borderBottomRightRadius :'0px',
        borderTopRightRadius :'0px',
        borderTopLeftRadius : '0px',
        backgroundColor : theme.palette.background.default,
        justifyContent:'center',
    },
    snfFunction:{
        
    }
    
}))

export default function SearchAndFilter(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const buttonMovementControl = useAnimation();
    const handleDrawerOpen = () => {
        setOpen(true);
        props.systemText('SearchAndFilter');
    }
    const handleDrawerClose = () => {
        setOpen(false);
        props.systemText('VisualizationReady');
    }
    useEffect(()=>{
        props.isSearchingChanger(open);
    })
    const handleDrawerByOneButton = () => {
        if(open){
            handleDrawerClose();
            buttonMovementControl.start({
                x:'0px',
                transition:{ type:'spring', bounce:'0'}
            })
            return;
        }
        else{
            handleDrawerOpen();
            buttonMovementControl.start({
                x:'-300px',
                transition:{ type:'spring', bounce:'0'}
            })
            return;
        }
    }
    return (
        <>
            <motion.div
                className={classes.snfDiv}
                animate={buttonMovementControl}
                
                whileHover={{
                    //boxShadow:'0px, 0px, 8px, rgb(255,255,255)',
                }}>
                <div className={classes.snfButtonWithMenu}>
                    <motion.div>
                        <Button className={classes.snfButton} onClick={handleDrawerByOneButton}>
                            <SearchIcon style={{fontSize:'40px', marginRight:'8px'}}/>
                        </Button>
                    </motion.div>
                    
                </div>
                
            </motion.div>
            <Drawer variant='persistent' anchor='right' open={open} classes={{paper: classes.snfDrawer}}>
                    <SearchDisplay searchChanger={props.searchChanger}/>
            </Drawer>
        </>
        );
}