import RemoteBoxButton from "./RemoteBoxButton";
import { GlobalContext } from "./GlobalContext";
import React, { useContext } from 'react';
import Icons from './Icons.jsx';

const Remote = (props) => {
const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
const boxWidth = props.containerWidth*appSettings.remoteButtonWidth;
const boxHeight = props.containerHeight*appSettings.remoteButtonHeight;
 return (
    <div className={`remote ${appSettings.remoteButtonsInput ? 'remote_buttons_input' : ''}`} 
      style={{
        backgroundImage: 'url('+appSettings.backgroundRemote+')',
        height: props.containerHeight*0.98, 
        width: props.containerWidth*appSettings.remoteWidth,
        left:"50%",
        bottom: appSettings.remoteBottom,
      }}>
        <div id="remoteRow1" className="remoteRow" style={{ top: appSettings.remoteButtonsTop[0], left: appSettings.remoteButtonsLeft}}>
            <div className="remoteBoxButton remoteBoxButtonPower" style={{width:boxWidth, height:boxHeight, backgroundImage: 'url("' + appSettings.backgroundPowerButton + '")', cursor:"pointer"}} onClick={props.onClickPowerButton}></div>
            {appSettings.remoteButtonsInput ? 
                <div className="remoteBoxButton remoteBoxButtonInput" style={{width:boxWidth, height:boxHeight, display:"inline-block",backgroundImage: 'url("' + appSettings.backgroundButton + '")',}}>
                    <div style={{ justifyContent:"center", alignItems:"center", display:"flex", }} onClick={props.onClickInputButton}>               
                        {Icons.inputRemoteIcon(appSettings)}
                    </div>
                </div> : null
            }
        </div>
        <div id="remoteRow2" className="remoteRow" style={{ top: appSettings.remoteButtonsTop[1], left: appSettings.remoteButtonsLeft}}>
            <RemoteBoxButton value={"1"} position={1} onClick={props.onClickChannelButton} boxHeight={boxHeight} boxWidth={boxWidth} button={props.button}/>
            <RemoteBoxButton value={"2"} position={2} onClick={props.onClickChannelButton} boxHeight={boxHeight} boxWidth={boxWidth} button={props.button}/>
            <RemoteBoxButton value={"3"} position={3} onClick={props.onClickChannelButton} boxHeight={boxHeight} boxWidth={boxWidth} button={props.button}/>
        </div>
        <div id="remoteRow3" className="remoteRow" style={{ top: appSettings.remoteButtonsTop[2], left: appSettings.remoteButtonsLeft}} >
            <RemoteBoxButton value={"4"} position={4} onClick={props.onClickChannelButton} boxHeight={boxHeight} boxWidth={boxWidth} button={props.button}/>
            <RemoteBoxButton value={"5"} position={5} onClick={props.onClickChannelButton} boxHeight={boxHeight} boxWidth={boxWidth} button={props.button}/>
            <RemoteBoxButton value={"6"} position={6} onClick={props.onClickChannelButton} boxHeight={boxHeight} boxWidth={boxWidth} button={props.button}/>
        </div>
        <div id="remoteRow4" className="remoteRow" style={{ top: appSettings.remoteButtonsTop[3] , left: appSettings.remoteButtonsLeft}}>
            <RemoteBoxButton value={"7"} position={7} onClick={props.onClickChannelButton} boxHeight={boxHeight} boxWidth={boxWidth} button={props.button}/>
            <RemoteBoxButton value={"8"} position={8} onClick={props.onClickChannelButton} boxHeight={boxHeight} boxWidth={boxWidth} button={props.button}/>
            <RemoteBoxButton value={"9"} position={9} onClick={props.onClickChannelButton} boxHeight={boxHeight} boxWidth={boxWidth} button={props.button}/>
        </div>
        <div id="remoteRow5" className="remoteRow" style={{top: appSettings.remoteButtonsTop[4], left: appSettings.remoteButtonsLeft}}>
            <div style={{width:boxWidth, height:boxHeight,}}/>
            <RemoteBoxButton value={"0"} position={11} onClick={props.onClickChannelButton} boxHeight={boxHeight} boxWidth={boxWidth} button={props.button}/>
            <div style={{width:boxWidth, height:boxHeight,}}/>
        </div>
        <div id="remoteRow6" className="remoteRow" style={{top: appSettings.remoteButtonsTop[5], left: appSettings.remoteButtonsLeft}}>
            <RemoteBoxButton value={"-"} position={12} onClick={props.onClickDecreaseVolume} boxHeight={boxHeight} boxWidth={boxWidth} button={props.button}/>
            <div style={{width:boxWidth, height:boxHeight, display:"inline-block", marginTop: "-8%"}}>
                <div style={{ justifyContent:"center", alignItems:"center", display:"flex"}}>
                    {Icons.volumeRemoteIcon(appSettings)}
                </div>
            </div>
            <RemoteBoxButton value={"+"} position={13} onClick={props.onClickIncreaseVolume} boxHeight={boxHeight} boxWidth={boxWidth} button={props.button}/>
        </div>
        {appSettings.remoteButtonsInput &&        
        <div id="remoteRow7" className="remoteRow" style={{top: appSettings.remoteButtonsTop[6], left: appSettings.remoteButtonsLeft}}>
            { appSettings.enableRewindAndForward && <div className="remoteBoxButton" onClick={props.onClickRewind} style={{width:boxWidth, height:boxHeight, display:"inline-block",backgroundImage: 'url("' + appSettings.backgroundButton + '")',}}>
                <div style={{ justifyContent:"center", alignItems:"center", display:"flex" }}>    
                    {Icons.rewindRemoteIcon(appSettings)}
                </div>
            </div> }
            <div className="remoteBoxButton" onClick={props.onClickPlayPause} style={{width:boxWidth, height:boxHeight, display:"inline-block",backgroundImage: 'url("' + appSettings.backgroundButton + '")',}}>
                <div style={{ justifyContent:"center", alignItems:"center", display:"flex", }}>                    
                    {Icons.playPauseRemoteIcon(appSettings)}
                </div>
            </div>            
            { appSettings.enableRewindAndForward && <div className="remoteBoxButton" onClick={props.onClickForward} style={{width:boxWidth, height:boxHeight, display:"inline-block",backgroundImage: 'url("' + appSettings.backgroundButton + '")',}}>
                <div style={{ justifyContent:"center", alignItems:"center", display:"flex", }}>    
                    {Icons.forwardRemoteIcon(appSettings)}
                </div>
            </div> }
        </div>
    }
      </div>
 )
}
export default Remote;