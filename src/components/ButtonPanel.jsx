import RemoteBoxButton from "./RemoteBoxButton";
import { GlobalContext } from "./GlobalContext";
import React, { useContext } from 'react';
import Icons from './Icons.jsx';

const ButtonPanel = (props) => {
const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
const boxWidth = props.containerWidth*appSettings.remoteButtonWidth;
const boxHeight = props.containerHeight*appSettings.remoteButtonHeight;
 return (
    <div></div>
 )
}
export default ButtonPanel;