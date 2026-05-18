import { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/app.scss';

import { DEFAULT_APP_SETTINGS, SKIN_SETTINGS_STANDARD, SKIN_SETTINGS_STANDARD_43, SKIN_SETTINGS_RETRO, SKIN_SETTINGS_RETRO_43, SKIN_SETTINGS_RETRO_REMOTE, SKIN_SETTINGS_RETRO_REMOTE_43, ESCAPP_CLIENT_SETTINGS, MAIN_SCREEN } from '../constants/constants.jsx';
import MainScreen from './MainScreen.jsx';

export default function App() {
  const { escapp, setEscapp, appSettings, setAppSettings, Storage, setStorage, Utils, I18n } = useContext(GlobalContext);
  const mainScreenRef = useRef(null);
  const storageRef = useRef(null);
  const appSettingsRef = useRef(null);
  const hasExecutedEscappValidation = useRef(false);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(MAIN_SCREEN);
  const [appState, setAppState] = useState({});
  const solution = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const html5VideoTypes = {
    mp4: "video/mp4",
    webm: "video/webm",
    ogg: "video/ogg",
    ogv: "video/ogg"
  };

  useEffect(() => {
    //Init Escapp client
    if (escapp !== null) {
      return;
    }
    //Create the Escapp client instance.
    let _escapp = new ESCAPP(ESCAPP_CLIENT_SETTINGS);
    setEscapp(_escapp);
    Utils.log("Escapp client initiated with settings:", _escapp.getSettings());

    //Use the storage feature provided by Escapp client.
    setStorage(_escapp.getStorage());

    //Get app settings provided by the Escapp server.
    let _appSettings = processAppSettings(_escapp.getAppSettings(),_escapp.getSettings());
    setAppSettings(_appSettings);
    Utils.log("App settings:", _appSettings);
  }, []);

  function processAppSettings(_appSettings,_escappSettings){
    if (!_appSettings || typeof _appSettings !== "object"){
      _appSettings = {};
    }
    if ((typeof _appSettings.skin === "undefined") && (typeof DEFAULT_APP_SETTINGS.skin === "string")) {
      _appSettings.skin = DEFAULT_APP_SETTINGS.skin;
    }

    let skinSettings;
    let skinSettings43;
    switch (_appSettings.skin) {
      case "RETRO":
        skinSettings = SKIN_SETTINGS_RETRO;
        skinSettings43 = SKIN_SETTINGS_RETRO_43;
        break;
      case "RETRO_REMOTE":
        skinSettings = SKIN_SETTINGS_RETRO_REMOTE;
        skinSettings43 = SKIN_SETTINGS_RETRO_REMOTE_43;
        break;
      case "STANDARD":
      default:
        _appSettings.skin = "STANDARD";
        skinSettings = SKIN_SETTINGS_STANDARD;
        skinSettings43 = SKIN_SETTINGS_STANDARD_43;
    }
    let DEFAULT_APP_SETTINGS_SKIN = Utils.deepMerge(DEFAULT_APP_SETTINGS, skinSettings);

    // Merge _appSettings with DEFAULT_APP_SETTINGS_SKIN to obtain final app settings
    let _appSettingsUnmerged = JSON.parse(JSON.stringify(_appSettings));
    _appSettings = Utils.deepMerge(DEFAULT_APP_SETTINGS_SKIN, _appSettings);

    // Check the aspect ratio and include specific settings for it if necessary
    const allowedAspectRatio = ["16/9", "4/3"];
    if (!allowedAspectRatio.includes(_appSettings.aspectRatio)) {
      _appSettings.aspectRatio = "16/9";
    }

    if((_appSettings.aspectRatio === "4/3")&&(typeof skinSettings43 !== "undefined")){
      //Apply specific default settings for aspect ratio 4/3
      let DEFAULT_APP_SETTINGS_SKIN43 = Utils.deepMerge(DEFAULT_APP_SETTINGS_SKIN, skinSettings43);
      _appSettingsUnmerged.aspectRatio = _appSettings.aspectRatio;
      _appSettings = Utils.deepMerge(DEFAULT_APP_SETTINGS_SKIN43, _appSettingsUnmerged);
    }

    if(_appSettings.aspectRatio === "16/9"){
      _appSettings.aspectRatioNumber = 16/9;
    } else {
      _appSettings.aspectRatioNumber = 4/3;
    }

    if(typeof _appSettings.tvScreenHeight === "number"){
      _appSettings.tvScreenHeight = (_appSettings.tvScreenHeight/100);
    }

    _appSettings.noLinkedPuzzles = (!_escappSettings.linkedPuzzleIds || _escappSettings.linkedPuzzleIds.length === 0);

    const allowedActions = ["NONE", "SHOW_MESSAGE", "PLAY_VIDEO"];
    if (!allowedActions.includes(_appSettings.actionAfterSolve)) {
      _appSettings.actionAfterSolve = "PLAY_VIDEO";
    }

    if (typeof _appSettings.delayMessage === "number") {
      _appSettings.delayMessageNumber = _appSettings.delayMessage;
    } else {
      _appSettings.delayMessageNumber = parseFloat(_appSettings.delayMessage);
    }
    _appSettings.delayMessageNumber = 1000*_appSettings.delayMessageNumber; //Convert delay to ms

    let parsedMessageFontSize = Utils.parseNumberFromSetting(_appSettings.messageFontSize);
    if(parsedMessageFontSize === null){
      _appSettings.messageFontSize = DEFAULT_APP_SETTINGS_SKIN.messageFontSize;
    }
    let parsedTvFontSize = Utils.parseNumberFromSetting(_appSettings.tvFontSize);
    if(parsedTvFontSize === null){
      _appSettings.tvFontSize = DEFAULT_APP_SETTINGS_SKIN.tvFontSize;
    }

    _appSettings.enableLoopForChannels = (_appSettings.enableLoopForChannels !== "FALSE");
    _appSettings.keepState = (_appSettings.keepState !== "FALSE");
    _appSettings.fuzzyScreen = (_appSettings.fuzzyScreen !== "FALSE");

    //Input
    let allowedInputTypes;
    let ejectableInput = "NONE";
    let onClickInputTimeout = 0;
    switch (_appSettings.skin) {
      case "STANDARD":
        allowedInputTypes = ["NONE", "INTERNAL", "DISC"];
        ejectableInput = "DISC";
        onClickInputTimeout = 2000;
        break;
      case "RETRO":
      case "RETRO_REMOTE":
        allowedInputTypes = ["NONE", "VHS"];
        ejectableInput = "VHS";
        onClickInputTimeout = 2000;
        break;
      default:
        allowedInputTypes = ["NONE", "INTERNAL"];
    }
    if (!allowedInputTypes.includes(_appSettings.inputType)) {
      _appSettings.inputType = "NONE";
    }
    _appSettings.inputEnabled = (_appSettings.inputType !== "NONE");
    _appSettings.ejectableInput = ejectableInput;
    _appSettings.onClickInputTimeout = onClickInputTimeout;
    
    _appSettings.disc = (_appSettings.inputType === "DISC");
    _appSettings.vhs = (_appSettings.inputType === "VHS");
    _appSettings.showInputObject = (_appSettings.disc || _appSettings.vhs);
    _appSettings.ejectEnabled = (_appSettings.disc || _appSettings.vhs);

    if(_appSettings.ejectEnabled){
      const allowedInputInitialStates = ["IN", "OUT"];
      if (!allowedInputInitialStates.includes(_appSettings.inputInitialState)) {
        _appSettings.inputInitialState = "OUT";
      }
      if(_appSettings.inputInitialState === "IN"){
        _appSettings.inputInitialState = "paused";
      } else {
        _appSettings.inputInitialState = "out";
      }
    } else {
      if(_appSettings.inputType === "INTERNAL"){
        _appSettings.inputInitialState = "paused";
      } else {
        _appSettings.inputInitialState = "out";
      }
    }

    if(_appSettings.inputPlayerInitialState){
      const allowedInputPlayerInitialState = ["ON", "OFF"];
      if (!allowedInputPlayerInitialState.includes(_appSettings.inputPlayerInitialState)) {
        _appSettings.inputPlayerInitialState = "on";
      } else {
        _appSettings.inputPlayerInitialState = _appSettings.inputPlayerInitialState.toLowerCase();
      }
    } else {
      _appSettings.inputPlayerInitialState = "on";
    }

    _appSettings.enableRewindAndForward = (_appSettings.enableRewindAndForward !== "FALSE");

    let initialVolume = Utils.parseNumberFromSetting(_appSettings.initialVolume);
    if(initialVolume === null){
      initialVolume = 50;
    }
    _appSettings.initialVolumeNumber = Math.min(1,Math.max(0,initialVolume/100));

    if (typeof _appSettings.maxChannelLength === "number") {
      _appSettings.maxChannelLengthNumber = _appSettings.maxChannelLength;
    } else {
      _appSettings.maxChannelLengthNumber = parseInt(_appSettings.maxChannelLength, 10);
    }

    let parsedVideoContainerPaddingTop = Utils.parseNumberFromSetting(_appSettings.videoContainerPaddingTop);
    if(parsedVideoContainerPaddingTop === null){
      parsedVideoContainerPaddingTop = 0;
    }
    let parsedVideoContainerPaddingRight = Utils.parseNumberFromSetting(_appSettings.videoContainerPaddingRight);
    if(parsedVideoContainerPaddingRight === null){
      parsedVideoContainerPaddingRight = 0;
    }
    let parsedVideoContainerPaddingBottom = Utils.parseNumberFromSetting(_appSettings.videoContainerPaddingBottom);
    if(parsedVideoContainerPaddingBottom === null){
      parsedVideoContainerPaddingBottom = 0;
    }
    let parsedVideoContainerPaddingLeft = Utils.parseNumberFromSetting(_appSettings.videoContainerPaddingLeft);
    if(parsedVideoContainerPaddingLeft === null){
      parsedVideoContainerPaddingLeft = 0;
    }
    _appSettings.videoContainerPadding =  parsedVideoContainerPaddingTop + "% " + parsedVideoContainerPaddingRight + "% " + parsedVideoContainerPaddingBottom + "% " + parsedVideoContainerPaddingLeft + "%";

    if(!_appSettings.backgroundTVInputOut){
      _appSettings.backgroundTVInputOut = _appSettings.backgroundTV;
    }
    //CSS vars
    _appSettings.backgroundTVCSSVar = Utils.parseImagePathForCSSVar(_appSettings.backgroundTV);
    _appSettings.backgroundTVInputOutCSSVar = Utils.parseImagePathForCSSVar(_appSettings.backgroundTVInputOut);
    _appSettings.inputOutImageCSSVar = Utils.parseImagePathForCSSVar(_appSettings.inputOutImage);

    if((typeof _appSettingsUnmerged.defaultChannelContent !== "undefined")&&(typeof _appSettingsUnmerged.defaultChannelContent.message === "string")&&(typeof _appSettingsUnmerged.defaultChannelContent.src !== "string")){
      if((typeof _appSettings.defaultChannelContent !== "undefined")&&(typeof _appSettings.defaultChannelContent.message === "string")){
        //Remove default src to enable custom message
        delete _appSettings.defaultChannelContent.src;
        delete _appSettings.defaultChannelContent.type;
      }
    }

    if((typeof _appSettingsUnmerged.inputChannel !== "undefined")&&(typeof _appSettingsUnmerged.inputChannel.message === "string")&&(typeof _appSettingsUnmerged.inputChannel.src !== "string")){
      if((typeof _appSettings.inputChannel !== "undefined")&&(typeof _appSettings.inputChannel.message === "string")){
        //Remove default src to enable custom message
        delete _appSettings.inputChannel.src;
        delete _appSettings.inputChannel.type;
      }
    }

    if((typeof _appSettings.defaultChannelContent !== "undefined")&&(typeof _appSettings.defaultChannelContent.src === "string")){
      if(typeof _appSettings.defaultChannelContent.type === "undefined"){
        let defaultChannelVideoType = _getVideoTypeForChannel(_appSettings.defaultChannelContent);
        if(defaultChannelVideoType !== null){
          _appSettings.defaultChannelContent.type = defaultChannelVideoType;
        }
      }
    }

    _appSettings.channelsHash = {};
    if(_appSettings.channels instanceof Array){
      _appSettings.channelsHash = _appSettings.channels.reduce((acc, channel) => {
        let validatedChannel = _validateChannel(channel);
        if(typeof validatedChannel !== "undefined"){
          const parsedChannelId = Utils.parseChannelId(channel.id);
          acc[parsedChannelId] = validatedChannel;
        }
        return acc;
      }, {});
    }

    if(typeof _appSettings.inputChannel === "object"){
      _appSettings.inputChannel.id = "input";
    }
    let validatedInputChannel = _validateChannel(_appSettings.inputChannel,true);
    if(typeof validatedInputChannel !== "undefined"){
      _appSettings.channelsHash["input"] = validatedInputChannel;
    }

    //Init internacionalization module
    I18n.init(_appSettings);

    if(_appSettings.skin === "STANDARD"){
      _appSettings.delayForSelectChannel = 2000;
      _appSettings.delayAfterSelectChannel = 0;
      _appSettings.canShowCursor = false;
      _appSettings.messageNoInput = I18n.getTrans("i.noDisc");
    } else {
      //RETRO
      _appSettings.delayForSelectChannel = 2500;
      _appSettings.delayAfterSelectChannel = 800;
      _appSettings.canShowCursor = true;
      _appSettings.messageNoInput = I18n.getTrans("i.noVideoTape");
    }

    //Change HTTP protocol to HTTPs in URLs if necessary
    _appSettings = Utils.checkUrlProtocols(_appSettings);

    //Preload resources (if necessary)
    Utils.preloadImages([_appSettings.backgroundTV, _appSettings.backgroundTVInputOut, _appSettings.inputOutImage]);
    //Utils.preloadAudios([_appSettings.soundBeep,_appSettings.soundNok,_appSettings.soundOk]); //Preload done through HTML audio tags
    //Utils.preloadVideos(["videos/some_video.mp4"]);

    return _appSettings;
  }

  function _validateChannel(channel, ignoreId = false) {
    if (!channel || typeof channel !== "object") return;
    const parsedId = Utils.parseChannelId(channel.id);
    if (!ignoreId && typeof parsedId === "undefined") return;

    let validatedChannel;
    if (typeof channel.src === "string" && channel.src.trim() !== "") {
      validatedChannel = { src: channel.src };
      let channelVideoType = _getVideoTypeForChannel(channel);
      if (channelVideoType !== null) {
        validatedChannel.type = channelVideoType;
      }
    } else if (typeof channel.message === "string" && channel.message.trim() !== "") {
      validatedChannel = { message: channel.message };
    }

    return validatedChannel;
  }

  function _getVideoTypeForChannel(channel){
    if((typeof channel.type === "string")&&(Object.values(html5VideoTypes).includes(channel.type))){
      return channel.type;
    } else {
      return _getVideoTypeFromSource(channel.src);
    }
  }

  function _getVideoTypeFromSource(source) {
    if (typeof source !== "string") return null;
    const cleanSource = source.split('?')[0].split('#')[0];
    const extension = cleanSource.split('.').pop().toLowerCase();
    return html5VideoTypes[extension] || null;
  }

  useEffect(() => {
    if (!hasExecutedEscappValidation.current && escapp !== null && appSettings !== null && Storage !== null) {
      hasExecutedEscappValidation.current = true;
      storageRef.current = Storage;

      //Register callbacks in Escapp client and validate user.
      // escapp.registerCallback("onNewErStateCallback", function (erState) {
      //   try {
      //     Utils.log("New escape room state received from ESCAPP", erState);
      //     //restoreAppState(erState);
      //   } catch (e) {
      //     Utils.log("Error in onNewErStateCallback", e);
      //   }
      // });

      escapp.registerCallback("onErRestartCallback", function (erState) {
        try {
          Utils.log("Escape Room has been restarted.", erState);
          if (typeof Storage !== "undefined") {
            Storage.removeSetting("state");
          }
        } catch (e) {
          Utils.log("Error in onErRestartCallback", e);
        }
      });

      //Validate user. To be valid, a user must be authenticated and a participant of the escape room.
      escapp.validate((success, erState) => {
        try {
          Utils.log("ESCAPP validation", success, erState);
          if (success) {
            restoreAppState(erState);
            setLoading(false);
          }
        } catch (e) {
          Utils.log("Error in validate callback", e);
        }
      });
    }
  }, [escapp, appSettings, Storage]);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let contentPercentage = 1;
      const aspectRatio = 16/9;
      let width = windowWidth * contentPercentage;
      let height = width / aspectRatio;

      if (height > windowHeight * contentPercentage) {
        height = windowHeight * contentPercentage;
        width = height * aspectRatio;
      }

      setSize({ width, height });
    };
    const handlePageHide = () => {
      saveAppState();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pagehide", handlePageHide);
    };

  }, []);

  useEffect(() => {
    appSettingsRef.current = appSettings;
  }, [appSettings]);

  function restoreAppState(erState) {
    restoreAppStateFromLocalStorage(erState);
  }

  function restoreAppStateFromLocalStorage(erState) {
    if (appSettings.keepState!==true) return;
    if (typeof Storage === "undefined") return;
    let stateToRestore = Storage.getSetting("state");
    if (stateToRestore) {
      if(stateToRestore.skin !== appSettingsRef.current.skin){
        Storage.removeSetting("state");
        return;
      }
      Utils.log("Restore app state", stateToRestore);
      setAppState(stateToRestore);
    }
  }

  function saveAppState() {
    if (appSettingsRef.current?.keepState !== true) return;
    if (!storageRef.current) return;
    const currentAppState = mainScreenRef.current?.getState?.();
    if (!currentAppState) return;

    Utils.log("Save app state in local storage", currentAppState);
    storageRef.current.saveSetting("state", currentAppState);
  }

  function onPuzzleSolved(_solution) {
    Utils.log("onPuzzleSolved with solution:", _solution);
    if (typeof _solution !== "string") {
      return;
    }
    solution.current = _solution;
    submitPuzzleSolution();
  }

  function submitPuzzleSolution() {
    Utils.log("Submit puzzle solution", solution.current);

    escapp.submitNextPuzzle(solution.current, {}, (success, erState) => {
      if (!success) {
        setScreen(MAIN_SCREEN);
      }
      Utils.log("Solution submitted to Escapp", solution.current, success, erState);
    });
  }

  const renderScreens = (screens) => {
    if (loading === true) {
      return null;
    } else {
      return (
        <>
          {screens.map(({ id, content }) => renderScreen(id, content))}
        </>
      );
    }
  };

  const renderScreen = (screenId, screenContent) => (
    <div key={screenId} className={`screen_wrapper ${screen === screenId ? 'active' : ''}`} >
      {screenContent}
    </div>
  );

  let screens = [
    {
      id: MAIN_SCREEN,
      content: <MainScreen ref={mainScreenRef} appState={appState} saveAppState={saveAppState} size={size} onPuzzleSolved={onPuzzleSolved} />
    }
  ];

return (
    <div id="global_wrapper"
      className={`
        ${(appSettings !== null && typeof appSettings.skin === "string") ? appSettings.skin.toLowerCase() : ''}
        ${appSettings?.inputEnabled ? 'input_enabled' : 'input_disabled'}
      `}
      data-aspect-ratio={appSettings?.aspectRatio || ''}
    >
      {renderScreens(screens)}
    </div>
  )
}