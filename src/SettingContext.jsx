import React, { createContext, useState} from 'react';
import {createContainer} from 'react-tracked';
const path = require('path');
const { app } = window.require('electron').remote;
const appPath = app.getPath('userData');



//const initialState = getInitialState();




const initialState = {
  pathfinderTheme:true,
  pathfinderBackgroundOperation:true,
  pathfinderExitButtonOperation:true,
  directoryViewFolderColor:"#DEF6FF",
  directoryViewFolderSizeOperation:true,
  directoryViewFileTextColorOperation:true,
  directoryViewFilteringIsCaseSensitive:true,
  APSOperation:true,
  APSNoneFilteredInputButOperation:true,
  personalInformationUsageAgreement:true,
  downloadWatcherActivation:true,
  downloadPathAssist:true,
}


console.log(initialState.pathfinderTheme);

export const setValue = (value) => {
  const storage = window.require('electron-json-storage');
  storage.setDataPath(appPath);
  var returnValue ={}
  if(value === undefined){
    var key
    new Promise((resolve, reject)=>{
        storage.has('config', function(error,hashKey){
        //console.log('in has function')
        //console.log(hashKey)
        key=hashKey;
        //console.log(key)
      
        resolve();
      })
    
    }).then(()=>{
      console.log('in set value')
      console.log(key);
      if(key){
        //storage.set('config', value, function(error){console.log('setconfig occured with key')})
        
        storage.get('config', function(error,data){
          //console.log('set file Data');
          //console.log(data);
          console.log(data.length);
          if(Object.keys(data).length!==12){
            storage.remove('config', function(error){})
            storage.set('config',initialState, function(error){})
            returnValue=initialState;
            return;
          }
          returnValue=Object.assign(returnValue, data);
        })
        //console.log(returnValue);
        return;
      }
      else if(!key){
        storage.set('config',initialState, function(error){})
        console.log('initial setting');
        returnValue=Object.assign(returnValue, initialState);
        //console.log(returnValue);

      }
    })
    //console.log(returnValue);
    //console.log(returnValue.pathfinderTheme);
    return returnValue;
  
  }
  else{
    storage.set('config', value, function(error){console.log('setconfig occured')})
    return value;
  }
}
export const useValue = () => useState(setValue());
export const {Provider, useTracked} = createContainer(useValue)
