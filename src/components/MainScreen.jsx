import React, { useState, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/main.scss';
import SafeBoxDial from './SafeBoxDial.jsx';
import BoxButton from './BoxButton.jsx';
import Remote from './Remote.jsx';
import "video.js/dist/video-js.css";
import "videojs-youtube";
import { VideoJS } from './VideoJS.jsx'; // Importa el componente VideoJS
import FuzzyOverlayExample from './FuzzyOverlay.jsx'; // Importa el componente FuzzyOverlayExample
import { use } from 'react';

const MainScreen = (props) => {
  const { escapp, appSettings, Utils, I18n, Storage, setStorage } = useContext(GlobalContext);
  const [tries, setTries] = useState(0); // Contador de intentos
  const [solutionArray, setSolutionArray] = useState([]); // Array para guardar la solución
  const [currentSolution, setCurrentSolution] = useState([]);
  const [processingSolution, setProcessingSolution] = useState(false);
  const [light, setLight] = useState("off");
  const [containerWidth, setContainerWidth] = useState(0);//
  const [containerHeight, setContainerHeight] = useState(0);//
  const [containerMarginTop, setContainerMarginTop] = useState(0);//
  const [containerMarginLeft, setContainerMarginLeft] = useState(0);//
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [lightWidth, setLightWidth] = useState(0); //
  const [lightHeight, setLightHeight] = useState(0); //
  const [lightLeft, setLightLeft] = useState(0);//
  const [lightTop, setLightTop] = useState(0);//

  const [password, setPassword] = useState(""); // Estado para la contraseña

  //
  const [rotationAngle, setRotationAngle] = useState(0); // Estado para la rotación
  const [isReseting, setIsReseting] = useState(false); // Estado para saber si se está reiniciando el lock

  const playerRef = useRef(null); // Referencia al reproductor de Video.js 
  const [volume, setVolume] = useState(0.5); // Estado para el volumen (1 = 100%)
  const [showVolume, setShowVolume] = useState(false); // Estado para mostrar/ocultar el volumen
  const volumeTimeoutRef = useRef(null); // Referencia para almacenar el temporizador del volumen

  const [timer, setTimer] = useState(null); // Temporizador para los 5 segundos
  const [showCursor, setShowCursor] = useState(false); // Controla si se muestra el guion bajo

  const savedChannel = Storage.getSetting("channel") || appSettings.defaultVideo; // Recupera el canal guardado del almacenamiento
  const [load, setLoad] = useState(false); // Estado para controlar la carga del video

  const mp4VideoOptions = { 
    autoplay: true,
    controls: false,
    responsive: true,
    fluid: true,
    //muted: false,
    loop: true,
    muted: true,
    techOrder: ["html5", "youtube"],
    sources: [
      { src: savedChannel.src,//"video/WhiteNoise.mp4", // Reemplaza con la ruta de tu archivo MP4
        type: savedChannel.type}//"video/mp4"},   //https://pixabay.com/videos/digital-t-v-noise-old-analog-27519/
    ],
    userActions: { click: false }
  };
  const [playerOptions, setPlayerOptions] = useState(mp4VideoOptions); // Estado para las opciones del reproductor
  //


//

  useEffect(() => {
    handleResize();
    //console.log(savedChannel.sources.src, savedChannel.sources.type);
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
    let _containerMarginTop=0;

    let _boxWidth = _lockWidth * 0.7;
    let _boxHeight = _lockHeight * 0.7;

    let _lightWidth;
    let _lightHeight;
    let _lightLeft;
    let _lightTop;



    switch(appSettings.skin){
      case "RETRO":
        _containerMarginTop = 0;
       // _containerMarginLeft = 0;
        //_containerWidth = _lockWidth *0.45;
       // _containerHeight = _lockHeight *0.55;
        _lightWidth = _lockWidth * 0.18;
        _lightHeight = _lockHeight *0.18;
        _lightLeft = _lockWidth * 0;
        _lightTop =  _lockHeight * -0.14;
        break;
      case "FUTURISTIC":
        _containerMarginTop = 0;//_lockHeight*0;
        //_containerMarginLeft = _lockWidth * -0.065;
       // _containerWidth = _lockWidth *0.;
        _containerHeight = _lockHeight *1;
         //_lightWidth = _lockWidth*1;
        //_lightHeight = _lockHeight*0.6;
        //_lightLeft = props.appWidth / 2 + _lockWidth / 2 * 0;
        //_lightTop = props.appHeight / 2 - _lockHeight / 2 * 0.9;
        _boxHeight = _lockHeight * 0.9;
        _boxWidth = _lockWidth * 0.9;

        break;
      default:
        //Standard skin
       // _containerMarginTop = 0;
        //_containerMarginLeft = _keypadWidth * 0;
        _lightWidth = _lockWidth * 0.08;
        _lightHeight = _lockHeight * 0.08;
        _lightLeft =  _lockWidth  * 0.7;
        _lightTop =  _lockHeight  * 0.1
    }

    setContainerWidth(_containerWidth);
    setContainerHeight(_containerHeight);
    setContainerMarginTop(_containerMarginTop);
    setContainerMarginLeft(_containerMarginLeft);

    setBoxWidth(_boxWidth);
    setBoxHeight(_boxHeight);

    setLightWidth(_lightWidth);
    setLightHeight(_lightHeight);
    setLightLeft(_lightLeft);
    setLightTop(_lightTop);
  }

  /*const onClickButton = (value) => {
    if (processingSolution) {
      return;
    }
    Utils.log("onClickButton", value);
    setProcessingSolution(true);

    const shortBeep = document.getElementById("audio_beep");
    shortBeep.pause();
    shortBeep.currentTime = 0;
    shortBeep.play();

    setTimeout(() => {
      currentSolution.push(value);
      if (currentSolution.length < appSettings.solutionLength) {
        setCurrentSolution(currentSolution);
        setProcessingSolution(false);
      } else {
        const solution = currentSolution.join((["COLORS","SYMBOLS"].indexOf(appSettings.keysType) !== -1) ? ";" : "");
        setCurrentSolution([]);
        Utils.log("Check solution", solution);
        escapp.checkNextPuzzle(solution, {}, (success, erState) => {
          Utils.log("Check solution Escapp response", success, erState);
          try {
            setTimeout(() => {
              changeBoxLight(success, solution);
            }, 700);
          } catch(e){
            Utils.log("Error in checkNextPuzzle",e);
          }
        });
      }
    }, 300);
  }*/

  const onClickButton = (value) => {
    //console.log("Button clicked: ", value);
    if(processingSolution) return; // Si ya se está comprobando, no hace nada
    setPassword(prev => prev + value); // Agrega el valor del botón a la solución
    const shortBeep = document.getElementById("audio_beep");
    shortBeep.pause();
    shortBeep.currentTime = 0;
    shortBeep.play();

    // Activa el cursor y reinicia el temporizador de 5 segundos
    setShowCursor(true);
    //setShowSolution(true); // Muestra el <p> con la solución
    if (timer) {
      clearTimeout(timer); // Limpia el temporizador anterior
    }
    const newTimer = setTimeout(() => {
      //checkSolution(); // Comprueba la solución después de 5 segundos      
      handleTimerExpire(); // Maneja la expiración del temporizador
      //console.log("checking solution...", solution);
    }, 5000);
    setTimer(newTimer);
  
  }

  /*const checkSolution = () => {
    setProcessingSolution(true);
    Utils.log("Check solution", solutionArray);
    /const solution = password;//solutionArray.join(';');
    //const solution="12315"
    reset(); // Reinicia el lock
    console.log("Check solution", solution);
    escapp.checkNextPuzzle(solution, {}, (success, erState) => {
          Utils.log("Check solution Escapp response", success, erState);
          try {
            setTimeout(() => {
              changeBoxLight(success, solution);
            }, 700);
          } catch(e){
            Utils.log("Error in checkNextPuzzle",e);
          }
        });
  }*/

 /* const changeBoxLight = (success, solution) => {
    let audio;
    let afterChangeBoxLightDelay = 1000;
    appSettings.skin === "RETRO" ? afterChangeBoxLightDelay = 4500 : afterChangeBoxLightDelay = 1500;

    if (success) {
      audio = document.getElementById("audio_success");
      setLight("ok");
      afterChangeBoxLightDelay = (appSettings.skin === "RETRO" ? 4500 : 1500);
    } else {
      audio = document.getElementById("audio_failure");
      setLight("nok");
      reset(); //
    }

    setTimeout(() => {
      if(!success){
        setLight("off");
        setProcessingSolution(false);
      }else{
        //props.onKeypadSolved(solution); //Cambiar
      }
    }, afterChangeBoxLightDelay);

    audio.play();
  }*/

  //Pone la imagen del fondo
  //let backgroundImage = 'url("' + appSettings.backgroundKeypad + '")';
  let backgroundImage = 'url("' + appSettings.background + '")';
  if(appSettings.background && appSettings.background !== "NONE"){
    backgroundImage += ', url("' + appSettings.background + '")';
  }

  const handleTimerExpire = () => {
    //setChecking(true); // Activa el estado de checking
    setProcessingSolution(true); // Activa el estado de processingSolution
    setShowCursor(false); // Desactiva el cursor
    //console.log("Checking solution...", solution);
    setTimeout(() => {
      //setShowSolution(false); // Oculta el <p> después de 3 segundos
      //setSolution(""); // Reinicia la solución
      setPassword(""); // Reinicia la contraseña
      //setChecking(false); // Reinicia el estado de checking //CAMBIARLO A CUANDO HAGA EL CHEQUEO CON LA API
      setProcessingSolution(false); // Reinicia el estado de processingSolution
      setLight("off");
      
    }, 3000); // Espera 3 segundos antes de ocultar el <p>
    
  };

  const checkChannels = () => {
    const channel = appSettings.channels.find((channel) => channel.id === parseInt(password));
    if (channel) {
      rightChannel(channel); // Cambia a video de éxito
      //setSolution(channel.name); // Actualiza la solución con el nombre del canal
      //setPlayerOptions({...playerOptions, sources: [{src: channel.source, type: channel.type,},]});
    } else {
      //setSolution(""); // Reinicia la solución si no se encuentra el canal
      wrongChannel(); // Cambia a video de error
    }
  }

  useEffect(() => {
    if (password.length >= appSettings.minLength) {
      console.log("Checking solution...", password);
      //Number(solution)===PASSWORD_API ? rightChannel() : wrongChannel(); 
      checkChannels(); // Comprueba si la solución es un canal válido
    }else if(password.length != 0 && password.length < appSettings.minLength){
    //  console.log("Solution too short", solution);
      wrongChannel();
    }
    
  }, [processingSolution]); // Se ejecuta cada vez que cambia la solución*/

  const wrongChannel = () => {
    setPlayerOptions(mp4VideoOptions); // Guarda las opciones en el estado `playerOptions`  
    setLight("red");
    if (playerRef.current) {
      try{
        playerRef.current.pause(); // Pausa el video actual
        playerRef.current.src(appSettings.defaultVideo); // Cambia la fuente del reproductor
        playerRef.current.load(); // Carga el nuevo video
        handleVolume(); // Establece el volumen
        //playerRef.current.volume(volume)
        //playerRef.current.play(); // Reproduce el nuevo video
        playerRef.current.oncanplay = () => {
          playerRef.current.play();
        }; // Asegura que el video se reproduzca cuando esté listo
      
      }catch(e){
        console.error("Error al cambiar la fuente del reproductor:", e);
      }
    }
  }

  const rightChannel = (channel) => {
    setPlayerOptions(channel); // Guarda las opciones en el estado `playerOptions`
    let source= {src: channel.src, type: channel.type}; // Crea un objeto de fuente
    setLight("green");
    if (playerRef.current) {
      try{
        playerRef.current.pause(); // Pausa el video actual
        playerRef.current.src(source); // Cambia la fuente del reproductor
        playerRef.current.load(); // Carga el nuevo video
        handleVolume(); // Establece el volumen
        //playerRef.current.play(); // Reproduce el nuevo video
        //setStorage("savedChannel", channel.id); // Guarda el canal actual en el almacenamiento
        //console.log(Storage.getSetting("state")); // Guarda el canal actual en el almacenamiento
        Storage.saveSetting("channel", channel); // Guarda el canal actual en el almacenamiento
      }catch(e){
        console.error("Error al cambiar la fuente del reproductor:", e);
      }
    }
  }


  /*const  reset = () =>{
    //console.log("Solution: ", solutionArray);
    setIsReseting(true);
    //setRotationAngle(0); // Reinicia el ángulo de rotación
    //setSolutionArray([]);
    //setTries(0);
    setTimeout(() => {      
      setIsReseting(false);
    }, 2500);
    //setChecking(false);
  }*/

  const increaseVolume = () => {
    if (playerRef.current) {
      //const currentVolume = playerRef.current.volume();
      volumeAppear(); // Muestra el volumen
      if (playerRef.current.muted){
        playerRef.current.muted(false); // Asegúrate de que no esté silenciado
        const newVolume = Math.min(volume + 0.1, 1); // Asegura que no exceda 1
        setVolume(parseFloat(newVolume.toFixed(1))); // Redondea a 1 decimal
      }else if (volume < 1) {
        const newVolume = Math.min(volume + 0.1, 1); // Asegura que no exceda 1
        setVolume(parseFloat(newVolume.toFixed(1))); // Redondea a 1 decimal
      }
    }
  };

  // Función para bajar el volumen
  const decreaseVolume = () => {
    if (playerRef.current) {
      //const currentVolume = playerRef.current.volume();
      volumeAppear(); // Muestra el volumen
      if (volume > 0) {
        volume <= 0.1 && playerRef.current.muted(true); // Silencia el video si el volumen es 0.1
        const newVolume = Math.min(volume - 0.1, 1); // Asegura que no exceda 1
        setVolume(parseFloat(newVolume.toFixed(1))); // Redondea a 1 decimal
      }
    }
  };

  
  const handleVolume = () =>{
    setTimeout(() => {
      if (volume <= 0) {
        playerRef.current.muted(true); // Silencia el video si el volumen es 0
      } else {
        playerRef.current.muted(false); // Asegúrate de que no esté silenciado
        playerRef.current.volume(volume); // Establece el volumen al valor actual
      }
      playerRef.current.play(); // Reproduce el nuevo video
    }, 100); // Espera un breve momento para que el reproductor inicialice la nueva fuente

  }

  const volumeAppear = () => {
      // Cancela el temporizador anterior si existe
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }  
    setShowVolume(true);
    // Inicia un nuevo temporizador y almacena su identificador
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolume(false); // Oculta el volumen después de 3 segundos
      volumeTimeoutRef.current = null; // Limpia la referencia
    }, 4000);
    //console.log("Volume: ", volume);
  }

  

  /*useEffect(() => { // Comprueba si se ha alcanzado el número máximo de intentos (En local y en API)           
    //console.log("Tries: ", tries, "Solution: ", solutionArray);
      solutionArray.length >= appSettings.solutionLength && checkSolution();
      console.log("Solution: ", solutionArray);
  }, [solutionArray]);*/

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume(volume); // Establece el volumen del reproductor
    }
  }, [volume]); // Se ejecuta cada vez que cambia el volumen

  useEffect(() => {


    return () => {
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
    };
  }, []);



  const TV_Buttons = (
    <div style={{ position: "absolute", zIndex: 4, height:containerHeight,  width: containerWidth}}>
      <div style={{position: "absolute", left: appSettings.buttonsLeft,  height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
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
          <div style={{width:boxWidth*appSettings.buttonWidth, height:boxHeight*appSettings.buttonHeight,}}/>
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
  );

  return (
    <div id="screen_main" className={"screen_content"} style={{ backgroundImage: backgroundImage }}>
      <div id="lockContainer" className="lockContainer" 
        style={{backgroundImage: 'url('+appSettings.backgroundTV+')', width: containerWidth, 
          height: containerHeight, marginTop: containerMarginTop, marginLeft: containerMarginLeft ,
          display: "flex", alignItems: "center", zIndex:2,
          justifyContent: "center", flexDirection: "column"
        }}>
      {appSettings.blackScreen && <div className='empty_black' style={{top:appSettings.blackScreenTop, left:appSettings.blackScreenLeft, width:appSettings.blackScreenWidth, height:appSettings.blackScreenHeight}}></div>}
      <div className='video_container' style={{position: "absolute", width: boxWidth*appSettings.videoPlayerWidth, left: appSettings.videoPlayerLeft, top: appSettings.videoPlayerTop, zIndex: 1}}>
        <VideoJS  options={playerOptions} onReady={(player) => {playerRef.current = player;}} setLoad={setLoad}/>  
      </div>
      {appSettings.fuzzyScreen  && <div style={{overflow:"hidden", position:"absolute", width:appSettings.fuzzyScreenWidth, height:appSettings.fuzzyScreenHeight, left:appSettings.fuzzyScreenLeft, top:appSettings.fuzzyScreenTop, zIndex:2}}><FuzzyOverlayExample/></div>}
      <div id="lockContainer" className="lockContainer" 
        style={{backgroundImage: 'url('+appSettings.backgroundTV+')', width: containerWidth, 
          height: containerHeight, marginTop: containerMarginTop, marginLeft: containerMarginLeft ,
          zIndex:2}}></div>


      {/** CANAL */}
      {password && (<p className={`channel ${showCursor ? "show-cursor" : ""}`} style={{top:appSettings.channelNumberTop, left:appSettings.channelNumberLeft, fontSize: appSettings.channelFontSize}}>{password}</p>)}
      
      {showVolume && (
            <div className='volume_div' style={{left:appSettings.volumeLeft, top:appSettings.volumeTop, zIndex:10, width: containerWidth*appSettings.volumeContainerWidth}}>
              <p className='volume' style={{fontSize:containerWidth*appSettings.volumeFontSize, color:appSettings.volumeColor}}>vol</p>
              <div className='volumeBar' style={{width: "100%", height: appSettings.volumeHeight, marginLeft: containerWidth*appSettings.volumeBarLeft, }}>
                <div className='volumeBarFilled' style={{width: `${volume * 100}%`, backgroundColor:appSettings.volumeBarColor}}></div>
              </div>
            </div>
            )}
      {/*<div id="keypad" style={{ width: containerWidth, height: containerHeight, marginTop: containerMarginTop, marginLeft: containerMarginLeft }}>
        <audio id="audio_beep" src={appSettings.soundBeep} autostart="false" preload="auto" />
        <audio id="audio_failure" src={appSettings.soundNok} autostart="false" preload="auto" />
        <audio id="audio_success" src={appSettings.soundOk} autostart="false" preload="auto" />
        <div id="row1" className="row">
          <BoxButton value={appSettings.keys[0]} position={1} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[1]} position={2} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[2]} position={3} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
        </div>
        <div id="row2" className="row">
          <BoxButton value={appSettings.keys[3]} position={4} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[4]} position={5} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[5]} position={6} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
        </div>
        <div id="row3" className="row">
          <BoxButton value={appSettings.keys[6]} position={7} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[7]} position={8} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[8]} position={9} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
        </div>
        <div id="row4" className="row">
          <BoxButton value={appSettings.keys[9]} position={10} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[10]} position={11} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[11]} position={12} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
        </div>
        <div className="boxLight boxLight_off" style={{ visibility: light === "off" ? "visible" : "hidden", opacity: light === "off" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightOff + '")', left: lightLeft, top: lightTop }} ></div> 
        <div className="boxLight boxLight_nok" style={{ visibility: light === "nok" ? "visible" : "hidden", opacity: light === "nok" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightNok + '")', left: lightLeft, top: lightTop }} ></div> 
        <div className="boxLight boxLight_ok" style={{ visibility: light === "ok" ? "visible" : "hidden", opacity: light === "ok" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightOk + '")', left: lightLeft, top: lightTop }} ></div> 
      </div>*/}

              
      
      {/*<div className="boxLight boxLight_off" style={{ visibility: light === "off" ? "visible" : "hidden", opacity: light === "off" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightOff + '")', left: lightLeft, top: lightTop }} ></div> 
      <div className="boxLight boxLight_nok" style={{ visibility: light === "nok" ? "visible" : "hidden", opacity: light === "nok" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightNok + '")', left: lightLeft, top: lightTop }} ></div> 
      <div className="boxLight boxLight_ok" style={{ visibility: light === "ok" ? "visible" : "hidden", opacity: light === "ok" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightOk + '")', left: lightLeft, top: lightTop }} ></div>*/}
      <audio id="audio_beep" src={appSettings.soundBeep} autostart="false" preload="auto" />
      <audio id="audio_failure" src={appSettings.soundNok} autostart="false" preload="auto" />
      <audio id="audio_success" src={appSettings.soundOk} autostart="false" preload="auto" />
      </div>
      {appSettings.showRemote ?
      <div style={{overflow: "visible", width: containerWidth, height:containerHeight, position:"absolute"}}>
        <Remote boxWidth={containerWidth} boxHeight={containerHeight} onClickButton={onClickButton} decreaseVolume={decreaseVolume} increaseVolume={increaseVolume} />
      </div> :
        TV_Buttons
      }

 
    </div>);
};

export default MainScreen;