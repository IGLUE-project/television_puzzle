import { GlobalContext } from "./GlobalContext";
import React, { useContext } from 'react';
import TvButton from "./TvButton.jsx";
import Icons from './Icons.jsx';
import './../assets/scss/tvPanel.scss';

const TvPanel = (props) => {
const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
 return (
    <div className="tvPanel">
        <div id="tvPanelRow1" className="tvPanelRow">
            <TvButton position={1} onClick={props.onClickPowerButton} image={appSettings.backgroundPowerButton} />
        </div>
        <div id="tvPanelRow2" className="tvPanelRow">
           <TvButton value={"1"} text={"1"} position={2} onClick={props.onClickChannelButton} />
           <TvButton value={"2"} text={"2"} position={3} onClick={props.onClickChannelButton} />
           <TvButton value={"3"} text={"3"} position={4} onClick={props.onClickChannelButton} />
           <TvButton value={"4"} text={"4"} position={5} onClick={props.onClickChannelButton} />
        </div>
        <div id="tvPanelRow3" className="tvPanelRow">
           <TvButton value={"5"} text={"5"} position={6} onClick={props.onClickChannelButton} />
           <TvButton value={"6"} text={"6"} position={7} onClick={props.onClickChannelButton} />
           <TvButton value={"7"} text={"7"} position={8} onClick={props.onClickChannelButton} />
           <TvButton value={"8"} text={"8"} position={9} onClick={props.onClickChannelButton} />
        </div>
        <div id="tvPanelRow4" className="tvPanelRow">
           <TvButton value={"9"} text={"9"} position={10} onClick={props.onClickChannelButton} />
           <TvButton value={"0"} text={"0"} position={11} onClick={props.onClickChannelButton} />
           <TvButton value={"input"} text={"AV"} position={12} onClick={props.onClickInputButton} />
           <TvButton position={13} hidden={true} />
        </div>
        <div id="tvPanelRow5" className="tvPanelRow">
            <div className={"tvButton tvButtonVolumeIcon"}>
               {Icons.volumeTVIcon(appSettings)}
            </div>
           <TvButton value={"+"} text={"▲"} position={15} onClick={props.onClickIncreaseVolume} />
           <TvButton value={"-"} text={"▼"} position={16} onClick={props.onClickDecreaseVolume} />
        </div>
    </div>
 )
}
export default TvPanel;