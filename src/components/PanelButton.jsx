import React, { useContext } from 'react';
import { GlobalContext } from "./GlobalContext";

const PanelButton = (props) => {
  const { appSettings } = useContext(GlobalContext);
  return (
    <div
      className={"panelButton panelButton" + props.position}
      style={props.hidden ? { visibility: "hidden" } : {}}
    >
      {props.text ? <div className="panelButtonText">
        <p>{props.text}</p>
      </div> : null}
      <div className="panelButtonImage" onClick={() => props.onClick(props.value)}>
        <img src={props.image || appSettings.backgroundButtonTv}/>
      </div>
    </div>
  );
};

export default PanelButton;