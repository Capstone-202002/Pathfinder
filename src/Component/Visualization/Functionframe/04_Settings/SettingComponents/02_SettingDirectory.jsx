import React,{useState} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { Divider, Typography,Paper, Switch, Button } from "@material-ui/core";
import {CirclePicker} from 'react-color';
import {motion} from 'framer-motion';
import {useTracked, setValue} from '../../../../../SettingContext';
const path = require('path');
const { app } = window.require('electron').remote;
const appPath = app.getPath('userData');
const storage = window.require('electron-json-storage');
storage.setDataPath(appPath);
const useStyles = makeStyles((theme) => ({
    settingMenuWrapper:{
        width:'100%',
        height:'100%',
    },
    headDiv:{
        width: '100%',
        height : '60px',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    subHeadDiv:{
        width: '100%',
        height : '40px',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    horizonDiv:{
        width: '100%',
        display:'flex',
        flexDirection:'row',
        marginBottom:'20px',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    verticalDiv:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
    },
    versionSection:{
        width: '100%',
        display:'flex',
        flexDirection:'column',
        marginTop:'20px',
        marginBottom:'20px',
        justifyContent:'flex-start',
        alignItems:'center',
        padding:'20px'
    },
}));

export default function SettingDirectory(props){
    const [settings, setSettings]=useTracked();
    storeSettings(settings)
    const handleToggle=(event)=>{
        const targetName = event.target.name;
        const targetValue = event.target.checked;
        setSettings((s)=>(
            {
            ...s,
            [targetName]:targetValue,
        }
        ))
        //storeSettings()
    }
    function storeSettings(value){
        console.log(value)
        console.log(JSON.stringify(value))
        setValue(value)
        storage.set('config',value,function(err){console.log('setValueInSetting'); console.log(err)})
    }   


    const theme = useTheme();
    const [folder, setFolder] = useState('#DEF6FF')
    const [state, setState] = React.useState({
        folderSize:true,
        filenameColor:true,
        directoryShowAPS:true,
        matchCase:true,
    });
    const handleChange = (event) =>{
        setState({...state, [event.target.name]: event.target.checked});
    };
    const handleColorChange = (color, event)=>{
        console.log(event)
        setFolder(color.hex);
        //console.log(color.hex);
        setSettings((s)=>(
            {
            ...s,
            directoryViewFolderColor:color.hex,
        }
        ))
    };
    const classes = useStyles();
    return(
        <>
        <motion.div className={classes.settingMenuWrapper}
                initial={{x:-250, opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{delay:0.2, duration : 0.5}}
            >
            <div className={classes.headDiv}>
                <Typography variant="h6">
                    디렉토리 뷰 설정
                </Typography>
            </div>
            <Divider style={{marginBottom:'20px'}}/>
            <div className={classes.verticalDiv}>
                {/*
                폴더 색상 선택 화면
                */}
                <Paper className={classes.versionSection} elevation={0}>
                    <div className={classes.headDiv}>
                        <Typography variant="subtitle2" style={{marginRight:'30px'}}>
                            디렉토리 뷰 화면의 폴더 색상을 설정할 수 있어요.
                        </Typography>
                    </div>
                    <CirclePicker name='directoryViewFolderColor' width = '100%' onChangeComplete={handleColorChange}/>
                </Paper>
                {/*
                폴더 크기 용량에 따라 변경하는 기능 on/off
                STATE : state.folderSize => true 일 때 on, false 일 때 off
                TODO : 스테이트가 변경 될 때 디렉토리 뷰 기능 on/off 변경
                */}
                <Typography variant="subtitle2">
                    폴더 크기 자동 변경
                </Typography>
                <div className={classes.horizonDiv}>
                <Typography style={{marginRight:'100px'}}variant='subtitle1' color='textSecondary' align='left'>
                                디렉토리 뷰에서 용량에 따라 폴더 크기를 변화시킬까요?
                        </Typography>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                아니요!
                        </Typography>
                        <Switch
                            checked={settings.directoryViewFolderSizeOperation}
                            onChange={handleToggle}
                            name = "directoryViewFolderSizeOperation"
                        ></Switch>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                좋아요!
                        </Typography>
                </div>
                {/*
                디렉토리 뷰 텍스트 색상 변경 기능 on/off
                STATE : state.background => true 일 때 on, false일 때 off
                TODO : 스테이트 변경시 디렉토리 뷰 텍스트 색상 변경 기능 on/off
                */}
                <Typography variant="subtitle2">
                    파일 텍스트 색상 변경
                </Typography>
                <div className={classes.horizonDiv}>
                <Typography style={{marginRight:'30px'}}variant='subtitle1' color='textSecondary'  align='left'>
                                디렉토리 뷰에서 용량에 따라 파일 텍스트의 색상을 변화시킬까요?
                        </Typography>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                안돼요!
                        </Typography>
                        <Switch
                            checked={settings.directoryViewFileTextColorOperation}
                            onChange={handleToggle}
                            name = "directoryViewFileTextColorOperation"
                        ></Switch>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                좋아요!
                        </Typography>
                </div>
                
                
                {/*
                필터링 대소문자 구분 기능 on/off
                STATE : matchCase => true 일 때 대소문자 구분 안함, false일 때 대소문자 구분함
                TODO : 해당 기능 연결
                */}
                <Typography variant="subtitle2">
                    필터링 기능 대소문자 구분
                </Typography>
                <div className={classes.horizonDiv}>
                <Typography style={{marginRight:'30px'}}variant='subtitle1' color='textSecondary'   align='left'>
                                필터링 할 때 대문자와 소문자를 구별할까요?
                        </Typography>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                구별해주세요!
                        </Typography>
                        <Switch
                            checked={settings.directoryViewFilteringIsCaseSensitive}
                            onChange={handleToggle}
                            name = "directoryViewFilteringIsCaseSensitive"
                        ></Switch>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                구별하지 말아주세요!
                        </Typography>
                </div>
            </div>
            </motion.div>
        </>
    );
}