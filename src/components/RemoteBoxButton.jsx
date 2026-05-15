import React, { useContext } from 'react';
import { GlobalContext } from "./GlobalContext";

const RemoteBoxButton = (props) => {
  const {  appSettings } = useContext(GlobalContext);

  return (
    <div
      className={"remoteBoxButton remoteBoxButton" + props.position}
      onClick={() => props.onClick(props.value)}
      style={{
        width: props.boxWidth,
        height: props.boxHeight,
        display: "inline-block", 
        backgroundImage: 'url("' + appSettings.backgroundButton + '")',
      }}
    >
      <div><p style={{color:appSettings.buttonTextColor, fontSize:appSettings.buttonFontSize}}>{props.value}</p></div>
    </div>
  );
};

export default RemoteBoxButton;