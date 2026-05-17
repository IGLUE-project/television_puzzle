import React, { useContext } from 'react';
import { GlobalContext } from "./GlobalContext";

const TvButton = (props) => {
  const { appSettings } = useContext(GlobalContext);
  return (
    <div
      className={"tvButton tvButton" + props.position}
      style={props.hidden ? { visibility: "hidden" } : {}}
    >
      {props.text ? <div className="tvButtonText">
        <p>{props.text}</p>
      </div> : null}
      <div className="tvButtonImage" onClick={() => props.onClick(props.value)}>
        <img src={props.image || appSettings.backgroundButtonTv}/>
      </div>
    </div>
  );
};

export default TvButton;