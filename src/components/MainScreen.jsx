import React, { useState, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/main.scss';
import './../assets/scss/fonts.css';
import RemoteBoxButton from './RemoteBoxButton.jsx';
import Remote from './Remote.jsx';
import videojs from 'video.js';
import "video.js/dist/video-js.css";


const MainScreen = (props) => {
  const { escapp, appSettings, Utils, I18n, Storage } = useContext(GlobalContext);
  
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const [tvState, setTVState] = useState("off"); //possible values: "off", "channels", "input"
  const tvStateRef = useRef(tvState);
  const [channel, setChannel] = useState("1");
  const channelRef = useRef(channel);
  const [inputMode, setInputMode] = useState("channels"); //possible values: "channels", "input"
  const [inputState, setInputState] = useState(Storage.getSetting("inputState") || "out"); //possible values: "out", "paused", "playing"
  const [videoError, setVideoError] = useState(false);
  const [tvMessage, setTVMessage] = useState("");

  const [userSelectedChannel, setUserSelectedChannel] = useState(null);
  const [tvHeaderContent, setTVHeaderContent] = useState(null);
  const [showCursor, setShowCursor] = useState(false);
  const [channelTimer, setChannelTimer] = useState(null);
  const processingChannelChangeRef = useRef(false);

  const incorrectSolutions = useRef(new Set());
  const correctSolution = useRef(undefined);
  const correctChannel = useRef(undefined);
  const [processingSolution, setProcessingSolution] = useState(false);

  const initializedRef = useRef(false);
  const playerRef = useRef(null);
  const videoRef = useRef(null);

  const [volume, setVolume] = useState(appSettings.initialVolume); // Volume (0 - 1)
  const [showVolume, setShowVolume] = useState(false);
  const volumeTimeoutRef = useRef(null);

  useEffect(() => {
    //Init the Video.js player when the component mounts
    if (initializedRef.current) return;
    initializedRef.current = true;

    if (playerRef.current === null) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const playerOptions = {
        autoplay: false,
        controls: false,
        responsive: true,
        fluid: true,
        loop: appSettings.enableLoopForChannels,
        muted: false,
        techOrder: ["html5"],
        sources: [ appSettings.defaultVideo ],
        userActions: { click: false },
      };

      const player = videojs(videoElement, playerOptions, () => {
        //Utils.log("Player is ready");
        playerRef.current = player;
        playerRef.current.pause();
        player.on('canplay', () => {
          //Utils.log('Video ready to play');
          setVideoError(false);
        });
        player.on('ended', () => {
          handleVideoEnded();
        });
        player.on('error', () => {
          handleVideoError();
        });
        player.on('techError', () => { 
          handleVideoError();
        });
      });
    }

    // Dispose the Video.js player when the component unmounts
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
        initializedRef.current = false;
      }
    };
  }, []);

  const handleVideoError = () => {
    if(playerRef.current != null){
      Utils.log("Video error", playerRef.current.error());
    }
    setVideoError(true);
  }

  useEffect(() => {
    handleResize(props.size);
  }, [props.size]);

  function handleResize(size) {
    if ((size.height === 0) || (size.width === 0)) {
      return;
    }

    let _containerWidth;
    let _containerHeight;

    switch (appSettings.skin) {
      case "RETRO":
        _containerWidth = size.width * 0.9;
        _containerHeight = size.height * 0.9;
        break;
      case "RETRO_REMOTE":
        _containerWidth = size.width * 0.8;
        _containerHeight = size.height * 0.8;
        break;
      case "STANDARD":
      default:
        _containerWidth = size.width * 1;
        _containerHeight = size.height * 1;
        break;
    }

    setContainerWidth(_containerWidth);
    setContainerHeight(_containerHeight);
  }


  ////////////
  // TV on/off
  ////////////

  useEffect(() => {
    Utils.log("Previous tvState:", tvStateRef.current);
    Utils.log("New tvState:", tvState);

    let audio;
    if((tvStateRef.current === "off")&&(tvState !== "off")){
      //TV has been turned on
      audio = document.getElementById("audio_tv_on");
      if(tvState === "channels") {
        playChannel(channel);
      } else if((tvState === "input")&&(inputState==="in")){
        setChannel("input");
      }
    } else if((tvStateRef.current !== "off")&&(tvState === "off")){
      //TV has been turned off
      if(playerRef.current){
        playerRef.current.pause();
      }
      audio = document.getElementById("audio_tv_off");
    }

    if(typeof audio !== "undefined"){
      setTimeout(() => {
        audio.currentTime = 0;
        audio.play();
      }, 0);
    }

    //Update previous value
    tvStateRef.current = tvState;
  }, [tvState]);

  const onClickPowerButton = () => {
    const remoteButtonAudio = document.getElementById("audio_remote_button");
    remoteButtonAudio.currentTime = 0;
    remoteButtonAudio.play();
    setTimeout(() => {
      if(tvState === "off"){
        setTVState(inputMode);
      } else {
        setTVState("off");
      }
    }, 500);
  }

  /////////
  // Channels
  ////////

  useEffect(() => {
    Utils.log("Channel change", channel);
    channelRef.current = channel;
    playChannel(channel);
    processingChannelChangeRef.current = false;
  }, [channel]);

  const playChannel = (_channel) => {
    Utils.log("Play channel:", _channel);

    if (!playerRef.current) return;
    if (tvState === "off") return;
    if (!(/^\d+$/.test(_channel)) && (_channel !== "input")) return;
    
    let channelData = appSettings.channelsHash[_channel];
    if (!channelData) {
      channelData = appSettings.defaultVideo;
    }

    if(typeof channelData.src === "string"){
      //Video
      let loop = ((_channel !== "input") && (appSettings.enableLoopForChannels===true));
      playerRef.current.loop(loop);

      if(channelData.src !== playerRef.current.src()){
        playerRef.current.pause();
        playerRef.current.src(channelData);
        playerRef.current.load();
        playerRef.current.play();
      }

      setTVMessage("");
    } else if(typeof channelData.message === "string"){
      //Message
      setTVMessage(channelData.message);
    }

    updatePlayerVolume();
    checkSolution(_channel);
  }

  const checkSolution = (channel) => {
    if((typeof channel !== "string")||(channel.trim()==="")) return;
    let solutionArray = channel.split("");
    if(solutionArray.length !== appSettings.solutionLength) return;
    if(incorrectSolutions.current.has(channel)) return;
    if((typeof correctChannel.current === "string") && escapp.getAllPuzzlesSolved() && (escapp.getSolvedPuzzles().length > 0)) return;

    let solution = solutionArray.join(";");
    Utils.log("Check solution: " + solution);

    escapp.checkNextPuzzle(solution, {}, (success, erState) => {
      Utils.log("Check solution Escapp response", success, erState);
      if(success === true){
        correctSolution.current = solution;
        correctChannel.current = channel;
        afterFirstSuccesfullCheck();
      } else {
        incorrectSolutions.current.add(channel);
      }
    });
  };

  const afterFirstSuccesfullCheck = () => {
    if (appSettings.actionAfterSolve === "NONE") {
      props.onPuzzleSolved(correctSolution.current);
    } else if(appSettings.actionAfterSolve === "SHOW_MESSAGE"){
      setTimeout(function(){
          props.onPuzzleSolved(correctSolution.current);
      }, appSettings.delayMessageNumber);
    } else if (appSettings.actionAfterSolve === "PLAY_VIDEO") {
      if (!playerRef.current) return;

      if ((correctChannel.current === channelRef.current)&&(playerRef.current.ended())) {
        props.onPuzzleSolved(correctSolution.current);
        return;
      }

      //Wait for handleVideoEnded
      playerRef.current.loop(false); 
    }
  }

  const handleVideoEnded = () => {
    if ((typeof correctSolution.current !== "undefined")&&(appSettings.actionAfterSolve === "PLAY_VIDEO")&&(correctChannel.current === channelRef.current)) {
      if(escapp.getAllPuzzlesSolved()===false){
        props.onPuzzleSolved(correctSolution.current);
      }
    } else {
      if((playerRef.current)&&(tvStateRef.current === "channels")&&(appSettings.enableLoopForChannels===true)){
        playerRef.current.loop(true);
        playerRef.current.currentTime(0);
        playerRef.current.play();
      }
    }
  }

  const onClickChannelButton = (value) => {
    if (processingChannelChangeRef.current || tvState === "off") return;
    let _userSelectedChannel = (userSelectedChannel === null) ? "" : userSelectedChannel;
    if (_userSelectedChannel.length >= appSettings.maxChannelLength) return;
    
    let selectedChannel = _userSelectedChannel + value;
    setUserSelectedChannel(selectedChannel);
    setTVHeaderContent(selectedChannel);
    setShowCursor(selectedChannel.length < appSettings.maxChannelLength);

    const shortBeep = document.getElementById("audio_remote_button");
    shortBeep.pause();
    shortBeep.currentTime = 0;
    shortBeep.play();

    if (channelTimer) { clearTimeout(channelTimer); }
    const newChannelTimer = setTimeout(() => {
      handleChannelTimerExpire(selectedChannel);
    }, 4000);
    setChannelTimer(newChannelTimer);
  }

  const handleChannelTimerExpire = (selectedChannel) => {
    processingChannelChangeRef.current = true;
    setShowCursor(false);
    setTimeout(() => {
      setTVHeaderContent(null);
      setUserSelectedChannel(null);
      if(selectedChannel !== channel){
        setChannel(selectedChannel);
      } else {
        processingChannelChangeRef.current = false;
      }
    }, 1500);
  };




    // const checkChannels = (channelInput) => {
  //   const channel = appSettings.channels.find((channel) => channel.id === channelInput);
  //   setBlackScreenChannels(true);
  //   setTimeout(() => { 
  //     setBlackScreenChannels(false); 
  //   }, 900);
  //   if (channel) {
  //     rightChannel(channel);
  //   } else { wrongChannel(); }
  // }

  // useEffect(() => {
  //   if (!processingSolution) return;
  //   if (tvHeaderContent.length >= 1) {
  //     checkChannels(tvHeaderContent);
  //   } else {
  //     wrongChannel();
  //   }
  // }, [processingSolution]);

  // const wrongChannel = () => {
  //   correctSolution.current = '';
  //   setPlayerOptions(appSettings.defaultVideo);
  //   setVideoError(false);
  //   if (playerRef.current === null) {
  //     Utils.log("Error: El reproductor no está inicializado");
  //     setVideoError(true);
  //     Storage.removeSetting("channel");
  //     return;
  //   }
  //   try {
  //     playerRef.current.pause();
  //     playerRef.current.src(appSettings.defaultVideo);
  //     playerRef.current.load();
  //     updatePlayerVolume();
  //     playerRef.current.oncanplay = () => {
  //       playerRef.current.play();
  //     };
  //   } catch (e) {
  //     console.error("Error al cambiar la fuente del reproductor:", e);
  //   }
  // }

  // const rightChannel = (channel) => {
  //   setPlayerOptions(channel);
  //   let source = { src: channel.src, type: channel.type };
  //   setVideoError(false);
  //   if (playerRef.current === null) {
  //     Utils.log("Error: El reproductor no está inicializado");
  //     Storage.removeSetting("channel");
  //     setVideoError(true);
  //     return;
  //   }
  //   try {
  //     playerRef.current.pause();
  //     playerRef.current.src(source);
  //     playerRef.current.load();
  //     updatePlayerVolume();
  //     Utils.log("Video Saved in Storage", channel);
  //     Storage.saveSetting("channel", channel);
  //     handleApiAnswer(channel);

  //   } catch (e) {
  //     Utils.log("Error al cambiar la fuente del reproductor:", e);
  //     Storage.removeSetting("channel");
  //   }
  // }




  //////////
  // Volume
  /////////

  const onClickIncreaseVolume = () => {
    if (tvState !== "off") {
      displayVolume();
      if (volume < 1) {
        const newVolume = parseFloat(Math.min(volume + 0.1, 1).toFixed(1));
        setVolume(newVolume);
      }
    }
  };

  const onClickDecreaseVolume = () => {
    if (tvState !== "off") {
      displayVolume();
      if (volume > 0) {
        const newVolume = parseFloat(Math.max(volume - 0.1, 0).toFixed(1));
        setVolume(newVolume);
      }
    }
  };

  const updatePlayerVolume = () => {
    if (playerRef.current === null) return;
    if (volume <= 0) {
      playerRef.current.muted(true);
    } else {
      playerRef.current.muted(false);
      playerRef.current.volume(volume);
    }
  }

  const displayVolume = () => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    setShowVolume(true);
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolume(false);
      volumeTimeoutRef.current = null;
    }, 2000);
  }

  useEffect(() => {
    updatePlayerVolume();
  }, [volume]);

  useEffect(() => {
    return () => {
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
    };
  }, []);

  const handleVhsClick = () => {
    // const vhsSound = document.getElementById("audio_vhs_tape");
    // if (inputState === "out") {
    //   vhsSound.currentTime = 0;
    //   vhsSound.play();
    //   setVhsPaused(true);
    //   setInputState("in");
    //   Storage.saveSetting("inputState", "in");
    // }
  }

  const ejectTapeOnClick = () => {
    // if (inputState === "in") {
    //   const vhsSound = document.getElementById("audio_vhs_tape");
    //   vhsSound.currentTime = 0;
    //   vhsSound.play();
    //   setInputState("out");
    //   Storage.saveSetting("inputState", "out");
    //   if(playerRef.current){
    //     playerRef.current.pause();
    //   }
    // }
  }

  const inputOnClick = () => {
    // if (!isPoweredOn || processingSolution || !appSettings.enableInput || correctSolution.current !== '') return;
    // const shortBeep = document.getElementById("audio_remote_button");
    // shortBeep.currentTime = 0;
    // shortBeep.play();
    // if (channelTimer) {
    //   clearTimeout(channelTimer);
    //   setChannelTimer(null);
    // }
    // setBlackScreenChannels(true);
    // setTimeout(() => {
    //   setBlackScreenChannels(false);
    // }, 900);
    // if (inputMode === "tv") {
    //   if (playerVhsRef.current === null) {
    //     Utils.log("Error: El reproductor VHS no está inicializado");
    //     return;
    //   }
    //   setInputMode("vhs");
    //   setTVHeaderContent(appSettings.inputChannel.src);
    //   setTimeout(() => {
    //     setTVHeaderContent("");
    //   }, 1500);
    //   if (vhsPaused || inputState !== "in") {
    //     playerVhsRef.current.pause();
    //   } else {
    //     playerVhsRef.current.play();
    //   }
    //   playerRef.current.pause();
    // } else if (inputMode === "vhs") {
    //   if (playerRef.current === null) {
    //     Utils.log("Error: El reproductor no está inicializado");
    //     reinitializePlayer();
    //     return;
    //   }
    //   setInputMode("tv");
    //   setTVHeaderContent("tv");
    //   playerVhsRef.current.pause();
    //   playerRef.current.play();
    //   setTimeout(() => {
    //     setTVHeaderContent("");
    //   }, 1500);
    // }
  }



  const handlePlayPause = () => {
    // const shortBeep = document.getElementById("audio_remote_button");
    // shortBeep.currentTime = 0;
    // shortBeep.play();
    // if (!isPoweredOn || processingSolution || !appSettings.enableInput || inputMode === "tv" || inputState !== "in") return; // No permite interacción si el TV está apagado
    // setVideoError(false);
    // if (playerVhsRef.current === null) {
    //   Utils.log("Error: El reproductor VHS no está inicializado");
    //   setVideoError(true);
    //   return;
    // }
    // if (!vhsPaused) {
    //   playerVhsRef.current.pause();
    //   setVhsPaused(true);
    //   setTVHeaderContent("Pause ❚❚");
    //   setTimeout(() => {
    //     setTVHeaderContent("");
    //   }, 1000);
    // } else {
    //   playerVhsRef.current.play();
    //   correctSolution.current === '' && handleApiAnswer(appSettings.inputChannel);
    //   setTVHeaderContent("Play ▶");
    //   setTimeout(() => {
    //     setTVHeaderContent("");
    //   }, 1000);
    //   setVhsPaused(false);
    // }
  }

  const handleVideoForward = () => {
    // if (!isPoweredOn || processingSolution || !appSettings.enableInput || inputMode === "tv" || inputState !== "in" || correctSolution.current !== '') return; // No permite interacción si el TV está apagado
    // const shortBeep = document.getElementById("audio_remote_button");
    // shortBeep.currentTime = 0;
    // shortBeep.play();
    // if (playerVhsRef.current === null) {
    //   Utils.log("Error: El reproductor VHS no está inicializado");
    //   return;
    // }

    // const currentTime = playerVhsRef.current.currentTime();
    // const duration = playerVhsRef.current.duration();
    // const forwardTime = Math.min(currentTime + 5, duration); // Avanzar 5 segundos    
    // playerVhsRef.current.currentTime(forwardTime);
    // setTVHeaderContent("▶▶");
    // setTimeout(() => {
    //   setTVHeaderContent("");
    // }, 600);
  }

  const handleVideoRewind = () => {
    // if (!isPoweredOn || processingSolution || !appSettings.enableInput || inputMode === "tv" || inputState !== "in") return; // No permite interacción si el TV está apagado
    // const shortBeep = document.getElementById("audio_remote_button");
    // shortBeep.currentTime = 0;
    // shortBeep.play();
    // if (playerVhsRef.current === null) {
    //   Utils.log("Error: El reproductor VHS no está inicializado");
    //   return;
    // }
    // const currentTime = playerVhsRef.current.currentTime();
    // const rewindTime = Math.max(currentTime - 5, 0); // Retroceder 5 segundos
    // playerVhsRef.current.currentTime(rewindTime);
    // setTVHeaderContent("◀◀");
    // setTimeout(() => {
    //   setTVHeaderContent("");
    // }, 600);
  }

  let showVideo = ((tvState !== "off")&&(videoError === false));
  return (
    <div id="screen_main" className={"screen_content"} style={{ backgroundImage: 'url(' + appSettings.background + ')' }}>
      <div id="tvContainer" className="tvContainer"
        style={{
          '--background-image-after': 'url(' + appSettings.backgroundTV + ')', 
          width: props.size.width,
          height: props.size.height, 
        }}>
        <div className='tvScreenContainer' style={{ height: appSettings.tvScreenHeight, marginBottom: appSettings.tvScreenMarginBottom }}>
          {!showVideo && (
            <div className='tvScreenBlack tvScreenContent'></div>
          )}
          <div className="tvVideoContainer tvScreenContent" style={{
              zIndex: showVideo ? 1 : 0,
              display: showVideo ? "block" : "none"
            }}>
            <div data-vjs-player style={{ height: "100%", width: "100%" }}>
              <div ref={videoRef} style={{display: "flex", height: "100%", width: "100%", alignItems: "center"}}></div>
            </div>
            { appSettings.fuzzyScreen && 
              <div className='fuzzy_screen tvScreenContent'>
                <div className="fuzzy-overlay"></div>
              </div>
            }
          </div>
          {tvMessage && tvMessage.trim()!=="" && tvState!=="off" &&
            <div className='tvScreenContent tvMessageContainer'>
              <p className='tvMessage' style={{ fontSize: containerWidth * appSettings.messageFontSize }}>{tvMessage}</p>
            </div>
          }

          <div className="channels">
            {tvHeaderContent && tvState!=="off" && (<span className={`channel ${showCursor ? "show-cursor" : ""}`} style={{ fontSize: appSettings.channelFontSize }}>{tvHeaderContent}</span>)}

            {showVolume && tvState!=="off" && tvHeaderContent === null && (
              <div className='volume_div' style={{ zIndex: 10, }}>
                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                  <p className='volume' style={{ fontSize: containerWidth * appSettings.volumeFontSize, color: appSettings.volumeColor }}>vol</p>
                  <div className='volumeBar' >
                    <div className='volumeBarFilled' style={{ width: `${volume * 100}%`, backgroundColor: appSettings.volumeBarColor }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <audio id="audio_remote_button" src={appSettings.soundRemoteButton} autostart="false" preload="auto" />
        <audio id="audio_tv_on" src={appSettings.soundTvOn} autostart="false" preload="auto" />
        <audio id="audio_tv_off" src={appSettings.soundTvOff} autostart="false" preload="auto" />
        <audio id="audio_vhs_tape" src={appSettings.soundVHS} autostart="false" preload="auto" />
      </div>
      
      {appSettings.showRemote ?
        <div className="remoteContainer">
          <Remote containerWidth={containerWidth} containerHeight={containerHeight} onClickPowerButton={onClickPowerButton} onClickChannelButton={onClickChannelButton} onClickDecreaseVolume={onClickDecreaseVolume} onClickIncreaseVolume={onClickIncreaseVolume} handlePlayPause={handlePlayPause} ejectTapeOnClick={ejectTapeOnClick} inputOnClick={inputOnClick} rewind={handleVideoRewind} forward={handleVideoForward} />
        </div> : null
      }

    </div>);
};

export default MainScreen;