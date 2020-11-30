import React, {useEffect, useState} from "react";
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import {motion} from 'framer-motion';
import Scrollbars from 'react-custom-scrollbars';
import {Paper, Typography, Button, Divider,TextField } from  '@material-ui/core';
import {DataGrid} from '@material-ui/data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';

const useStyles = makeStyles((theme) => ({
    APSWrapper:{
        width:'100%',
        height:'100%'
    },
    APSWrapperPaper:{
        width : '100%',
        padding : '30px',
        display:'flex',
        flexDirection:'column',
    },
    APSDataGrid:{
        marginTop:'5px',
        width : '100%',
        marginBottom:'30px',
        '& .MuiDataGrid-columnsContainer':{
            backgroundColor:theme.palette.background.default
        }
    },
    APSDataGridWrapper:{
        minHeight : '300px',
        width : '100%',
    },
    GridBlank:{
        width:'100%',
        height:'100px'
    },
    TextBlankBottom:{
        marginBottom:'15px',
    },
    TextBlankTop:{
        marginTop:'15px',
    },
    TextMarginRight:{
        marginRight:'15px'
    },
    horizonDiv:{
        width: '100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    newAPSDiv:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    newAPSSubDiv:{
        width:'100%',
        marginBottom:'10px'
    }

}));

