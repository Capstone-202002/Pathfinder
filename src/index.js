import { SortTwoTone } from "@material-ui/icons";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import HookTest from "./hooktest";
import * as serviceWorker from "./serviceWorker";
import {useTracked, Provider} from './SettingContext';



  ReactDOM.render(
    <React.StrictMode>
      <Provider>
          <HookTest />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  )
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();


  
  

