import React, { useState, useEffect } from "react";
import {makeStyles, useTheme} from  '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from "@material-ui/core/Typography";
import Explore from "@material-ui/icons/Explore"
import {motion} from 'framer-motion';
import { Loop } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
    systemTextWrapper:{
        width : '100%',
        height : '20px',
        backgroundColor : 'transparent',
        display : 'flex',
        textAlign: 'right',
        flexDirection : 'row-Reverse'
    },
    systemText:{
        width : 'calc(100%-30px)',
        height : '20px',
        marginRight : '5px'
    },
    exploreIconWrapper:{
        height : '20px',
        width : '20px',
        marginRight : '5px'
    }
}));

export default function SystemMessage(props){
    const classes = useStyles();
    return (
        <>
            <div>
                <Paper className={classes.systemTextWrapper}>
                    <motion.div className={classes.exploreIconWrapper}
                        animate={{
                            rotate : [90,270,180,90,180,90]
                        }}
                        transition={{
                            loop:Infinity,
                            type:'spring',
                            stiffness:100,
                            //mass:10,
                            repeatDelay:0.5
                        }}

                    >
                        <Explore fontSize='small'/>
                    </motion.div>
                    <Typography className={classes.systemText} fontSize = 'small'>
                        {props.systemText}
                    </Typography>
                    
                </Paper>
            </div>
        </>
    );
}