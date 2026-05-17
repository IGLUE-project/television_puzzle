import React, { useState, useEffect, useContext, useRef, forwardRef, useImperativeHandle } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/main.scss';
import './../assets/scss/fonts.css';
import "video.js/dist/video-js.css";
import Remote from './Remote.jsx';
import ButtonPanel from './ButtonPanel.jsx';
import Icons from './Icons.jsx';
import videojs from 'video.js';

const MainScreen = forwardRef((props, ref) => {
  const { escapp, appSettings, Utils, I18n, Storage } = useContext(GlobalContext);
  
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const [tvState, setTVState] = useState("off"); // possible values: "off", "channels", "input". Start with "off" to force the TV to be switched on to allow autoplay
  const tvStateRef = useRef(tvState);
  const [channel, setChannel] = useState(props.appState?.channel ?? "1");
  const channelRef = useRef(channel);
  const [inputMode, setInputMode] = useState(["channels", "input"].includes(props.appState.inputMode) ? props.appState.inputMode : "channels");
  const [inputState, setInputState] = useState(["out", "paused", "playing"].includes(props.appState.inputState) ? props.appState.inputState : appSettings.inputInitialState);
  const inputStateRef = useRef(inputState);
  const channelsVideoTimeRef = useRef(props.appState?.channelsVideoTime ?? {});
  const [videoError, setVideoError] = useState(false);
  const [tvMessage, setTVMessage] = useState("");
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  const [userSelectedChannel, setUserSelectedChannel] = useState(null);
  const [tvHeaderContent, setTVHeaderContent] = useState(null);
  const [showCursor, setShowCursor] = useState(false);
  const [channelTimer, setChannelTimer] = useState(null);
  const processingChannelChangeRef = useRef(false);

  const incorrectSolutions = useRef(new Set());
  const correctSolution = useRef(undefined);
  const correctChannel = useRef(undefined);

  const initializedRef = useRef(false);
  const playerRef = useRef(null);
  const videoRef = useRef(null);
  // const canPlayVideoMapRef = useRef({});
  const rewindIntervalRef = useRef(null);
  const forwardIntervalRef = useRef(null);

  const [volume, setVolume] = useState(props.appState?.volume ?? appSettings.initialVolumeNumber); // Volume (0 - 1)
  const [showVolume, setShowVolume] = useState(false);
  const volumeTimeoutRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getState: () => {
      let inputStateValue = inputStateRef.current;
      if (!["out", "paused", "playing"].includes(inputStateValue)) {
        inputStateValue = "paused";
      }
      const inputModeValue = (channelRef.current === "input" ? "input" : "channels");
      if((tvState !== "off")&&(playerRef)){
        storeChannelVideoTime(channelRef.current);
      }
      return {
        tvState: tvStateRef.current,
        inputMode: inputModeValue,
        channel: channelRef.current,
        inputState: inputStateValue,
        volume,
        channelsVideoTime: channelsVideoTimeRef.current
      };
    }
  }));

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
        sources: [ appSettings.defaultChannelVideo ],
        userActions: { click: false },
      };

      const player = videojs(videoElement, playerOptions, () => {
        //Utils.log("Player is ready");
        playerRef.current = player;
        playerRef.current.pause();
        player.on('canplay', () => {
          //Utils.log('Video ready to play');
          // canPlayVideoMapRef.current[playerRef.current.currentSrc()] = true;
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

        if(tvStateRef.current !== "off"){
          playAndUpdateChannel(channel);
        }
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
        _containerWidth = size.width * 0.8;
        _containerHeight = size.height * 0.8;
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
    // Utils.log("Previous tvState:", tvStateRef.current);
    // Utils.log("New tvState:", tvState);

    if((tvState === "channels")||(tvState === "input")){
      setInputMode(tvState);
    }

    let audio;
    if((tvStateRef.current === "off")&&(tvState !== "off")){
      //TV has been turned on
      audio = document.getElementById("audio_tv_on");
      if(tvState === "channels") {
        playAndUpdateChannel(channel);
      } else if(tvState === "input"){
        playAndUpdateChannel("input");
      }
    } else if((tvStateRef.current !== "off")&&(tvState === "off")){
      //TV has been turned off
      if(playerRef.current){
        storeChannelVideoTime(channel);
        playerRef.current.pause();
      }
      setIsShuttingDown(true);
      setTimeout(() => {
        setIsShuttingDown(false);
      }, 800);
      audio = document.getElementById("audio_tv_off");
    } else {
      if(tvState === "input"){
        //TV changed from channels to input
        storeChannelVideoTime(channel); //channel has the old value at this point
        setTVHeaderContent(null);
        setUserSelectedChannel(null);
        playAndUpdateChannel("input");
      } else {
        //TV changed from input to channels
        storeChannelVideoTime("input");
        playAndUpdateChannel(channel);
      }
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
    playButtonAudio();
    setTimeout(() => {
      if(tvState === "off"){
        setTVState(inputMode);
      } else {
        setTVState("off");
      }
    }, 500);
  }

  const storeChannelVideoTime = function(_channel){
    if (!playerRef.current) return;
    let channelData = appSettings.channelsHash[_channel];
    if ((!channelData) || (!channelData.src)) return;
    channelsVideoTimeRef.current[_channel] = playerRef.current.currentTime();
  }

  const playButtonAudio = function(){
    let audio;
    if(appSettings.showRemote){
      audio = document.getElementById("audio_remote_button");
    } else {
      audio = document.getElementById("audio_tv_button");
    }
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  const playRewindAudio = function(){
    if(appSettings.vhs!==true) return;
    const audio = document.getElementById("audio_vhs_rewind");
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  const pauseRewindAudio = function(){
    if(appSettings.vhs!==true) return;
    const audio = document.getElementById("audio_vhs_rewind");
    audio.pause();
    audio.currentTime = 0;
  }

  

  /////////
  // Channels
  ////////

  useEffect(() => {
    //Utils.log("Channel change", channel);
    channelRef.current = channel;
    playChannel(channel);
  }, [channel]);

  const playChannel = (_channel) => {
    //Utils.log("Play channel:", _channel);

    if (!playerRef.current) return;
    if (tvState === "off") return;
    if (!(/^\d+$/.test(_channel)) && (_channel !== "input")) return;

    processingChannelChangeRef.current = false;

    if((_channel !== "input")&&(tvState === "input")){
      return setTVState("channels");
    } else if((_channel === "input")&&(tvState !== "input")){
      return setTVState("input");
    }

    let channelData = appSettings.channelsHash[_channel];
    if (!channelData) {
      if(tvState==="channels"){
        channelData = appSettings.defaultChannelVideo;
      } else {
        channelData = {};
      }
    }

    playerRef.current.pause();

    if(typeof channelData.src === "string"){
      //Video
      let loop = ((_channel !== "input") && (appSettings.enableLoopForChannels===true));
      playerRef.current.loop(loop);

      let srcChange = ((typeof channelData.src === "undefined")||(channelData.src !== playerRef.current.src()));
      if(srcChange){
        playerRef.current.src(channelData);
        playerRef.current.load();
      }

      //Restore time if stored
      let videoTime = 0;
      if (typeof channelsVideoTimeRef.current[_channel] === "number"){
        videoTime = channelsVideoTimeRef.current[_channel];
      }
      playerRef.current.currentTime(videoTime);

      if((_channel !== "input")||(inputState === "playing")){
        if (playerRef.current.paused()) {
          playerRef.current.play();
        }
      }
      setTVMessage("");
    } else if(typeof channelData.message === "string"){
      setTVMessage(channelData.message);
    }

    updatePlayerVolume();

    if((_channel !== "input")||(inputState === "playing")){
      checkSolution(_channel);
    }
  }

  const playAndUpdateChannel = function(_channel){
    if(channel === _channel){
      playChannel(_channel);
    } else {
      setChannel(_channel);
    }
  }

  const checkSolution = (channel) => {
    //Utils.log("Check channel: " + channel);
    if(appSettings.noLinkedPuzzles) return;
    if((typeof channel !== "string")||(channel.trim()==="")) return;

    let solution;
    let solutionLength;
    if(channel !== "input"){
      let solutionArray = channel.split("");
      solutionLength = solutionArray.length;
      solution = solutionArray.join(";");
    } else {
      solution = channel;
      solutionLength = solution.length;
    }
    if(solutionLength !== appSettings.solutionLength) return;
    
    if(incorrectSolutions.current.has(channel)) return;
    if((typeof correctChannel.current === "string") && escapp.getAllPuzzlesSolved() && (escapp.getSolvedPuzzles().length > 0)) return;

    //Utils.log("Check solution: " + solution);
    escapp.checkNextPuzzle(solution, {}, (success, erState) => {
      //Utils.log("Check solution Escapp response", success, erState);
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
      let delayMessageNumber = appSettings.delayMessageNumber;
      let correctChannelData = appSettings.channelsHash[correctChannel.current];
      if((typeof correctChannelData !== "object")||(correctChannelData.src === "string")||(correctChannelData.message !== "string")){
        delayMessageNumber = 0; //There is no message to show
      }
      setTimeout(function(){
        props.onPuzzleSolved(correctSolution.current);
      }, delayMessageNumber);
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
    playButtonAudio();
    if (processingChannelChangeRef.current || tvState === "off") return;
    let _userSelectedChannel = (userSelectedChannel === null) ? "" : userSelectedChannel;
    if (_userSelectedChannel.length >= appSettings.maxChannelLengthNumber) return;
    
    let selectedChannel = _userSelectedChannel + value;
    setUserSelectedChannel(selectedChannel);
    setTVHeaderContent(selectedChannel);
    setShowCursor(appSettings.canShowCursor && selectedChannel.length < appSettings.maxChannelLengthNumber);

    if (channelTimer) { clearTimeout(channelTimer); }
    const newChannelTimer = setTimeout(() => {
      handleChannelTimerExpire(selectedChannel,tvState);
    }, appSettings.delayForSelectChannel);
    setChannelTimer(newChannelTimer);
  }

  const handleChannelTimerExpire = (selectedChannel,tvStateWhenChannelWasSelected) => {
    if(tvState === "off") return;
    processingChannelChangeRef.current = true;
    setShowCursor(false);
    setTimeout(() => {
      setTVHeaderContent(null);
      setUserSelectedChannel(null);
      let changedToInputDuringChannelSelection = ((tvStateWhenChannelWasSelected !== tvStateRef.current)&&(tvStateRef.current === "input"));
      if((selectedChannel !== channel)&&(tvState !== "off")&&(!changedToInputDuringChannelSelection)){
        setChannel(selectedChannel);
      } else {
        processingChannelChangeRef.current = false;
      }
    }, appSettings.delayAfterSelectChannel);
  };

  //////////
  // Volume
  /////////

  const onClickIncreaseVolume = () => {
    playButtonAudio();
    if(tvState === "off") return;
    if((tvState === "input")&&((inputState === "rewinding")||(inputState === "forwarding"))) return;
    displayVolume();
    if (volume < 1) {
      const newVolume = parseFloat(Math.min(volume + 0.1, 1).toFixed(1));
      setVolume(newVolume);
    }
  };

  const onClickDecreaseVolume = () => {
    playButtonAudio();
    if(tvState === "off") return;
    if((tvState === "input")&&((inputState === "rewinding")||(inputState === "forwarding"))) return;
    displayVolume();
    if (volume > 0) {
      const newVolume = parseFloat(Math.max(volume - 0.1, 0).toFixed(1));
      setVolume(newVolume);
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


  ////////
  // Input (VHS and disc)
  ////////

  useEffect(() => {
    // Utils.log("Previous inputState:", inputStateRef.current);
    // Utils.log("New inputState:", inputState);

    if((inputStateRef.current === "out")&&(inputState === "inserting")){
      //From "out" to "inserting"
      setTimeout(function(){
        setInputState("paused");
      }, appSettings.onClickInputTimeout);
      inputStateRef.current = inputState;
      return;
    }

    if (tvState !== "input"){
      inputStateRef.current = inputState;
      return;
    }

    storeChannelVideoTime("input");

    if((inputStateRef.current !== "out")&&(inputState === "out")){
      //Input has been ejected during pause or playing.
      if(playerRef.current){
        playerRef.current.pause();
      }
      playAndUpdateChannel("input"); //Update screen when no input message.
    } else if((inputStateRef.current === "paused")&&(inputState === "playing")){
      //Start playing or resume video
      playAndUpdateChannel("input");
    } else if(((inputStateRef.current === "rewinding")||(inputStateRef.current === "forwarding"))&&(inputState === "playing")){
      stopRewindAndForward();
      playAndUpdateChannel("input");
    } else if((inputStateRef.current === "playing")&&(inputState === "paused")){
      //Pause current video
      if(playerRef.current){
        playerRef.current.pause();
      }
    }

    //Update previous value
    inputStateRef.current = inputState;
  }, [inputState]);

  const onClickInput = () => {
    let audio;
    if (inputState === "out") {
      if(appSettings.vhs){
        audio = document.getElementById("audio_vhs_tape_in");
      } else {
        audio = document.getElementById("audio_disc_in");
      }
      setInputState("inserting");
    }

    if(typeof audio !== "undefined"){
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
  }

  const onClickEjectInput = () => {
    let audio;
    if (inputState !== "out") {
      if(appSettings.vhs){
        audio = document.getElementById("audio_vhs_tape_out");
      } else if (appSettings.disc){
        audio = document.getElementById("audio_disc_out");
      } else if (appSettings.inputType === "INTERNAL"){
        audio = document.getElementById("audio_remote_button");
      }
      if(appSettings.ejectEnabled){
        setTimeout(function(){
          setInputState("out");
        }, 300);
      }
    } else {
      if(appSettings.vhs){
        audio = document.getElementById("audio_vhs_eject_notape");
      } else {
        audio = document.getElementById("audio_remote_button");
      }
    }
    if(typeof audio !== "undefined"){
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
  }

  const onClickInputButton = () => {
    playButtonAudio();
    if(tvState === "off") return;
    setTimeout(() => {
      if(tvState !== "input"){
        setTVState("input");
      }
    }, 500);
  }

  const onClickPlayPause = () => {
    playButtonAudio();
    if(tvState === "off") return;
    setTimeout(() => {
      if(tvState === "input"){
        if(inputState==="out"){
          //Do nothing
        } else if(inputState==="playing"){
          setInputState("paused");
        } else {
          setInputState("playing");
        }
      }
    }, 500);
  }

  const onClickRewind = () => {
    playButtonAudio();
    if (!playerRef.current || tvState !== "input" || inputState === "out" || inputState === "rewinding") return;
    if (rewindIntervalRef.current) return;
    if(inputState === "forwarding") stopForward();

    setInputState("rewinding");
    setTVHeaderContent("◀◀");
    setTimeout(function(){
      playRewindAudio();
    },500);

    playerRef.current.pause();

    rewindIntervalRef.current = setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      const currentTime = player.currentTime();
      const newTime = Math.max(currentTime - appSettings.rewindFactor, 0);
      player.currentTime(newTime);
      channelsVideoTimeRef.current["input"] = newTime;
      if (newTime <= 0) {
        stopRewind();
        setInputState("paused");
      }
    }, 200);
  };

  const stopRewind = () => {
    pauseRewindAudio();
    if (rewindIntervalRef.current) {
      clearInterval(rewindIntervalRef.current);
      rewindIntervalRef.current = null;
    }
    setTVHeaderContent(null);
  };

  const onClickForward = () => {
    playButtonAudio();
    if (!playerRef.current || tvState !== "input" || inputState === "out" || inputState === "forwarding") return;
    if (forwardIntervalRef.current) return;
    if(inputState === "rewinding") stopRewind(); 
    setInputState("forwarding");
    setTVHeaderContent("▶▶");
    setTimeout(function(){
      playRewindAudio();
    },500);

    playerRef.current.pause();

    forwardIntervalRef.current = setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      const currentTime = player.currentTime();
      const duration = player.duration();
      const newTime = Math.min(currentTime + appSettings.rewindFactor, duration);
      player.currentTime(newTime);
      channelsVideoTimeRef.current["input"] = newTime;
      if (newTime >= duration) {
        stopForward();
      }
    }, 200);
  };

  const stopForward = () => {
    pauseRewindAudio();
    if (forwardIntervalRef.current) {
      clearInterval(forwardIntervalRef.current);
      forwardIntervalRef.current = null;
    }
    setTVHeaderContent(null);
  };

  const stopRewindAndForward = () => {
    stopRewind();
    stopForward();
  };

  let showVideo = ((tvState !== "off")&&(videoError === false));
  let showMessageNoInput = false;
  let showPausedInput = false;
  let showPausedInputForVideo = false;
  if(tvState === "input"){
    showVideo = (showVideo && (inputState!=="out"));
    showPausedInput = (inputState==="paused");
    showMessageNoInput = ((inputState === "out")||(inputState === "inserting"));
  }
  let showFuzzyScreen = (appSettings.fuzzyScreen && (tvState !== "off"));
  let showInputObject = (appSettings.showInputObject && inputState === "out");
  return (
    <div id="screen_main" className={"screen_content"} style={{ backgroundImage: 'url(' + appSettings.background + ')' }}>
      <div id="tvContainer" className={`tvContainer ${showInputObject ? 'showInputObject' : ''}`}
        style={{
          '--background-image-after': 'url(' + appSettings.backgroundTV + ')',
          '--background-image-after-show-input': 'url(' + appSettings.backgroundTVInputOut + ')',  
          width: props.size.width,
          height: props.size.height, 
        }}>
        <div className='tvScreenContainer' style={{ 
          height: appSettings.tvScreenHeight, 
          marginLeft: appSettings.tvScreenMarginLeft, 
          marginBottom: appSettings.tvScreenMarginBottom,
        }}>
          {!showVideo && (
            <div className={`tvScreenBlack tvScreenContent ${isShuttingDown ? "shutdown" : ""}`}></div>
          )}
          <div className={`tvVideoContainer tvScreenContent`} style={{
              zIndex: showVideo ? 1 : 0,
              display: showVideo ? "block" : "none",
              padding: appSettings.videoContainerPaddingNumber ? (appSettings.videoContainerPaddingNumber+"%") : "0%"
            }}>
            <div data-vjs-player style={{ height: "100%", width: "100%" }}>
              <div ref={videoRef} style={{display: "flex", height: "100%", width: "100%", alignItems: "center"}}></div>
            </div>
          </div>
          {tvMessage && tvMessage.trim()!=="" && tvState!=="off" &&
            <div className='tvScreenContent tvMessageContainer'>
              <p className='tvMessage' style={{ fontSize: containerWidth * appSettings.messageFontSize }}>{tvMessage}</p>
            </div>
          }
          {showMessageNoInput &&
            <div className='tvScreenContent tvMessageContainer'>
              <p className='tvMessage' style={{ fontSize: containerWidth * appSettings.messageFontSize }}>{appSettings.messageNoInput}</p>
            </div>
          }
          {showPausedInput &&
            <div className={`tvScreenContent inputPausedScreen ${ showVideo ? "playing" : "" }`}>
              {appSettings.skin==="STANDARD" ? Icons.standardPauseIcon : Icons.retroPauseIcon}
            </div>
          }
          { showFuzzyScreen && 
            <div className='fuzzy_screen tvScreenContent'>
              <div className="fuzzy-overlay"></div>
            </div>
          }
          <div className="channels">
            {tvHeaderContent && (tvState !== "off") && (<span className={`channel ${showCursor ? "show-cursor" : ""}`} style={{ fontSize: appSettings.tvHeaderFontSize }}>{tvHeaderContent}</span>)}
            {showVolume && tvState!=="off" && tvHeaderContent === null && (
              <div className='volume_div'>
                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                  {appSettings.skin !== "STANDARD" ?
                    <p className='volume' style={{ fontSize: containerWidth * appSettings.volumeFontSize, color: appSettings.volumeColor }}>vol</p>
                    : Icons.volumeScreenIcon(appSettings)
                  }
                  <div className='volumeBar' >
                    <div className='volumeBarFilled' style={{ width: `${volume * 100}%`, backgroundColor: appSettings.volumeBarColor }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="ejectButton"
          style={{
            width: containerWidth * appSettings.ejectButtonTvWidth,
            height: containerHeight * appSettings.ejectButtonTvHeight,
            backgroundImage: `url("${appSettings.backgroundEjectButton}")`,
          }}
          onClick={onClickEjectInput}
        >
          <div style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
            {appSettings.skin === "STANDARD" ? Icons.ejectIconDisc(appSettings) : Icons.ejectIconVHS(appSettings)}
          </div>
        </div>
        {appSettings.showButtonPanel ?
          <ButtonPanel containerWidth={containerWidth} containerHeight={containerHeight} onClickPowerButton={onClickPowerButton} onClickChannelButton={onClickChannelButton} onClickDecreaseVolume={onClickDecreaseVolume} onClickIncreaseVolume={onClickIncreaseVolume} onClickInputButton={onClickInputButton} /> : null
        }
        {appSettings.soundRemoteButton && <audio id="audio_remote_button" src={appSettings.soundRemoteButton} autostart="false" preload="auto"/>}
        {appSettings.soundTVButton && <audio id="audio_tv_button" src={appSettings.soundTVButton} autostart="false" preload="auto"/>}
        {appSettings.soundTvOn && <audio id="audio_tv_on" src={appSettings.soundTvOn} autostart="false" preload="auto"/>}
        {appSettings.soundTvOff && <audio id="audio_tv_off" src={appSettings.soundTvOff} autostart="false" preload="auto"/>}
        {appSettings.soundDiscIn && <audio id="audio_disc_in" src={appSettings.soundDiscIn} autostart="false" preload="auto"/>}
        {appSettings.soundDiscOut && <audio id="audio_disc_out" src={appSettings.soundDiscOut} autostart="false" preload="auto"/>}
        {appSettings.soundVHSIn && <audio id="audio_vhs_tape_in" src={appSettings.soundVHSIn} autostart="false" preload="auto"/>}
        {appSettings.soundVHSOut && <audio id="audio_vhs_tape_out" src={appSettings.soundVHSOut} autostart="false" preload="auto"/>}
        {appSettings.soundVHSOutNoTape && <audio id="audio_vhs_eject_notape" src={appSettings.soundVHSOutNoTape} autostart="false" preload="auto"/>}
        {appSettings.soundVHSRewind && <audio id="audio_vhs_rewind" src={appSettings.soundVHSRewind} autostart="false" preload="auto" />}
      </div>
      
      {appSettings.showRemote ?
         <Remote containerWidth={containerWidth} containerHeight={containerHeight} onClickPowerButton={onClickPowerButton} onClickChannelButton={onClickChannelButton} onClickDecreaseVolume={onClickDecreaseVolume} onClickIncreaseVolume={onClickIncreaseVolume} onClickPlayPause={onClickPlayPause} onClickInputButton={onClickInputButton} onClickRewind={onClickRewind} onClickForward={onClickForward} />
         : null
      }

      <div className={`inputObjectOutWrapper`}
          style={{
          top: appSettings.inputObjectOutTop,
          left: appSettings.inputObjectOutLeft,
          width: containerHeight * appSettings.inputObjectSize * 6.5,
          height: containerHeight * appSettings.inputObjectSize,
      }}>
          <div className={`inputObjectOut ${showInputObject ? "visible" : "hidden"}`}
            style={{
            top: "0%",
            left: "50%",
            width: "100%",
            height: "100%",
            "--background-image": `url("${appSettings.inputOutImage}")`,
            }}
            onClick={onClickInput}
          ></div>
      </div>

    </div>);
});

export default MainScreen;