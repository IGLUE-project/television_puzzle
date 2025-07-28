import React, { useContext } from 'react';
import { GlobalContext } from "./GlobalContext";

const BoxButton = (props) => {
  const {  appSettings } = useContext(GlobalContext);

  return (
    <div
      className={"boxButton boxButton" + props.position}
      onClick={() => props.onClick(props.value)}
      style={{
        width: props.boxWidth * appSettings.buttonWidth,
        height: props.boxHeight * appSettings.buttonHeight,
        display: "inline-block", 
        backgroundImage: 'url("' + appSettings.backgroundButton + '")',
      }}
    >
      <div><p style={{color:appSettings.buttonTextColor, fontSize:appSettings.buttonFontSize}}>{props.value}</p></div>
    </div>
  );
};

export default BoxButton;