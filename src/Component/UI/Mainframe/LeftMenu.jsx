import React, { useState, useEffect } from "react";
import {makeStyles, useTheme} from  '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import Paper from '@material-ui/core/Paper'
import { Typography,AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InsertEmoticon  from "@material-ui/icons/InsertEmoticon";
import { AnimateSharedLayout, motion } from "framer-motion";

const menuTexts = ['디렉토리 뷰', '다운로드 어시스트', '자동 폴더 정리', '설정']
const useStyles = makeStyles((theme) => ({
    iconSection:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width : '100%',
        height : "220px",
        alignItems : "center",
        backgroundColor : theme.palette.background.default,
        //verticalAlign: "middle",
    },
    virtualDirectorySection:{
        width : '100%',
        
    },
    virtualDirectoryAccordion:{
        width : '100%',
        maxHeight : '200px',
        backgroundColor : theme.palette.divider, 
    },
    menuButtonsSection:{
        display : 'flex',
        flexDirection: 'column',
        height : "240px",
        width : "100%",
        margin : '0',
        padding : '0'
    },
    menuButtons:{
        display : 'flex',
        flexDirection : 'row',
        width : '100%',
        height : '60px',
        justifyContent:'center',
        alignItems : 'center',
        //paddingLeft : '25px',
        //verticalAlign : 'center',
        textAlign : 'left',
        backgroundColor  : theme.palette.background.default
    },
    insideButton:{
        display  : 'flex',
        flexDirection : 'row',
        justifyContent :'flex-start',
        alignItems : 'center',
        width : '100%',
        height : '100%',
        radius : 0,
        backgroundColor : theme.palette.background.default
    },
    buttonTextStyle:{
        position : 'absolute',
        x : '40px',
        paddingLeft : '60px',
    },
    buttonClickCycleAnimation:{
        marginLeft : '20px',
        position : 'relative',
        x : '20px'
    }
}))

export default function LeftMenu(props){
    const classes = useStyles();
    const theme = useTheme();
    const [selected, setSelected] = useState(null);

    return(
        <>
            <div>
                <Paper className={classes.iconSection}>
                    <InsertEmoticon fontSize='large' color="#fff"/>
                    <Typography size='40px' color={theme.palette.text.primary}>PATHFINDER</Typography>
                </Paper>
            </div>
            <div className={classes.virtualDirectorySection}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography> 가상 디렉토리 </Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>
                <AnimateSharedLayout>
                    <ul className={classes.menuButtonsSection}>
                        {menu.map(item => (
                            <Item
                                key={item}
                                isSelected={selected === item}
                                onClick={() => setSelected(item)}
                                menuItem = {menuTexts[item]}
                            />
                        ))}
                    </ul>
                </AnimateSharedLayout>
            </div>
            
            
        </>

    );
}

const menu = [0,1,2,3];

function Item({ isSelected, onClick, menuItem}){
    const classes = useStyles();
    const theme = useTheme();
    return (
        <>
            <li className={classes.menuButtons} onClick={onClick} >
                    <motion.div
                        drag
                        className = {classes.insideButton}
                        whileHover={{scale:1.1}}
                        whileTap={{scale:0.9, opacity:0.9}}
                    >
                        <Paper
                            className={classes.insideButton}
                        >
                            {
                            isSelected && (
                                /*
                                <motion.div
                                    className={classes.menuButtons}
                                    initial={false}
                                    animate={{backgroundColor:'#ffffff'}}
                                    transition={spring}
                                >

                                </motion.div>*/
                                <motion.div
                                    
                                    className={classes.buttonClickCycleAnimation}
                                    style={{backgroundColor : '#ffffff', width : '20px', height : '20px'}}
                                    animate={{
                                        scale: [1, 2, 2, 1, 1],
                                        rotate: [0, 0, 270, 270, 0],
                                        borderRadius: ["20%", "20%", "50%", "50%", "20%"]
                                    }}
                                    transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.2, 0.5, 0.8, 1],
                                        repeatDelay: 1
                                    }}
                                />
                            )
                            }
                            
                            <Typography color = {theme.palette.text.primary} className={classes.buttonTextStyle}>
                                {menuItem}
                            </Typography>
                        </Paper>
                    </motion.div>
                

            </li>
        </>
    );
}

const spring = {
    type: "spring",
    stiffness: 100,
    damping : 30
}