export default function AppliedSortisticsMain(props){
    const theme = useTheme();
    const [clicked, setClicked]= useState('흡입기');
    const CssTextField = withStyles({
        root:{
            '& label.Mui-focused': {
                color: theme.palette.text.primary,
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: theme.palette.text.primary,
            },
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                borderColor: theme.palette.text.primary,
                },
            },
            },
            
    })(TextField);
    const [open, setOpen] = React.useState(false);
    function handleImportClickOpen(){
        setClicked('배출기');
        setOpen(true);
    }
    function handleExportClickOpen(){
        setClicked('흡입기');
        setOpen(true);
    }
    

    const handleClose = () => {
        setOpen(false);
    };
    function PaperComponent(props) {
        return (
          <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
          </Draggable>
        );
    }

    const classes = useStyles();
    useEffect(()=>{
        props.systemText('AppliedSortisticsReady');
    })
    function showFilterInfo(filterInfo){
        //TODO
    }
    const exportColumns =[
        {field : 'name', headerName:'이름', width : 150},
        {field : 'date', headerName:'최근 수정 날짜', width:200},
        {field : 'originDir', headerName:'부착 디렉토리', width : 250},
        {field : 'targetDir', headerName:'타겟 디렉토리', width : 250},
        {field:'filter', headerName:'필터',width : 100, renderCell:(params)=>(
            <>
                <Button size='small' onClick={showFilterInfo}>
                    필터 확인
                </Button>
            </>
        )},
    ];
    function createExportRowsData(exId, exName,exDate,exOriginDir,exTargetDir,exFilter){
        return {id:exId, name:exName, date:exDate,originDir:exOriginDir, targetDir:exTargetDir, filter:exFilter}
    }
    const exportRows =[
        createExportRowsData(1,'dev.testData',new Date(2020,11,14),'D:/helpme','D:/holy','dev.filter')
    ];
    const importColumns =[
        {field : 'name', headerName:'이름', width : 150},
        {field : 'date', headerName:'최근 수정 날짜', width:200},
        {field : 'originDir', headerName:'부착 디렉토리', width : 300},
        {field:'filter', headerName:'필터',width : 100, renderCell:(params)=>(
            <>
                <Button size='small' onClick={showFilterInfo}>
                    필터 확인
                </Button>
            </>
        )},
    ];
    function createImportRowsData(imId, imName,imDate,imOriginDir,imFilter){
        return {id:imId, name:imName, date:imDate,originDir:imOriginDir, filter:imFilter}
    }
    const importRows =[
        createImportRowsData(1,'dev.testData',new Date(2020,11,14),'D:/heplmee','dev.filter')
    ];

    const historyColumns =[
        {field : 'name', headerName:'이름', width : 150},
        {field : 'date', headerName:'이동 날짜', width:200},
        {field : 'originDir', headerName:'기존 디렉토리', width : 250},
        {field : 'targetDir', headerName:'이동한 디렉토리', width : 250},
    ];
    function createHistoryRowsData(historyId, historyName,historyDate,historyOriginDir,historyTargetDir){
        return {id:historyId, name:historyName, date:historyDate,originDir:historyOriginDir, targetDir:historyTargetDir}
    }
    const historyRows =[
        createHistoryRowsData(1,'dev.testData',new Date(2020,11,14),'D:/heplmee','dev.filter')
    ];

    function addDistClicked(){
        //TODO
        //DB에 흡입기/배출기 입력
        //스테이트 값 받아서 구현 
        //clicked => '흡입기' // '배출기'
        //searchName, searchExt => 각각 이름, 확장자
        //구현 완료 후 setAllElementToInitialState 를 불러서 값을 초기화 해줄 것(다이얼로그-스테이트를 이용해서 스테이트 이동 없이 구현)
    }
    const [state, setState] = React.useState({
        searchName: '',
        searchExt: '',
    });

    function setAllElementToInitialState() {
        setState({
            ...state,
            searchName: '',
            searchExt: '',
        });
    }
    function handleInputChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }
    return (
        <>
            <motion.div className={classes.APSWrapper}
                initial={{x:-250, opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{delay:0.2, duration : 0.5}}
            >
                <Scrollbars>
                    <Paper className={classes.APSWrapperPaper} elevation={0}>
                        <div className={classes.APSDataGridWrapper}>
                            <div className={classes.horizonDiv}>
                                <Typography variant='h6' className={classes.TextMarginRight}> 흡입기 </Typography>
                                <Button onClick={handleExportClickOpen}> 버튼을 눌러 추가 </Button>
                            </div>
                            <Divider/>
                            <Typography variant='caption' className={classes.TextBlankBottom}> 흡입기는 폴더를 지정하여 흡입기가 부착된 폴더 안에 든 파일들을 빼올 수 있습니다. 흡입기에 필터를 지정하면, 더 체계적인 관리를 할 수 있어요</Typography> 
                            <DataGrid className={classes.APSDataGrid} rows={exportRows} columns={exportColumns} checkboxSelection disableSelectionOnClick></DataGrid>
                        </div>
                        <div className={classes.GridBlank}></div>
                        <div className={classes.APSDataGridWrapper}>
                            <div className={classes.horizonDiv}>
                                <Typography variant='h6' className={classes.TextMarginRight}> 배출기 </Typography>
                                <Button onClick={handleImportClickOpen}> 버튼을 눌러 추가 </Button>
                            </div>
                            <Divider/>
                            <Typography variant='caption' className={classes.TextBlankBottom}> 배출기는 폴더를 지정하여 흡입기로부터 가져온 파일들을 배출기가 부착된 폴더에 넣을 수 있습니다. 배출기에 필터를 지정하면, 더 체계적인 관리를 할 수 있어요</Typography> 
                            <DataGrid className={classes.APSDataGrid} rows={importRows} columns={importColumns} checkboxSelection disableSelectionOnClick></DataGrid>
                        </div>
                        <div className={classes.GridBlank}></div>
                        <div className={classes.APSDataGridWrapper}>
                            <div className={classes.horizonDiv}>
                                <Typography variant='h6' className={classes.TextMarginRight}> 파일 자동 정리 내역 </Typography>
                                
                            </div>
                            <Divider/>
                            <Typography variant='caption' className={classes.TextBlankBottom}> 파일이 어디갔는지 모르겠다면 내역을 확인하세요. 항목을 누르면 메뉴가 뜬답니다.</Typography> 
                            <DataGrid className={classes.APSDataGrid} rows={historyRows} columns={historyColumns} checkboxSelection disableSelectionOnClick></DataGrid>
                        </div>
                    </Paper>
                </Scrollbars>
            </motion.div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    어떤  {clicked}를 추가할까요?
                </DialogTitle>
                <DialogContent>
                <DialogContentText variant={'subtitle2'}>
                    아래 양식을 입력해주세요.
                </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.newAPSDiv}>
                    <CssTextField id="searchDisplayNameTextField"
                                label="이름"
                                //defaultValue=""
                                helperText="파일이름으로 필터링 할 수 있어요"
                                variant="outlined"
                                
                                value={state.searchName}
                                name='searchName'
                                onChange={handleInputChange}
                                
                                className={classes.newAPSSubDiv}
                                >
                        </CssTextField>
                        {/* 파일 확장자 검색 텍스트 필드가 존재하는 곳. 내부값은 id로 검색하는 게 빠름 */}
                    <CssTextField id="searchDisplayTypeTextField"
                                label="확장자"
                                defaultValue=""
                                helperText="확장자명으로 필터링 할 수 있어요"
                                variant="outlined"
                                
                                value={state.searchExt}
                                name='searchExt'
                                onChange={handleInputChange}

                                className={classes.newAPSSubDiv}
                                >
                        </CssTextField>
                        <Button color="primary" size="small" onClick={addDistClicked}>
                            {clicked} 를 추가!
                        </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}