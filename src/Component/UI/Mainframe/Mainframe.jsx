import React from "react";
import Box from '@material-ui/core/Box';
import {sizing} from '@material-ui/system';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { CssBaseline, Paper } from "@material-ui/core";
import LeftMenu from './LeftMenu';
import TopMenu from './TopMenu';
import SystemMessage from './SystemMessage';

const useStyles = makeStyles((theme) => ({
    spacing : 10,
    //application itself
    root: {
        display: 'flex',
        verticalAlign: 'middle',
        flexDirection: 'column',
        width : "100%",
        height : "100%",
        minWidth: 940,
        //minHeight: 600,
        color : '#0090FF',
        backgroundColor : '#0090FF'
        
    },
    //except system message
    app:{
        display: 'flex',
        //height: "100%",
        width: '100%',
        height:'calc(100% - 20px)',
        color: theme.palette.background.default,
        backgroundColor : theme.palette.background.default
    },
    //App's Left Side
    menu: {
        display: 'flex',
        flexDirection: 'column',
        width : 250,
        minHeight:500,
        height: "100%"
    },
    //App's Right Side
    right: {
        display: 'flex',
        flexDirection: 'column',
        height : "100%",
        width : 'calc(100% - 250px)',
        minWidth : 690,
        minHeight : 580
    },
    //Top title Area
    title: {
        display: 'flex',
        flexDirection : 'row',
        height: 60,
        width : "100%",
        WebkitUserSelect : "none",
        //WebkitAppRegion : "drag",
        //alignItems:'left'
    },
    //Main function area
    display: {
        display: 'flex',
        width : "100%",
        height : 'calc(100% - 60px)',
        backgroundColor: theme.palette.background.paper,
    },
    //System Message area
    message:{
        width : "100%",
        height : 20,
        overflow: 'hidden'
    },
    inner:{
        flexBasis: "auto",
        width : "100%",
        height : "100%"
    }
}))

export default function Mainframe(props){
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    document.body.style.backgroundColor = "transparent";
    document.body.style.color = "transparent";
    return(
        <Paper className={classes.root} color="#0090FF" style={{borderBottomLeftRadius : '160px'}}>
            <CssBaseline />
            
            <Paper className={classes.app} style={{borderBottomLeftRadius : '140px'}}>
                {/* application space*/}
                <div className={classes.menu}>
                    {/*App's Left Menu Section*/}
                    <LeftMenu/>
                </div>
                <div className={classes.right}>
                    {/*App's Right Display Section*/}
                    <div className={classes.title}>
                        {/*title bar section*/}
                        <TopMenu mainText={setMainTitleText()}/>
                    </div>
                    <div className={classes.display}>
                        {/*App's Main function display Section*/}
                        {props.contents}
                    </div>


                </div>
            </Paper>
            <div className={classes.message}>
                {/*system message space*/}
                <SystemMessage systemText={setSystemText()}/>
            </div>
        </Paper>
    );
}

function setMainTitleText(text){
    return '디렉토리 뷰'
}
function setSystemText(text){
    return '패스파인더가 디렉토리를 뒤적이고 있어요'
}