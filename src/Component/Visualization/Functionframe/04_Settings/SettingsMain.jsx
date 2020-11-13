import React,{useState} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Paper, Typography} from '@material-ui/core';
import Scrollbars from 'react-custom-scrollbars';
import {motion} from 'framer-motion';
import SettingMenuComponent from './SettingMenuComponent';
const useStyles = makeStyles((theme) => ({
    settingWrapper:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'row',
    },
    settingMenuSection:{
        width:'250px',
        height:'100%',
    },
    settingMenuSectionPaper:{
        width:'100%',
        minHeight:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        padding:'10px',
        borderRadius:'0',
        backgroundColor:theme.palette.paper,
    },
    settingComponentSection:{
        width:'100%',
        height:'100%',
    },
    settingComponentSectionPaper:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
        padding:'40px',
        backgroundColor:theme.palette.action.hover
    },
    settingMenuButtons:{
        display : 'flex',
        flexDirection : 'row',
        width : '100%',
        height : '45px',
        justifyContent:'center',
        alignItems : 'center',
        textAlign : 'left',
    },


}));

export default function SettingsMain(props){
    const classes = useStyles();
    const theme = useTheme();
    const clicked = theme.palette.background.default;
    const unClicked = theme.palette.paper;
    const [comp, setComp] = useState('settingPathfinder')
    const [buttonBg1,setButtonBg1] = useState(clicked);
    const [buttonBg2,setButtonBg2] = useState(unClicked);
    const [buttonBg3,setButtonBg3] = useState(unClicked);
    const [buttonBg4,setButtonBg4] = useState(unClicked);
    function buttonClick1(){
        setButtonBg1(clicked);
        setButtonBg2(unClicked);
        setButtonBg3(unClicked);
        setButtonBg4(unClicked);
    }
    function buttonClick2(){
        setButtonBg2(clicked);
        setButtonBg1(unClicked);
        setButtonBg3(unClicked);
        setButtonBg4(unClicked);
    }
    function buttonClick3(){
        setButtonBg3(clicked);
        setButtonBg2(unClicked);
        setButtonBg1(unClicked);
        setButtonBg4(unClicked);
    }
    function buttonClick4(){
        setButtonBg4(clicked);
        setButtonBg2(unClicked);
        setButtonBg3(unClicked);
        setButtonBg1(unClicked);
    }
    return (<>
                <motion.div className={classes.settingWrapper}
                    initial={{x:-250, opacity:0}}
                    animate={{x:0, opacity:1}}
                    transition={{delay:0.2, duration : 0.5}}
                >
                    <div className={classes.settingMenuSection}>
                        <Paper className={classes.settingMenuSectionPaper}>
                            <motion.div onClick={()=>setComp('settingPathfinder')} className={classes.settingMenuButtons} style={{marginBottom:'5px'}}
                                whileHover={{scale:1.1}}
                                whileTap={{scale:0.9, opacity:0.9}}
                            >
                                <Paper className={classes.settingMenuButtons} elevation={0} onClick={buttonClick1} style={{backgroundColor: buttonBg1}}>
                                    <Typography variant='subtitle2'>
                                        패스파인더 설정
                                    </Typography>
                                </Paper>
                            </motion.div>
                            <motion.div onClick={()=>setComp('settingDirectory')} className={classes.settingMenuButtons} style={{marginBottom:'5px'}}
                                whileHover={{scale:1.1}}
                                whileTap={{scale:0.9, opacity:0.9}}
                            >
                                <Paper className={classes.settingMenuButtons} elevation={0} onClick={buttonClick2} style={{backgroundColor: buttonBg2}}>
                                    <Typography variant='subtitle2'>
                                        디렉토리 뷰 설정
                                    </Typography>
                                </Paper>
                            </motion.div>
                            <motion.div onClick={()=>setComp('settingAppliedSortistics')} className={classes.settingMenuButtons} style={{marginBottom:'5px'}}
                                whileHover={{scale:1.1}}
                                whileTap={{scale:0.9, opacity:0.9}}
                            >
                                <Paper className={classes.settingMenuButtons} elevation={0} onClick={buttonClick3} style={{backgroundColor: buttonBg3}}>
                                    <Typography variant='subtitle2'>
                                        디렉토리 자동 정리 설정
                                    </Typography>
                                </Paper>
                            </motion.div>
                            <motion.div onClick={()=>setComp('settingPrivacy')} className={classes.settingMenuButtons} style={{marginBottom:'5px'}}
                                whileHover={{scale:1.1}}
                                whileTap={{scale:0.9, opacity:0.9}}
                            >
                                <Paper className={classes.settingMenuButtons} elevation={0} onClick={buttonClick4} style={{backgroundColor: buttonBg4}}>
                                    <Typography variant='subtitle2'>
                                        개인정보 설정
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Paper>
                    </div>
                    <div className={classes.settingComponentSection}>
                        <Scrollbars>
                            <Paper className={classes.settingComponentSectionPaper}>
                                <SettingMenuComponent children={comp}/>
                            </Paper>
                        </Scrollbars>
                    </div>
                </motion.div>
    
    </>
    );
}