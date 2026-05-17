import PanelButton from "./PanelButton";
import { GlobalContext } from "./GlobalContext";
import React, { useContext } from 'react';
import Icons from './Icons.jsx';
import './../assets/scss/buttonPanel.scss';

const ButtonPanel = (props) => {
const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
const boxWidth = props.containerWidth*appSettings.panelButtonWidth;
const boxHeight = props.containerHeight*appSettings.panelButtonHeight;
 return (
    <div className="buttonPanel">
        <div id="buttonPanelRow1" className="buttonPanelRow">
            <PanelButton position={1} onClick={props.onClickPowerButton} image={appSettings.backgroundPowerButton} />
        </div>
        <div id="buttonPanelRow2" className="buttonPanelRow">
           <PanelButton value={"1"} text={"1"} position={2} onClick={props.onClickChannelButton} />
           <PanelButton value={"2"} text={"2"} position={3} onClick={props.onClickChannelButton} />
           <PanelButton value={"3"} text={"3"} position={4} onClick={props.onClickChannelButton} />
           <PanelButton value={"4"} text={"4"} position={5} onClick={props.onClickChannelButton} />
        </div>
        <div id="buttonPanelRow3" className="buttonPanelRow">
           <PanelButton value={"5"} text={"5"} position={6} onClick={props.onClickChannelButton} />
           <PanelButton value={"6"} text={"6"} position={7} onClick={props.onClickChannelButton} />
           <PanelButton value={"7"} text={"7"} position={8} onClick={props.onClickChannelButton} />
           <PanelButton value={"8"} text={"8"} position={9} onClick={props.onClickChannelButton} />
        </div>
        <div id="buttonPanelRow4" className="buttonPanelRow">
           <PanelButton value={"9"} text={"9"} position={10} onClick={props.onClickChannelButton} />
           <PanelButton value={"0"} text={"0"} position={11} onClick={props.onClickChannelButton} />
           <PanelButton value={"input"} text={"AV"} position={12} onClick={props.onClickInputButton} />
           <PanelButton position={13} hidden={true} />
        </div>
        <div id="buttonPanelRow5" className="buttonPanelRow">
            <div className={"panelButton panelButtonVolumeIcon"}>
               {Icons.volumeTVIcon(appSettings)}
            </div>
           <PanelButton value={"+"} text={"▲"} position={15} onClick={props.onClickIncreaseVolume} />
           <PanelButton value={"-"} text={"▼"} position={16} onClick={props.onClickDecreaseVolume} />
        </div>
    </div>




 )
}
export default ButtonPanel;