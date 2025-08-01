import React, { useState, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/main.scss';
import BoxButton from './BoxButton.jsx';
import Remote from './Remote.jsx';
import "video.js/dist/video-js.css";
import "videojs-youtube";
import { VideoJS } from './VideoJS.jsx'; // Importa el componente VideoJS
import FuzzyOverlayExample from './FuzzyOverlay.jsx'; // Importa el componente FuzzyOverlayExample

const MainScreen = (props) => {
  const { escapp, appSettings, Utils, I18n, Storage } = useContext(GlobalContext);
  const [processingSolution, setProcessingSolution] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerMarginTop, setContainerMarginTop] = useState(0);
  const [containerMarginLeft, setContainerMarginLeft] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);

  const [password, setPassword] = useState(""); // Estado para la contraseña  
  const [blackScreen, setBlackScreen] = useState(false); // Estado
  const [blackScreenChannels, setBlackScreenChannels] = useState(false); // Estado para los canales de pantalla negra

  const [vhsState, setVhsState] = useState(Storage.getSetting("vhsState") || "out"); // Estado para el VHS
  const [inputMode, setInputMode] = useState("tv"); // Estado para el modo de entrada
  const [vhsPaused, setVhsPaused] = useState(true); // Estado para saber si el VHS está pausado


  const playerRef = useRef(null); // Referencia al reproductor de Video.js 
  const playerVhsRef = useRef(null); // Referencia al reproductor de Video.js 
  const [volume, setVolume] = useState(0.5); // Estado para el volumen (1 = 100%)
  const [showVolume, setShowVolume] = useState(false); // Estado para mostrar/ocultar el volumen
  const volumeTimeoutRef = useRef(null); // Referencia para almacenar el temporizador del volumen

  const [timer, setTimer] = useState(null); 
  const [showCursor, setShowCursor] = useState(false); // Controla si se muestra el guion bajo
  const [isPoweredOn, setIsPoweredOn] = useState(false); // Estado para controlar si el TV está encendido

  const [videoError, setVideoError] = useState(false); // Estado para manejar errores de video

  const correctAnswerRef = useRef('');

  const savedChannel = Storage.getSetting("channel") || appSettings.defaultVideo; // Recupera el canal guardado del almacenamiento


  const videoOptions = { 
    autoplay: false, // Cambiado a false para que no se reproduzca automáticamente
    controls: false,
    responsive: true,
    fluid: true,
    loop: true,
    muted: false,
    techOrder: ["html5", "youtube"],
    sources: [
      { src: savedChannel.src,
        type: savedChannel.type}
    ],
    userActions: { click: false },
    // Configuración específica para YouTube
    youtube: {
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      controls: 0,
      autoplay: 1
    }
  };

  const vhsOptions = { 
    autoplay: false, 
    controls: false,
    responsive: true,
    fluid: true,
    loop: true,
    muted: false,
    techOrder: ["html5", "youtube"],
    sources: [
      { src: appSettings.displayVHS ? appSettings.inputChannel.src : savedChannel.src,
        type: appSettings.displayVHS ? appSettings.inputChannel.type : savedChannel.type} 
    ],
    userActions: { click: false }, 
    // Configuración específica para YouTube
    youtube: {
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      controls: 0,
      autoplay: 0
    }
  };
  const [playerOptions, setPlayerOptions] = useState(videoOptions); // Estado para las opciones del reproductor
  const [playerVhsOptions, setPlayerVhsOptions] = useState(vhsOptions);



  useEffect(() => {
    handleResize();
  }, [props.appWidth, props.appHeight]);

  function handleResize(){
    if((props.appHeight === 0)||(props.appWidth === 0)){
      return;
    }

    let aspectRatio = 4 / 3;
    let _keypadWidth = Math.min(props.appHeight * aspectRatio, props.appWidth);
    let _keypadHeight = _keypadWidth / aspectRatio;

    let _lockWidth = Math.min(props.appHeight * aspectRatio, props.appWidth) ;
    let _lockHeight = _lockWidth / aspectRatio;

    let _containerWidth = _lockWidth *0.8;
    let _containerHeight = _lockHeight *0.8;

    let _containerMarginLeft=0;
    let _containerMarginTop=_lockHeight * -0.21;

    let _boxWidth = _lockWidth * 0.7;
    let _boxHeight = _lockHeight * 0.7;


    switch(appSettings.skin){
      case "RETRO":
        _containerMarginTop = _lockHeight *-0.12;
        _containerWidth = _lockWidth *0.9;
        _containerHeight = _lockHeight *0.9;
        break;
      case "FUTURISTIC":
        _containerMarginTop = _lockHeight * -0.2;
        _containerHeight = _lockHeight *1;
        _boxHeight = _lockHeight * 0.9;
        _boxWidth = _lockWidth * 0.9;

        break;
      default:
    }

    setContainerWidth(_containerWidth);
    setContainerHeight(_containerHeight);
    setContainerMarginTop(_containerMarginTop);
    setContainerMarginLeft(_containerMarginLeft);

    setBoxWidth(_boxWidth);
    setBoxHeight(_boxHeight);
  }


  const onClickButton = (value) => {
    if(processingSolution || !isPoweredOn || inputMode!=="tv" || password==="tv" || correctAnswerRef.current!=='') return; 
    setPassword(prev => prev + value); 
    const shortBeep = document.getElementById("audio_beep");
    shortBeep.pause();
    shortBeep.currentTime = 0;
    shortBeep.play();
    setShowCursor(true);
    if (timer) {clearTimeout(timer);  }
    const newTimer = setTimeout(() => {    
      handleTimerExpire(); 
    }, 5000);
    setTimer(newTimer);
  
  }

  //Pone la imagen del fondo
  let backgroundImage = 'url("' + appSettings.background + '")';
  if(appSettings.background && appSettings.background !== "NONE"){
    backgroundImage += ', url("' + appSettings.background + '")';
  }

  const handleTimerExpire = () => {
    setProcessingSolution(true); 
    setShowCursor(false); 
    setTimeout(() => {
      setPassword(""); 
      setProcessingSolution(false);    
    }, 3000); // Espera 3 segundos antes de ocultar el <p>
    
  };

  const checkChannels = (channelInput) => {
    const channel = appSettings.channels.find((channel) => channel.id === channelInput);
    setBlackScreenChannels(true); 
      setTimeout(() => {setBlackScreenChannels(false); }, 900); 
    if (channel) {rightChannel(channel); 
    } else {wrongChannel(); }
  }

  useEffect(() => {
    if (!processingSolution) return;
    if (password.length >= 1){
      checkChannels(password); 
    }else{
      wrongChannel();
    }
    
  }, [processingSolution]); 

  const wrongChannel = () => {
    correctAnswerRef.current='';
    setPlayerOptions(appSettings.defaultVideo);
    setVideoError(false);
    if(playerRef.current === null ){ 
        Utils.log("Error: El reproductor no está inicializado");
        setVideoError(true);
        Storage.removeSetting("channel");
        return;
      } 
    try{
      playerRef.current.pause(); 
      playerRef.current.src(appSettings.defaultVideo); 
      playerRef.current.load(); 
      handleVolume(); 
      playerRef.current.oncanplay = () => {
        playerRef.current.play();
      };       
    }catch(e){
      console.error("Error al cambiar la fuente del reproductor:", e);
    }
  }

  const rightChannel = (channel) => {
    setPlayerOptions(channel); 
    let source= {src: channel.src, type: channel.type}; 
    setVideoError(false);
    if(playerRef.current === null){ 
      Utils.log("Error: El reproductor no está inicializado");
      Storage.removeSetting("channel");
      setVideoError(true);
      return;
    } 
    try{        
      playerRef.current.pause(); 
      playerRef.current.src(source); 
      playerRef.current.load(); 
      handleVolume();
      Utils.log("Video Saved in Storage", channel);
      Storage.saveSetting("channel", channel);      
      handleApiAnswer(channel);        

    }catch(e){
      Utils.error("Error al cambiar la fuente del reproductor:", e);
      Storage.removeSetting("channel");
    }
    
  }

  const handleApiAnswer = (channel) => {        
    if(appSettings.solutionLength === channel.id.length){
      escapp.checkNextPuzzle(parseInt(channel.id), {}, (success, erState) => {
        Utils.log("Check solution Escapp response", success, erState);
          try {            
              successChannel(channel,success);                        
          } catch(e){
            Utils.log("Error in checkNextPuzzle",e);
          }              
      });  
    }  

  };


  const successChannel = (channel,success) => {
      if (success) {      
        if(appSettings.checkSolution === "AFTER_ENTER_CHANNEL"){
          props.onKeypadSolved(channel);
        }else if(appSettings.checkSolution === "AFTER_WATCH_VIDEO"){
          correctAnswerRef.current = channel;
          if(channel.id==="-1"){
            playerVhsRef.current.loop(false);
          }else{
            playerRef.current.loop(false);
          }
        }      
      } else {correctAnswerRef.current=''; } 
    
  }

  const increaseVolume = () => {
    if (playerRef.current && isPoweredOn) {
      volumeAppear(); 
      if (playerRef.current.muted){
        playerRef.current.muted(false); 
        const newVolume = Math.min(volume + 0.1, 1); 
        setVolume(parseFloat(newVolume.toFixed(1))); 
      }else if (volume < 1) {
        const newVolume = Math.min(volume + 0.1, 1); 
        setVolume(parseFloat(newVolume.toFixed(1))); 
      }
      if (appSettings.displayVHS) {
        if (playerVhsRef.current.muted) {
          playerVhsRef.current.muted(false); 
          playerVhsRef.current.volume(volume); 
        } else if (volume < 1) {
          playerVhsRef.current.volume(volume); 
        }
      }
    }
  };

  // Función para bajar el volumen
  const decreaseVolume = () => {
    if (playerRef.current && isPoweredOn) {
      volumeAppear(); 
      if (volume > 0) {
        volume <= 0.1 && playerRef.current.muted(true); 
        if(volume <= 0.1 && appSettings.displayVHS)
          playerVhsRef.current.muted(true); 
        const newVolume = Math.min(volume - 0.1, 1); 
        setVolume(parseFloat(newVolume.toFixed(1))); 
      }
    }
  };

  
  const handleVolume = () =>{
    if(playerRef.current === null || playerVhsRef.current === null)return;
    setTimeout(() => {
      if (volume <= 0) {
        playerRef.current.muted(true); 
        appSettings.displayVHS && playerVhsRef.current.muted(true); 
      } else {
        playerRef.current.muted(false); 
        appSettings.displayVHS && playerVhsRef.current.muted(false); 
        playerRef.current.volume(volume); 
        appSettings.displayVHS && playerVhsRef.current.volume(volume); 
      }
      if(inputMode==="tv") playerRef.current.play(); 
      else if(inputMode==="vhs") playerVhsRef.current.play(); 
    }, 100);

  }

  const volumeAppear = () => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }  
    setShowVolume(true);
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolume(false); 
      volumeTimeoutRef.current = null; 
    }, 4000);
  }

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume(volume); 
    }
    if (appSettings.displayVHS && playerVhsRef.current) {
      playerVhsRef.current.volume(volume); 
    }
  }, [volume]); 

  useEffect(() => {
    return () => {
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
    };
  }, []);

 



  const powerButtonOnClick = () => {
    setVideoError(false);
    if(playerRef.current === null){
      reinitializePlayer("tv");
    }
    if(playerVhsRef.current === null){ 
      reinitializePlayer("vhs");
    } 
    const shortBeep = document.getElementById("audio_beep");
    shortBeep.currentTime = 0;
    shortBeep.play();
    let audio = null;

    setTimeout(() => {
      setIsPoweredOn(prev => {
        const newPowerState = !prev;
        if (newPowerState) {
          // TV encendido - reproducir video
          audio = document.getElementById("audio_tv_on");
          audio.currentTime = 0; 
          audio.play(); 
          if (playerRef.current && inputMode === "tv") {
            playerRef.current.play();
            playerRef.current.volume(volume);            
          }
          if( appSettings.displayVHS && playerVhsRef.current && inputMode === "vhs" && vhsState === "in") {
            vhsPaused ? playerVhsRef.current.pause() : playerVhsRef.current.play(); 
            playerVhsRef.current.volume(volume); 
          }
          setBlackScreen(false); 
        } else {
          audio = document.getElementById("audio_tv_off");
          audio.currentTime = 0; 
          audio.play(); 
          setShowVolume(false); 
          setShowCursor(false); 
          if (playerRef.current) {
            playerRef.current.pause();
          }
          if( appSettings.displayVHS && playerVhsRef.current) {
            playerVhsRef.current.pause(); 
            setVhsPaused(true); 
          }
          setBlackScreen(true); 
          if (timer) {
            clearTimeout(timer); 
            setTimer(null);
          }
          setPassword(""); 
          setTimeout(() => {
            setBlackScreen(false); 
          }, 800);
        }
        return newPowerState;
      });
    }, 700); 
  }

  const handleVhsClick = () => {
    const vhsSound = document.getElementById("audio_vhs_tape");
    if (vhsState === "out") {      
      vhsSound.currentTime = 0;
      vhsSound.play(); 
      setVhsPaused(true);
      setVhsState("in"); 
      Storage.saveSetting("vhsState", "in");
    }
  }

  const ejectTapeOnClick = () => {
    if (vhsState === "in") {
      const vhsSound = document.getElementById("audio_vhs_tape");
      vhsSound.currentTime = 0;
      vhsSound.play(); 
      setVhsState("out"); 
      Storage.saveSetting("vhsState", "out");
      (appSettings.displayVHS && playerVhsRef.current) && playerVhsRef.current.pause(); 
    }
  }

  const inputOnClick = () => {
    if(!isPoweredOn || processingSolution || !appSettings.displayVHS || correctAnswerRef.current!=='') return; 
    const shortBeep = document.getElementById("audio_beep");
    shortBeep.currentTime = 0;
    shortBeep.play();
    if (timer) {
        clearTimeout(timer); 
        setTimer(null);
    }
    setBlackScreenChannels(true); 
    setTimeout(() => {
      setBlackScreenChannels(false); 
    }, 900); 
    if( inputMode === "tv") {
      if(playerVhsRef.current === null){ 
        Utils.log("Error: El reproductor VHS no está inicializado");
        return;
      } 
      setInputMode("vhs"); 
      setPassword(appSettings.inputChannel.name); 
      setTimeout(() => {       
          setPassword("");       
      }, 1500);
      if(vhsPaused || vhsState!=="in") {
        playerVhsRef.current.pause();
      } else {
        playerVhsRef.current.play();
      }
      playerRef.current.pause(); 
    }else if(inputMode === "vhs") {
      if(playerRef.current === null){ 
        Utils.log("Error: El reproductor no está inicializado");
        reinitializePlayer();
        return;
      } 
      setInputMode("tv"); 
      setPassword("tv"); 
      playerVhsRef.current.pause(); 
      playerRef.current.play();
      setTimeout(() => {
          setPassword("");  
      }, 1500); 
    }
  }

  const reinitializePlayer = (error) => { 
    Storage.removeSetting("channel");
    Utils.log("Reinicializando reproductor ",error," ...");    
    const DefaultOptions = { 
      autoplay: false, 
      controls: false,
      responsive: true,
      fluid: true,
      loop: true,
      muted: false,
      techOrder: ["html5", "youtube"],
      sources: [
        { 
          src: appSettings.defaultVideo.src, // Usar video por defecto en lugar del inputChannel
          type: appSettings.defaultVideo.type 
        }
      ],
      userActions: { click: false }, 
      youtube: {
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        controls: 0,
        autoplay: error === "vhs" ? 0 : 1
        }
    };    
    if(error=== "tv") {
      setPlayerOptions(DefaultOptions);
      setTimeout(() => {
        if(playerRef.current) {        
          setVideoError(false);
          playerRef.current.play();
          playerRef.current.volume(volume);
        } else {
          setVideoError(true);
          Utils.log("Error: No se pudo reinicializar el reproductor TV");
        }
      }, 1000);
    }else if(error=== "vhs") {
      setPlayerVhsOptions(DefaultOptions);
      setTimeout(() => {
        if(playerVhsRef.current) {
          setVideoError(false);
          playerVhsRef.current.play();
          playerVhsRef.current.volume(volume);
        } else {
          setVideoError(true);
          Utils.log("Error: No se pudo reinicializar el reproductor VHS");
        }
      }, 1000);
    }
  }

  const handlePlayPause = () => {
    const shortBeep = document.getElementById("audio_beep");
    shortBeep.currentTime = 0;
    shortBeep.play();
    if(!isPoweredOn || processingSolution || !appSettings.displayVHS || inputMode==="tv" || vhsState!=="in") return; // No permite interacción si el TV está apagado
    setVideoError(false);
    if(playerVhsRef.current === null){ 
      Utils.log("Error: El reproductor VHS no está inicializado");
      setVideoError(true);
      return;
    } 
    if(!vhsPaused){
      playerVhsRef.current.pause(); 
      setVhsPaused(true); 
      setPassword("Pause ❚❚");
      setTimeout(() => {
        setPassword(""); 
      }, 1000); 
    }else{
      playerVhsRef.current.play(); 
      correctAnswerRef.current === '' && handleApiAnswer(appSettings.inputChannel);
      setPassword("Play ▶");
      setTimeout(() => {
        setPassword(""); 
      }, 1000); 
      setVhsPaused(false); 
    }
  }

  const handleVideoForward = () => {
    if(!isPoweredOn || processingSolution || !appSettings.displayVHS || inputMode==="tv" || vhsState!=="in" || correctAnswerRef.current!=='') return; // No permite interacción si el TV está apagado
    const shortBeep = document.getElementById("audio_beep");
    shortBeep.currentTime = 0;
    shortBeep.play();
    if(playerVhsRef.current === null){ 
      Utils.log("Error: El reproductor VHS no está inicializado");
      return;
    }
    
    const currentTime = playerVhsRef.current.currentTime();
    const duration = playerVhsRef.current.duration();
    const forwardTime = Math.min(currentTime + 5, duration); // Avanzar 5 segundos    
    playerVhsRef.current.currentTime(forwardTime);
    setPassword("▶▶");
    setTimeout(() => {
      setPassword(""); 
    }, 600); 

  }

  const handleVideoRewind = () => {
    if(!isPoweredOn || processingSolution || !appSettings.displayVHS || inputMode==="tv" || vhsState!=="in" ) return; // No permite interacción si el TV está apagado
    const shortBeep = document.getElementById("audio_beep");
    shortBeep.currentTime = 0;
    shortBeep.play();
    if(playerVhsRef.current === null){ 
      Utils.log("Error: El reproductor VHS no está inicializado");
      return;
    }
    const currentTime = playerVhsRef.current.currentTime();
    const rewindTime = Math.max(currentTime - 5, 0); // Retroceder 5 segundos
    playerVhsRef.current.currentTime(rewindTime);
    setPassword("◀◀");
    setTimeout(() => {
      setPassword(""); 
    }, 600); 
     
  }
  
  const handleVideoEnded = () => {
    if(correctAnswerRef.current==='')return;
    props.onKeypadSolved(correctAnswerRef.current.id);
  }

  {/** TV Retro */}
  const TV_Buttons = (<>
    <div style={{position:"relative", width: containerWidth, height: containerHeight }}>
      {vhsState === "out" && <div className='vhsTapeOut' style={{ top:appSettings.vhsTop, left:appSettings.vhsLeft, width:containerWidth*appSettings.vhsWidth, height:containerHeight*appSettings.vhsHeight, backgroundImage: 'url("' + appSettings.vhsOut + '")',}} onClick={handleVhsClick}/>   }
      {vhsState === "in" && <div className='vhsTapeIn' style={{top:appSettings.vhsTop, left:appSettings.vhsLeft, width:containerWidth*appSettings.vhsWidth, height:containerHeight*appSettings.vhsHeight, backgroundImage: 'url("' + appSettings.vhsIn + '")'}}  />   }

      <div className='boxButton' style={{zIndex: 5,position: "absolute", top:appSettings.playPauseButtonTop, left:appSettings.playPauseButtonLeft, width:boxWidth*appSettings.vhsButtonWidth, height:boxHeight*appSettings.vhsButtonHeight, backgroundImage: 'url("' + appSettings.VHSButton + '")', cursor:"pointer"}} onClick={handlePlayPause}>
        <div style={{ justifyContent:"center", alignItems:"center", display:"flex",}}>
          <svg style={{marginTop:appSettings.volumeIconTop}} width={appSettings.soundIconSize} height={appSettings.soundIconSize} viewBox="0 -960 960 960" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={appSettings.soundIconColor} stroke={appSettings.soundIconColor}><path d="M200-312v-336l240 168-240 168Zm320-8v-320h80v320h-80Zm160 0v-320h80v320h-80Z"/></svg>
        </div>
      </div>
      <div className='boxButton' style={{zIndex: 5,position: "absolute", top:appSettings.ejectButtonTop, left:appSettings.ejectButtonLeft, width:boxWidth*appSettings.vhsButtonWidth, height:boxHeight*appSettings.vhsButtonHeight, backgroundImage: 'url("' + appSettings.VHSButton + '")', cursor:"pointer"}} onClick={ejectTapeOnClick}>
        <div style={{ justifyContent:"center", alignItems:"center", display:"flex",}}>
          <svg style={{marginTop:appSettings.volumeIconTop}} width={appSettings.soundIconSize} height={appSettings.soundIconSize} viewBox="0 -960 960 960" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={appSettings.soundIconColor} stroke={appSettings.soundIconColor}><path d="M200-200v-80h560v80H200Zm14-160 266-400 266 400H214Zm266-80Zm-118 0h236L480-616 362-440Z"/></svg>
        </div>      
      </div>
      <div className='boxButton' style={{zIndex: 5,position: "absolute", top:appSettings.powerButtonTop, left:appSettings.powerButtonLeft, width:boxWidth*appSettings.powerButtonWidth, height:boxHeight*appSettings.powerButtonHeight, backgroundImage: 'url("' + appSettings.backgroundPowerButton + '")', cursor:"pointer"}} onClick={powerButtonOnClick}/>
    </div>
    <div style={{ position: "absolute", zIndex: 4, height:containerHeight,  width: containerWidth, }}>    
      <div style={{position: "absolute", left: appSettings.buttonsLeft,  height: "100%", display: "flex",flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <div id="row1" className="row" style={{ top: appSettings.buttonsTop[0]}}>
          <BoxButton value={"1"} position={1} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={"2"} position={2} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={"3"} position={3} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
        </div>
        <div id="row2" className="row" style={{ top: appSettings.buttonsTop[1]}} >
          <BoxButton value={"4"} position={4} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={"5"} position={5} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={"6"} position={6} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
        </div>
        <div id="row3" className="row" style={{ top: appSettings.buttonsTop[2]}}>
          <BoxButton value={"7"} position={7} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={"8"} position={8} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={"9"} position={9} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
        </div>
        <div id="row4" className="row" style={{top: appSettings.buttonsTop[3]}}>
          <div style={{width:boxWidth*appSettings.buttonWidth, height:boxHeight*appSettings.buttonHeight,}}/>
          <BoxButton value={"0"} position={10} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          {appSettings.displayVHS ?
            <div className="boxButton" style={{width:boxWidth*appSettings.buttonWidth, height:boxHeight*appSettings.buttonHeight, display:"inline-block",backgroundImage: 'url("' + appSettings.backgroundButton + '")',}} onClick={inputOnClick}>
                  <div style={{ justifyContent:"center", alignItems:"center", display:"flex", }}>               
                      <svg width={appSettings.buttonFontSize}  height={appSettings.buttonFontSize}  viewBox="0 -960 960 960" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill={appSettings.buttonTextColor} stroke={appSettings.buttonTextColor}><path d="M160-160q-33 0-56.5-23.5T80-240v-120h80v120h640v-480H160v120H80v-120q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm300-140-56-58 83-82H80v-80h407l-83-82 56-58 180 180-180 180Z"/></svg>
                  </div>
            </div>
            :<div style={{width:boxWidth*appSettings.buttonWidth, height:boxHeight*appSettings.buttonHeight,}}/>}
        </div>
        <div id="row4" className="row" style={{top: appSettings.buttonsTop[4]}}>
          <BoxButton value={"-"} position={11} onClick={decreaseVolume} boxHeight={boxHeight} boxWidth={boxWidth}/>
            <div style={{width:boxWidth*appSettings.buttonWidth, height:boxHeight*appSettings.buttonHeight, display:"inline-block",}}>
                <div style={{ justifyContent:"center", alignItems:"center", display:"flex",}}>
                    <svg style={{marginTop:appSettings.volumeIconTop}} width={appSettings.soundIconSize} height={appSettings.soundIconSize} viewBox="0 -1 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={appSettings.soundIconColor} stroke={appSettings.soundIconColor}> <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g> <g id="SVGRepo_iconCarrier"> <title>multimedia / 4 - multimedia, audio, music, sound, max, speaker, volume icon</title> <g id="Free-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" > <g transform="translate(-968.000000, -304.000000)" id="Group" stroke={appSettings.soundIconColor} strokeWidth="2"> <g transform="translate(967.000000, 302.000000)" id="Shape"> <path d="M18.22291,4.24772391 C20.3461043,5.89188107 21.7500001,8.74918751 21.7500001,12 C21.7500001,15.2055503 20.384926,18.0284761 18.3111758,19.6828962"></path> <path d="M16.25,16.5 C17.434,15.6838509 18.25,13.984472 18.25,12.0055901 C18.25,10.0267081 17.434,8.32732919 16.25,7.5"></path> <path d="M4.254916,9 L6.24999966,9 L11.2499997,3 L13.2499997,3 L13.2499997,20.9958147 L11.2499997,20.9958147 L6.24999966,15 L4.254916,15 C3.1503465,15 2.254916,14.1045695 2.254916,13 L2.254916,11 C2.254916,9.8954305 3.1503465,9 4.254916,9 Z"></path></g> </g> </g></g></svg>
                </div>
            </div>
          <BoxButton value={"+"} position={12} onClick={increaseVolume} boxHeight={boxHeight} boxWidth={boxWidth} />
        </div>
      </div>
    </div>
  </>);

  return (
    <div id="screen_main" className={"screen_content"} style={{ backgroundImage: backgroundImage }}>
      <div id="lockContainer" className="lockContainer" 
        style={{backgroundImage: 'url('+appSettings.backgroundTV+')', width: containerWidth, 
          height: containerHeight,  marginLeft: containerMarginLeft , marginTop: containerMarginTop,
          display: "flex", alignItems: "center", zIndex:2, pointerEvents:"none",
          justifyContent: "center", flexDirection: "column"
        }}>
      <div className='empty_black' style={{top:appSettings.blackScreenTop, left:appSettings.blackScreenLeft, width:appSettings.blackScreenWidth, height:appSettings.blackScreenHeight}}></div>
      
      {/* Video  */}      
      <div className='video_container' style={{position: "absolute", width: boxWidth*appSettings.videoPlayerWidth, left: appSettings.videoPlayerLeft, top: appSettings.videoPlayerTop, zIndex: inputMode==="tv" ? 1 : -1}}>
        <VideoJS  options={playerOptions} powerOn={isPoweredOn} onReady={(player) => {playerRef.current = player;
            player.on('ended', () => {handleVideoEnded();});            
            player.on('error', () => { Storage.removeSetting("channel");Utils.log("Error en video TV", player.error()); setVideoError(true);});
            player.on('techError',() => {Utils.log("Error en video TV", player.error());});}}
        />  
      </div>
      {appSettings.displayVHS && <div className='video_container' style={{position: "absolute", width: boxWidth*appSettings.videoPlayerWidth, left: appSettings.videoPlayerLeft, top: appSettings.videoPlayerTop, zIndex: inputMode==="vhs" ? 1 : -1}}>
        <VideoJS  options={playerVhsOptions} powerOn={isPoweredOn} onReady={(player) => {playerVhsRef.current = player;
          player.on('ended', () => {handleVideoEnded();});        
          player.on('error', () => { Storage.removeSetting("channel"); Utils.log("Error en video TV", player.error()); setVideoError(true);});
          player.on('techError',() => {Utils.log("Error en video TV", player.error());});}}
        />  
      </div>}

      {blackScreenChannels && <div className='empty_black' style={{zIndex: 2,top:appSettings.blackScreenTop, left:appSettings.blackScreenLeft, width:appSettings.blackScreenWidth, height:appSettings.blackScreenHeight}}></div>}
      {(vhsPaused && appSettings.displayVHS && inputMode==="vhs") && 
        <div className='paused_screen' style={{zIndex: 2,top:appSettings.blackScreenTop, left:appSettings.blackScreenLeft, width:appSettings.blackScreenWidth, height:appSettings.blackScreenHeight}}>
          <svg xmlns="http://www.w3.org/2000/svg" height={appSettings.pausedIconSize} viewBox="0 -960 960 960" width={appSettings.pausedIconSize} fill={appSettings.pausedIconColor}><path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>          
        </div>
      }
      {(appSettings.displayVHS && inputMode==="vhs" && vhsState!=="in") && 
        <div className='novhs_screen' style={{zIndex: 2,top:appSettings.blackScreenTop, left:appSettings.blackScreenLeft, width:appSettings.blackScreenWidth, height:appSettings.blackScreenHeight}}>
          <p className='noTapeText' style={{fontSize:containerWidth*appSettings.noTapeFontSize}}>{I18n.getTrans("i.noVideoTape")}</p>
        </div>
      }
      {videoError &&
        <div className='novhs_screen' style={{zIndex: 2,top:appSettings.blackScreenTop, left:appSettings.blackScreenLeft, width:appSettings.blackScreenWidth, height:appSettings.blackScreenHeight}}>
          <p className='noTapeText' style={{fontSize:containerWidth*appSettings.noTapeFontSize}}>{I18n.getTrans("i.error")}</p>
        </div>
      }
      <div className={`screen-content ${!isPoweredOn ? 'tv-off' : ''} ${blackScreen ? 'shutdown' : ''}`}    style={{zIndex: (!isPoweredOn || blackScreen) ? 2 : -1,top:appSettings.blackScreenTop, left:appSettings.blackScreenLeft, width:appSettings.blackScreenWidth, height:appSettings.blackScreenHeight}}/>     
      
      {appSettings.fuzzyScreen && isPoweredOn && <div style={{overflow:"hidden", position:"absolute", width:appSettings.fuzzyScreenWidth, height:appSettings.fuzzyScreenHeight, left:appSettings.fuzzyScreenLeft, top:appSettings.fuzzyScreenTop, zIndex:2}}><FuzzyOverlayExample/></div>}
      <div id="lockContainer" className="lockContainer" 
        style={{backgroundImage: 'url('+appSettings.backgroundTV+')', width: containerWidth, 
          height: containerHeight,  marginLeft: containerMarginLeft , pointerEvents:"none",
          zIndex:2}}/>

      {/** CANAL */}
      {password && isPoweredOn && (<p className={`channel ${showCursor ? "show-cursor" : ""}`} style={{top:appSettings.channelNumberTop, left:appSettings.channelNumberLeft, fontSize: appSettings.channelFontSize}}>{password}</p>)}      
      {showVolume && isPoweredOn && (
            <div className='volume_div' style={{left:appSettings.volumeLeft, top:appSettings.volumeTop, zIndex:10, width: containerWidth*appSettings.volumeContainerWidth}}>
              <p className='volume' style={{fontSize:containerWidth*appSettings.volumeFontSize, color:appSettings.volumeColor}}>vol</p>
              <div className='volumeBar' style={{width: "100%", height: appSettings.volumeHeight, marginLeft: containerWidth*appSettings.volumeBarLeft, }}>
                <div className='volumeBarFilled' style={{width: `${volume * 100}%`, backgroundColor:appSettings.volumeBarColor}}></div>
              </div>
            </div>
      )}                    
      
      <audio id="audio_beep" src={appSettings.soundBeep} autostart="false" preload="auto" />
      <audio id="audio_vhs_tape" src={appSettings.soundVHS} autostart="false" preload="auto" />
      <audio id="audio_tv_on" src={appSettings.soundTvOn} autostart="false" preload="auto" />
      <audio id="audio_tv_off" src={appSettings.soundTvOff} autostart="false" preload="auto" />
      </div>
      {appSettings.showRemote ?
        <div style={{overflow: "visible", width: containerWidth, height:containerHeight, position:"absolute", zIndex: 10,}}>
          {appSettings.displayVHS && <>
            {vhsState === "out" && <div className='vhsTapeOut' style={{ top:appSettings.vhsTop, left:appSettings.vhsLeft, width:containerWidth*appSettings.vhsWidth, height:containerHeight*appSettings.vhsHeight, backgroundImage: 'url("' + appSettings.vhsOut + '")', }} onClick={handleVhsClick}/>   }
            {vhsState === "in" && <div className='vhsTapeIn' style={{ top:appSettings.vhsTop, left:appSettings.vhsLeft, width:containerWidth*appSettings.vhsWidth, height:containerHeight*appSettings.vhsHeight, backgroundImage: 'url("' + appSettings.vhsIn + '")', }}  />   }</>} 
          <div className="boxButton" style={{zIndex:20,width:containerWidth*appSettings.buttonTvWidth, height:containerHeight*appSettings.buttonTvHeight, marginLeft:appSettings.buttonTvMarginLeft, marginTop:appSettings.buttonTvMarginTop, backgroundImage: 'url("' + appSettings.backgroundButtonTv + '")',}} onClick={ejectTapeOnClick}>
            <div style={{ justifyContent:"center", alignItems:"center", display:"flex", }}>               
                <svg style={{marginTop:appSettings.buttonTvIconMarginTop}} width={appSettings.buttonTvIconSize} height={appSettings.buttonTvIconSize} viewBox="0 -960 960 960" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={appSettings.soundIconColor} stroke={appSettings.soundIconColor}><path d="M200-200v-80h560v80H200Zm14-160 266-400 266 400H214Zm266-80Zm-118 0h236L480-616 362-440Z"/></svg>
            </div>
          </div>
          <Remote boxWidth={containerWidth} boxHeight={containerHeight} onClickButton={onClickButton} decreaseVolume={decreaseVolume} increaseVolume={increaseVolume} powerButtonOnClick={powerButtonOnClick} handlePlayPause={handlePlayPause} ejectTapeOnClick={ejectTapeOnClick} inputOnClick={inputOnClick} rewind={handleVideoRewind} forward={handleVideoForward}/>
        </div> :
          TV_Buttons
      }


 
    </div>);
};

export default MainScreen;