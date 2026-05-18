import { GlobalContext } from "./GlobalContext";
import React, { useContext } from 'react';
import VideoButton from "./VideoButton";
import Icons from './Icons.jsx';
import './../assets/scss/videoPanel.scss';

const VideoPanel = (props) => {
const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
 return (
    <div className="videoPanelWrapper">
      <div className="videoPanel">
        <VideoButton position={1} icon={Icons.powerIconOff(appSettings)} onClick={props.onClickPowerButton} />
        <VideoButton position={2} icon={Icons.ejectIconVHS(appSettings)} onClick={props.onClickEjectInput} />
        { appSettings.enableRewindAndForward ? <VideoButton position={3} icon={Icons.rewindRemoteIcon(appSettings)} onClick={props.onClickRewind}/> : null}
        <VideoButton position={4} icon={Icons.playPauseRemoteIcon(appSettings)} onClick={props.onClickPlayPause} />
        { appSettings.enableRewindAndForward ? <VideoButton position={5} icon={Icons.forwardRemoteIcon(appSettings)} onClick={props.onClickForward}/>: null}
      </div>
      <div className="videoPowerIndicator">
        <div>
          {props.inputPlayerState === "on" ? Icons.circleOn(appSettings) : Icons.circleOff(appSettings)}
        </div>
      </div>
    </div>
 )
}
export default VideoPanel;