import RemoteBoxButton from "./RemoteBoxButton";
import { GlobalContext } from "./GlobalContext";
import React, { useContext } from 'react';
const Remote = (props) => {
const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
const boxWidth = props.containerWidth*appSettings.remoteButtonWidth;
const boxHeight = props.containerHeight*appSettings.remoteButtonHeight;
 return (
    <div className={`remote ${appSettings.removeButtonsInput ? 'remove_buttons_input' : ''}`} 
      style={{
        backgroundImage: 'url('+appSettings.backgroundRemote+')',
        height: props.containerHeight*0.98, 
        width: props.containerWidth*appSettings.remoteWidth,
        left:"50%",
        bottom: appSettings.remoteBottom,
      }}>
        <div id="remoteRow1" className="remoteRow" style={{ top: appSettings.remoteButtonsTop[0], left: appSettings.remoteButtonsLeft}}>
            <div className="remoteBoxButton remoteBoxButtonPower" style={{width:boxWidth, height:boxHeight, backgroundImage: 'url("' + appSettings.backgroundPowerButton + '")', cursor:"pointer"}} onClick={props.onClickPowerButton}></div>
            {appSettings.removeButtonsInput ? 
                <div className="remoteBoxButton remoteBoxButtonInput" style={{width:boxWidth, height:boxHeight, display:"inline-block",backgroundImage: 'url("' + appSettings.backgroundButton + '")',}}>
                    <div style={{ justifyContent:"center", alignItems:"center", display:"flex", }} onClick={props.onClickInputButton}>               
                        <svg width={appSettings.buttonFontSize} height={appSettings.buttonFontSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20 12 H54 Q58 12 58 16 V48 Q58 52 54 52 H20 Q16 52 16 48 V40"
                            fill="none"
                            stroke={appSettings.buttonTextColor}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 32 H36"
                            fill="none"
                            stroke={appSettings.buttonTextColor}
                            strokeWidth="6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M28 24 L36 32 L28 40"
                            fill="none"
                            stroke={appSettings.buttonTextColor}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

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
                <div style={{ justifyContent:"center", alignItems:"center", display:"flex",}}>
                    <svg width={appSettings.remoteVolumeButtonSize} height={appSettings.remoteVolumeButtonSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 24v16h12l16 14V10L20 24H8z" fill={appSettings.remoteVolumeButtonColor}/>
                      <path d="M44 22c4 4 4 16 0 20" fill="none" stroke={appSettings.remoteVolumeButtonColor} strokeWidth="4" strokeLinecap="round"/>
                      <path d="M50 14c9 9 9 27 0 36" fill="none" stroke={appSettings.remoteVolumeButtonColor} strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>
            <RemoteBoxButton value={"+"} position={13} onClick={props.onClickIncreaseVolume} boxHeight={boxHeight} boxWidth={boxWidth} button={props.button}/>
        </div>
        {appSettings.removeButtonsInput &&        
        <div id="remoteRow7" className="remoteRow" style={{top: appSettings.remoteButtonsTop[6], left: appSettings.remoteButtonsLeft}}>
            <div className="remoteBoxButton" onClick={props.rewind} style={{width:boxWidth, height:boxHeight, display:"inline-block",backgroundImage: 'url("' + appSettings.backgroundButton + '")',}}>
                <div style={{ justifyContent:"center", alignItems:"center", display:"flex" }}>    
                    <svg width={appSettings.remoteVolumeButtonSize} height={appSettings.remoteVolumeButtonSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                      <path d="M34 16L14 32L34 48V16Z" fill={appSettings.remoteVolumeButtonColor}/>
                      <path d="M52 16L32 32L52 48V16Z" fill={appSettings.remoteVolumeButtonColor}/>
                    </svg>
                </div>
            </div>
            <div className="remoteBoxButton" onClick={props.handlePlayPause} style={{width:boxWidth, height:boxHeight, display:"inline-block",backgroundImage: 'url("' + appSettings.backgroundButton + '")',}}>
                <div style={{ justifyContent:"center", alignItems:"center", display:"flex", }}>                    
                    <svg width={appSettings.remoteVolumeButtonSize} height={appSettings.remoteVolumeButtonSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 16L34 32L14 48V16Z" fill={appSettings.remoteVolumeButtonColor}/>
                      <rect x="42" y="16" width="6" height="32" rx="1" fill={appSettings.remoteVolumeButtonColor}/>
                      <rect x="52" y="16" width="6" height="32" rx="1" fill={appSettings.remoteVolumeButtonColor}/>
                    </svg>
                </div>
            </div>            
            <div className="remoteBoxButton" onClick={props.forward} style={{width:boxWidth, height:boxHeight, display:"inline-block",backgroundImage: 'url("' + appSettings.backgroundButton + '")',}}>
                <div style={{ justifyContent:"center", alignItems:"center", display:"flex", }}>    
                    <svg width={appSettings.remoteVolumeButtonSize} height={appSettings.remoteVolumeButtonSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16L32 32L12 48V16Z" fill={appSettings.remoteVolumeButtonColor}/>
                      <path d="M30 16L50 32L30 48V16Z" fill={appSettings.remoteVolumeButtonColor}/>
                    </svg>
                </div>
            </div>
           
        </div>
    }
      </div>
 )
}
export default Remote;