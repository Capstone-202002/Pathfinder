import React from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { Divider, Typography,Paper, Switch, Button, Slider } from "@material-ui/core";
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

export default function SettingPrivacy(){
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
        userPrivate:true,
        networkInbound:true,
    });
    const handleChange = (event) =>{
        setState({...state, [event.target.name]: event.target.checked});
    };
    const classes = useStyles();
    function deleteDB(){

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
                    개인정보 설정
                </Typography>
            </div>
            <Divider style={{marginBottom:'20px'}}/>
            <div className={classes.verticalDiv}>
                {/*
                개인정보 사용동의 여부
                STATE : state.userPrivate => true 일 때 허용 false 일 때 거부
                TODO : 스테이트가 변경 될 때 유저 개인정보 사용 on/off
                */}
                <Typography variant="subtitle2">
                    개인정보 사용 동의
                </Typography>
                <div className={classes.horizonDiv}>
                <Typography style={{marginRight:'30px'}}variant='subtitle1' color='textSecondary' align='left'>
                                패스파인더의 개선을 위해 개인정보를 사용할 수 있도록 해주세요.
                        </Typography>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                안돼요!
                        </Typography>
                        <Switch
                            checked={settings.personalInformationUsageAgreement}
                            onChange={handleToggle}
                            name = "personalInformationUsageAgreement"
                        ></Switch>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                좋아요!
                        </Typography>
                </div>
                {/*
                네트워크 감시 기능 사용 on/off
                STATE : state.networkInbound => false 일 때 네트워크로부터 받은 정보 중 이름을 제외하고 전부 날림
                TODO : 위에 언급한 기능 구현
                */}
                <Typography variant="subtitle2">
                    네트워크 감시 설정
                </Typography>
                <div className={classes.horizonDiv}>
                <Typography style={{marginRight:'30px'}}variant='subtitle1' color='textSecondary'  align='left'>
                                패스파인더가 다운로드 한 파일의 상세정보를 열람하게 해주세요.
                        </Typography>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                안돼요!
                        </Typography>
                        <Switch
                            checked={settings.downloadWatcherActivation}
                            onChange={handleToggle}
                            name = "downloadWatcherActivation"
                        ></Switch>
                        <Typography style={{marginRight:'10px'}}variant='subtitle2' align='left'>
                                괜찮아요!
                        </Typography>
                </div>
                
                {/*
                    DB 개인 데이터 파기 
                    TODO : 초기화 버튼의 onClick 이벤트 함수 deleteDB 를 통해 다운로드 히스토리 등 유저 개인 데이터를 삭제
                */}
                <Typography variant="subtitle2">
                    DB 데이터 파기
                </Typography>
                <div className={classes.horizonDiv}>
                <Typography style={{marginRight:'30px'}}variant='subtitle1' color='textSecondary'  align='left'>
                    주의하세요! 이 버튼을 누르면 다운로드 히스토리 등의 모든 개인 데이터가 사라져요.
                </Typography>
                <Button onClick={deleteDB} style={{backgroundColor:'red'}}> 파기해주세요 </Button>
                </div>
            </div>
            </motion.div>
        </>
    );
}