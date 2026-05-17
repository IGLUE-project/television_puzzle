import React, { useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import Icons from './Icons.jsx';

const VideoButton = (props) => {
  const { appSettings } = useContext(GlobalContext);
  return (
    <div className={"videoButton videoButton" + props.position} onClick={props.onClick}>
      <div style={{backgroundImage: `url("${appSettings.backgroundButtonVideo}")`}}>
        {props.icon}
      </div>
    </div>
  );
};

export default VideoButton;