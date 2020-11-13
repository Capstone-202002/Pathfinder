import React from "react";
import SettingPathfinder from './SettingComponents/01_SettingPathfinder';
import SettingDirectory from './SettingComponents/02_SettingDirectory';
import SettingAPS from './SettingComponents/03_SettingAPS';
import SettingPrivacy from './SettingComponents/04_SettingPrivacy';

export default function SettingMenuComponent(props){
    if(props.children==='settingPathfinder'){
        return (
            <>
                <SettingPathfinder/>
            </>
        );
    }
    else if(props.children==='settingDirectory'){
        return (
            <>
                <SettingDirectory/>
            </>
        );
    }
    else if(props.children==='settingAppliedSortistics'){
        return (
            <>
                <SettingAPS/>
            </>
        );
    }
    else if(props.children==='settingPrivacy'){
        return (
            <>
                <SettingPrivacy/>
            </>
        );
    }
}