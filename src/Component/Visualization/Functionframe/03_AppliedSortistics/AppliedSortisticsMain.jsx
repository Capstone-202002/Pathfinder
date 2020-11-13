import React from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {motion} from 'framer-motion';
import Scrollbars from 'react-custom-scrollbars';
import {Paper, Typography, Button, Divider } from  '@material-ui/core';
import {DataGrid} from '@material-ui/data-grid';
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

}));

export default function AppliedSortisticsMain(props){
    const classes = useStyles();
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
                                <Button> 버튼을 눌러 추가 </Button>
                            </div>
                            <Divider/>
                            <Typography variant='caption' className={classes.TextBlankBottom}> 흡입기는 폴더를 지정하여 흡입기가 부착된 폴더 안에 든 파일들을 빼올 수 있습니다. 흡입기에 필터를 지정하면, 더 체계적인 관리를 할 수 있어요</Typography> 
                            <DataGrid className={classes.APSDataGrid} rows={exportRows} columns={exportColumns} checkboxSelection></DataGrid>
                        </div>
                        <div className={classes.GridBlank}></div>
                        <div className={classes.APSDataGridWrapper}>
                            <div className={classes.horizonDiv}>
                                <Typography variant='h6' className={classes.TextMarginRight}> 배출기 </Typography>
                                <Button> 버튼을 눌러 추가 </Button>
                            </div>
                            <Divider/>
                            <Typography variant='caption' className={classes.TextBlankBottom}> 배출기는 폴더를 지정하여 흡입기로부터 가져온 파일들을 배출기가 부착된 폴더에 넣을 수 있습니다. 배출기에 필터를 지정하면, 더 체계적인 관리를 할 수 있어요</Typography> 
                            <DataGrid className={classes.APSDataGrid} rows={importRows} columns={importColumns} checkboxSelection></DataGrid>
                        </div>
                    </Paper>
                </Scrollbars>
            </motion.div>
        </>
    );
}