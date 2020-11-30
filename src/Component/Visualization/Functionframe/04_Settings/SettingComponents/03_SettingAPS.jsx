import React from "react";
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

export default function SettingAPS(props){
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
    const [state, setState] = React.useState({
        emptyFilter:true,
        apsStatus:true,
    });
    const handleChange = (event) =>{
        setState({...state, [event.target.name]: event.target.checked});
    };
    const classes = useStyles();
    function onAPSAllDelete(){

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
                    자동 폴더정리 설정
                </Typography>
            </div>
            <Divider style={{marginBottom:'20px'}}/>
            <div className={classes.verticalDiv}>
                {/*
                패스파인더 내부 버스 표시 구역
                일반 사용자가 알아듣기 어려워 흡입기/배출기로 이름 정정
                TODO : 흡입기/배출기 모두 갯수 출력.
                */}
                <Paper className={classes.versionSection} elevation={0}>
                    <div className={classes.headDiv}>
                        <Typography variant="subtitle2">
                            패스 파인더 내부의 청소기들의 개수를 표시해요.
                        </Typography>
                    </div>
                        
                    <div className={classes.headDiv}>
                        <Typography variant="h6" style={{marginRight:'30px'}}>
                            현재 흡입기 개수 : 
                        </Typography>
                        <Typography variant="h6" >
                            dev.db.APSOutputBus.numbers
                        </Typography>
                    </div>
                    <div className={classes.headDiv}>
                        <Typography variant="h6" style={{marginRight:'30px'}}>
                            현재 배출기 개수 : 
                        </Typography>
                        <Typography variant="h6">
                            dev.db.APSImportBus.numbers
                        </Typography>
                    </div>
                </Paper>
                {/*
                폴더 자동 정리기능 on/off
                STATE : state.apsStatus => true 일 때 on, false 일 때 off
                TODO : 스테이트 변경시 aps전체를 끌지 켤지 결정하는 함수 제작
                */}
                <Typography variant="subtitle2">
                    자동 폴더 정리 기능
                </Typography>
                <div className={classes.horizonDiv}>
                <Typography style={{marginRight:'30px'}}variant='subtitle1' color='textSecondary' align='left'>
                                자동 폴더 정리 기능은 강력하지만, 시스템의 자원을 많이 잡아먹어요.
                        </Typography>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                꺼주세요.
                        </Typography>
                        <Switch
                            checked={settings.APSOperation}
                            onChange={handleToggle}
                            name = "APSOperation"
                        ></Switch>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                괜찮아요. 사용할게요.
                        </Typography>
                </div>
                
                {/*
                패스파인더 필터없는 흡입기 동작 설정 구역
                STATE : state.emptyFilter => true 일 때 흡입기 동작 허용, false일 때 비허용
                TODO : 필터없는 흡입기 작동 on/off
                */}
                <Typography variant="subtitle2">
                    필터가 없는 흡입기 동작 설정
                </Typography>
                <div className={classes.horizonDiv}>
                <Typography style={{marginRight:'30px'}}variant='subtitle1' color='textSecondary'  align='left'>
                                필터가 없는 흡입기는 폴더 안의 모든 파일을 정리 대상으로 삼는답니다.
                        </Typography>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                안돼요!
                        </Typography>
                        <Switch
                            checked={settings.APSNoneFilteredInputButOperation}
                            onChange={handleToggle}
                            name = "APSNoneFilteredInputButOperation"
                        ></Switch>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                괜찮아요!
                        </Typography>
                </div>
                
                {/*
                    초기화 버튼 영역
                    TODO : 초기화 버튼의 onClick 이벤트 함수를 만들어 aps의 값을 전부 날린다
                */}
                <Typography variant="subtitle2">
                    폴더 자동 정리 기능 초기화
                </Typography>
                <div className={classes.horizonDiv}>
                <Typography style={{marginRight:'30px'}}variant='subtitle1' color='textSecondary'  align='left'>
                    주의하세요! 이 버튼을 누르면 모든 흡입기, 배출기와 필터의 데이터가 소멸합니다.
                </Typography>
                <Button onClick={onAPSAllDelete} style={{backgroundColor:'red'}}> 초기화 할래요 </Button>
                </div>
            </div>
            </motion.div>
        </>
    );
}