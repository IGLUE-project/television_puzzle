import React, { useContext } from 'react';
import { GlobalContext } from "./GlobalContext";

const BoxButton = (props) => {
  const {  appSettings } = useContext(GlobalContext);

  const renderContent = () => {
    switch (appSettings.keysType) {
      case "COLORS":
        return "";
      case "SYMBOLS":
        return <img className="symbol" src={appSettings.symbolsBackgroundKeys[props.position-1]}></img>;
      default:
        return <p style={{color:appSettings.buttonTextColor, fontSize:appSettings.buttonFontSize}}>{props.value}</p>;
    }
  };

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
      <div>{renderContent()}</div>
    </div>
  );
};

export default BoxButton;