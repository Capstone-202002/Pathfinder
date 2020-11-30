import React, {useContext, useState} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { Divider, Typography,Paper,Switch,Button } from "@material-ui/core";
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
        marginBottom:'5px',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    subHeadDiv:{
        width: '100%',
        height : '40px',
        display:'flex',
        flexDirection:'row',
        marginBottom:'5px',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    versionSection:{
        width: '100%',
        height : '120px',
        display:'flex',
        flexDirection:'column',
        marginTop:'20px',
        marginBottom:'20px',
        justifyContent:'flex-start',
        alignItems:'center',
        padding:'20px'
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
    
}));

export default function SettingPathfinder(props){
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
    const classes = useStyles();

    function settingInitialize(){
        //초기화 버튼 클릭 함수
    }

    return(
        <>
        <motion.div className={classes.settingMenuWrapper}
                initial={{x:-250, opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{delay:0.2, duration : 0.5}}
            >
            <div className={classes.headDiv}>
                <Typography variant="h6">
                    패스파인더 설정
                </Typography>
            </div>
            <Divider style={{marginBottom:'20px'}}/>
            <div className={classes.verticalDiv}>
                {/*
                패스파인더 버전 디스플레이 구역
                TODO : 프로그램 버전과 윈도우 버전을 받아서 표시할 것.
                */}
                <Paper className={classes.versionSection} elevation={0}>
                    <div className={classes.headDiv}>
                        <Typography variant="h6" style={{marginRight:'30px'}}>
                            패스파인더 버전 : 
                        </Typography>
                        <Typography variant="h6" >
                            dev.pathfinderVersion
                        </Typography>
                    </div>
                    <div className={classes.headDiv}>
                        <Typography variant="h6" style={{marginRight:'30px'}}>
                            윈도우 버전 : 
                        </Typography>
                        <Typography variant="h6">
                            dev.clientWindowVersion
                        </Typography>
                    </div>
                </Paper>
                {/*
                패스파인더 테마 지정 스위치 구역
                STATE : state.theme => true 일 때 다크모드, false 일 때 라이트모드
                TODO : 스테이트가 변경 될 때 프로그램의 테마 변경
                */}
                <Typography variant="subtitle2">
                    패스파인더 테마
                </Typography>
                <div className={classes.horizonDiv}>
                <Typography style={{marginRight:'100px'}}variant='subtitle1' color='textSecondary' align='left'>
                                패스파인더는 두 개의 테마를 제공해요.
                        </Typography>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                라이트
                        </Typography>
                        <Switch
                             checked={settings.pathfinderTheme}
                             onChange={handleToggle}
                             name = "pathfinderTheme"
                         ></Switch>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                다크
                        </Typography>
                </div>
                {/*
                패스파인더 백그라운드 동작 설정 구역
                STATE : state.background => true 일 때 백그라운드 작업 허용, false일 때 비허용
                TODO : 비동기 작업 사용여부 연결
                */}
                <Typography variant="subtitle2">
                    백그라운드 동작 설정
                </Typography>
                <div className={classes.horizonDiv}>
                <Typography style={{marginRight:'30px'}}variant='subtitle1' color='textSecondary'  align='left'>
                                패스파인더가 백그라운드에서 컴퓨터 자원을 써도 될까요?
                        </Typography>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                안돼요!
                        </Typography>
                        <Switch
                            checked={settings.pathfinderBackgroundOperation}
                            onChange={handleToggle}
                            name = "pathfinderBackgroundOperation"
                        ></Switch>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                괜찮아요!
                        </Typography>
                </div>
                {/*
                종료 버튼 동작 설정 구역
                STATE : exitButton => true 일 때 프로그램 완전 종료, false일 때 프로그램 시스템 트레이로 이동
                TODO : 해당 기능 연결
                */}
                <Typography variant="subtitle2">
                    종료 버튼 동작 설정
                </Typography>
                <div className={classes.horizonDiv}>
                <Typography style={{marginRight:'30px'}}variant='subtitle1' color='textSecondary'   align='left'>
                                종료 버튼을 눌렀을 때 패스파인더의 행동지침을 정해주세요.
                        </Typography>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                시스템 트레이
                        </Typography>
                        <Switch
                            checked={settings.pathfinderExitButtonOperation}
                            onChange={handleToggle}
                            name = "pathfinderExitButtonOperation"
                        ></Switch>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                프로그램 종료
                        </Typography>
                </div>
                {/*
                    초기화 버튼 영역
                    TODO : 초기화 버튼의 onClick 이벤트 함수 settingInitialize 를 통해 설정의 모든 값을 초기값으로 되돌린다.
                */}
                <Typography variant="subtitle2">
                    설정 초기화
                </Typography>
                <div className={classes.horizonDiv}>
                <Typography style={{marginRight:'30px'}}variant='subtitle1' color='textSecondary'  align='left'>
                    주의하세요! 이 버튼을 누르면 되돌릴 수 없어요.
                </Typography>
                <Button onClick={settingInitialize} style={{backgroundColor:'red'}}> 초기화 할래요 </Button>
                </div>
            </div>
            </motion.div>
        </>
    );
}