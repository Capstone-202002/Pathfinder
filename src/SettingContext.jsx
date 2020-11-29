import React, { createContext, useState} from 'react';
import {createContainer} from 'react-tracked';



const initialState = {pathfinderTheme:true,
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
}

const useValue = () => useState(initialState);

export const {Provider, useTracked} = createContainer(useValue);
