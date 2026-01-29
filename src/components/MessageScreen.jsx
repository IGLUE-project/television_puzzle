import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/message.scss';

const MessageScreen = (props) => {
  const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerMarginRight, setContainerMarginRight] = useState(0);
  const [containerMarginTop, setContainerMarginTop] = useState(0);

  useEffect(() => {
    handleResize();
  }, [props.appWidth, props.appHeight]);


  useEffect(() => {
    handleResize(props.size);
  }, [props.size]);


  function handleResize(size) {
    if (!size || ((size.height === 0) || (size.width === 0))) {
      return;
    }

    let _containerWidth = size.width * 0.8;
    let _containerHeight = size.height * 0.8;

    let _containerMarginLeft = 0;
    let _containerMarginTop = size.height * -0.21;

    let _boxWidth = size.width * 0.7;
    let _boxHeight = size.height * 0.7;


    switch (appSettings.skin) {
      case "RETRO":
        _containerMarginTop = size.height * -0.12;
        _containerWidth = size.width * 0.9;
        _containerHeight = size.height * 0.9;
        break;
      case "FUTURISTIC":
        _containerMarginTop = size.height * -0.2;
        _containerHeight = size.height * 1;
        _containerWidth = size.width * 1;
        _boxHeight = size.height * 0.9;
        _boxWidth = size.width * 0.9;

        break;
      default:
    }

    setContainerWidth(_containerWidth);
    setContainerHeight(_containerHeight);
    setContainerMarginTop(_containerMarginTop);
  }


  let backgroundImage = 'url("' + appSettings.backgroundMessage + '")';
  if (appSettings.background && appSettings.background !== "NONE") {
    backgroundImage += ', url("' + appSettings.background + '")';
  }

  return (
    <div id="screen_message" className="screen_content" style={{ backgroundImage: 'url(' + appSettings.background + ')' }}>
      <div id="lockContainer" className="lockContainer"
        style={{
          '--background-tv': 'url(' + appSettings.backgroundMessage + ')', width: props.size.width,
          height: props.size.height, display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
        <div id="message_text" style={{ width: "85%", height: "80%", zIndex: 10 }}>
          <span>{appSettings.message}</span>
        </div>
        <div className="message_button" style={{ zIndex: 10 }} onClick={() => props.submitPuzzleSolution()}>{I18n.getTrans("i.continue")}</div>

      </div>

    </div>
  );
};

export default MessageScreen;