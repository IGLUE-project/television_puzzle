import BoxButton from "./BoxButton";
import { GlobalContext } from "./GlobalContext";
import React, { useContext } from 'react';
const Remote = (props) => {
  const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
 return (
    <div className='remote' style={{
        backgroundImage: 'url('+appSettings.backgroundRemote+')',
        height: props.boxHeight, 
        width: props.boxWidth*appSettings.remoteWidth,
        left:"50%",
        bottom: appSettings.remoteBottom,
        zIndex: 100,
       // top: "80%",
      }}>
        <div id="row0" className="row" style={{ top: appSettings.buttonsTop[0], left: appSettings.buttonsLeft}}>
            <div className="boxButton" style={{width:props.boxWidth*appSettings.buttonWidth, height:props.boxHeight*appSettings.buttonHeight, backgroundImage: 'url("' + appSettings.backgroundPowerButton + '")', cursor:"pointer"}} onClick={props.powerButtonOnClick}></div>
            <div style={{width:props.boxWidth*appSettings.buttonWidth, height:props.boxHeight*appSettings.buttonHeight,}}/>
            {appSettings.displayVHS ? 
            <div className="boxButton" style={{width:props.boxWidth*appSettings.buttonWidth, height:props.boxHeight*appSettings.buttonHeight, display:"inline-block",backgroundImage: 'url("' + appSettings.backgroundButton + '")',}}>
                <div style={{ justifyContent:"center", alignItems:"center", display:"flex", }} onClick={props.inputOnClick}>               
                    <svg width={appSettings.buttonFontSize}  height={appSettings.buttonFontSize}  viewBox="0 -960 960 960" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill={appSettings.buttonTextColor} stroke={appSettings.buttonTextColor}><path d="M160-160q-33 0-56.5-23.5T80-240v-120h80v120h640v-480H160v120H80v-120q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm300-140-56-58 83-82H80v-80h407l-83-82 56-58 180 180-180 180Z"/></svg>
                </div>
            </div> :
            <div style={{width:props.boxWidth*appSettings.buttonWidth, height:props.boxHeight*appSettings.buttonHeight,}}/>
            }
        </div>
        <div id="row1" className="row" style={{ top: appSettings.buttonsTop[1], left: appSettings.buttonsLeft}}>
            <BoxButton value={"1"} position={1} onClick={props.onClickButton} boxHeight={props.boxHeight} boxWidth={props.boxWidth} button={props.button}/>
            <BoxButton value={"2"} position={2} onClick={props.onClickButton} boxHeight={props.boxHeight} boxWidth={props.boxWidth} button={props.button}/>
            <BoxButton value={"3"} position={3} onClick={props.onClickButton} boxHeight={props.boxHeight} boxWidth={props.boxWidth} button={props.button}/>
        </div>
        <div id="row2" className="row" style={{ top: appSettings.buttonsTop[2], left: appSettings.buttonsLeft}} >
            <BoxButton value={"4"} position={4} onClick={props.onClickButton} boxHeight={props.boxHeight} boxWidth={props.boxWidth} button={props.button}/>
            <BoxButton value={"5"} position={5} onClick={props.onClickButton} boxHeight={props.boxHeight} boxWidth={props.boxWidth} button={props.button}/>
            <BoxButton value={"6"} position={6} onClick={props.onClickButton} boxHeight={props.boxHeight} boxWidth={props.boxWidth} button={props.button}/>
        </div>
        <div id="row3" className="row" style={{ top: appSettings.buttonsTop[3] , left: appSettings.buttonsLeft}}>
            <BoxButton value={"7"} position={7} onClick={props.onClickButton} boxHeight={props.boxHeight} boxWidth={props.boxWidth} button={props.button}/>
            <BoxButton value={"8"} position={8} onClick={props.onClickButton} boxHeight={props.boxHeight} boxWidth={props.boxWidth} button={props.button}/>
            <BoxButton value={"9"} position={9} onClick={props.onClickButton} boxHeight={props.boxHeight} boxWidth={props.boxWidth} button={props.button}/>
        </div>
        <div id="row4" className="row" style={{top: appSettings.buttonsTop[4], left: appSettings.buttonsLeft}}>
            <div style={{width:props.boxWidth*appSettings.buttonWidth, height:props.boxHeight*appSettings.buttonHeight,}}/>
            <BoxButton value={"0"} position={11} onClick={props.onClickButton} boxHeight={props.boxHeight} boxWidth={props.boxWidth} button={props.button}/>
            <div style={{width:props.boxWidth*appSettings.buttonWidth, height:props.boxHeight*appSettings.buttonHeight,}}/>
        </div>
        <div id="row5" className="row" style={{top: appSettings.buttonsTop[5], left: appSettings.buttonsLeft}}>
            <BoxButton value={"-"} position={12} onClick={props.decreaseVolume} boxHeight={props.boxHeight} boxWidth={props.boxWidth} button={props.button}/>
            <div style={{width:props.boxWidth*appSettings.buttonWidth, height:props.boxHeight*appSettings.buttonHeight, display:"inline-block",}}>
                <div style={{ justifyContent:"center", alignItems:"center", display:"flex",}}>
                    <svg style={{marginTop:appSettings.volumeIconTop}} width={appSettings.soundIconSize} height={appSettings.soundIconSize} viewBox="0 -1 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={appSettings.soundIconColor} stroke={appSettings.soundIconColor}> <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g> <g id="SVGRepo_iconCarrier"> <title>multimedia / 4 - multimedia, audio, music, sound, max, speaker, volume icon</title> <g id="Free-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" > <g transform="translate(-968.000000, -304.000000)" id="Group" stroke={appSettings.soundIconColor} strokeWidth="2"> <g transform="translate(967.000000, 302.000000)" id="Shape"> <path d="M18.22291,4.24772391 C20.3461043,5.89188107 21.7500001,8.74918751 21.7500001,12 C21.7500001,15.2055503 20.384926,18.0284761 18.3111758,19.6828962"></path> <path d="M16.25,16.5 C17.434,15.6838509 18.25,13.984472 18.25,12.0055901 C18.25,10.0267081 17.434,8.32732919 16.25,7.5"></path> <path d="M4.254916,9 L6.24999966,9 L11.2499997,3 L13.2499997,3 L13.2499997,20.9958147 L11.2499997,20.9958147 L6.24999966,15 L4.254916,15 C3.1503465,15 2.254916,14.1045695 2.254916,13 L2.254916,11 C2.254916,9.8954305 3.1503465,9 4.254916,9 Z"></path></g> </g> </g></g></svg>
                </div>
            </div>
            <BoxButton value={"+"} position={13} onClick={props.increaseVolume} boxHeight={props.boxHeight} boxWidth={props.boxWidth} button={props.button}/>
        </div>
        {appSettings.displayVHS &&
        <div id="row6" className="row" style={{top: appSettings.buttonsTop[6], left: appSettings.buttonsLeft}}>
            <div className="boxButton" onClick={props.handlePlayPause} style={{width:props.boxWidth*appSettings.buttonWidth, height:props.boxHeight*appSettings.buttonHeight, display:"inline-block",backgroundImage: 'url("' + appSettings.backgroundButton + '")',}}>
                <div style={{ justifyContent:"center", alignItems:"center", display:"flex", }}>                    
                    <svg width={appSettings.buttonFontSize}  height={appSettings.buttonFontSize}  viewBox="0 -960 960 960" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill={appSettings.buttonTextColor} stroke={appSettings.buttonTextColor}> <path d="M200-312v-336l240 168-240 168Zm320-8v-320h80v320h-80Zm160 0v-320h80v320h-80Z"/></svg>
                </div>
            </div>
            
            <div className="boxButton" onClick={props.ejectTapeOnClick} style={{width:props.boxWidth*appSettings.buttonWidth, height:props.boxHeight*appSettings.buttonHeight, display:"inline-block",backgroundImage: 'url("' + appSettings.backgroundButton + '")',}}>
                <div style={{ justifyContent:"center", alignItems:"center", display:"flex", }}>    
                    <svg width={appSettings.soundIconSize} height={appSettings.soundIconSize} viewBox="0 -960 960 960" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={appSettings.soundIconColor} stroke={appSettings.soundIconColor}><path d="M200-200v-80h560v80H200Zm14-160 266-400 266 400H214Zm266-80Zm-118 0h236L480-616 362-440Z"/></svg>                
                    
                </div>
            </div>
            <div style={{width:props.boxWidth*appSettings.buttonWidth, height:props.boxHeight*appSettings.buttonHeight,}}/>
        </div>
    }
      </div>
 )
}
export default Remote;