const RemoteButton = (props) => {
  return (
    <div
      className={props.buttonClass + " " + props.buttonClass + props.position}
      onClick={() => props.onClick(props.value)}
      style={{
        width: props.boxWidth,
        height: props.boxHeight,
        display: "inline-block", 
        backgroundImage: 'url("' + props.buttonBackground + '")',
      }}
    >
      <div><p style={{color:props.buttonColor, fontSize:props.buttonFontSize}}>{props.value}</p></div>
    </div>
  );
};

export default RemoteButton;