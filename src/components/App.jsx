import { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/app.scss';

import { DEFAULT_APP_SETTINGS, SKIN_SETTINGS_STANDARD, SKIN_SETTINGS_RETRO, SKIN_SETTINGS_RETRO_REMOTE, ESCAPP_CLIENT_SETTINGS, MAIN_SCREEN } from '../constants/constants.jsx';
import MainScreen from './MainScreen.jsx';

export default function App() {
  const { escapp, setEscapp, appSettings, setAppSettings, Storage, setStorage, Utils, I18n } = useContext(GlobalContext);
  const hasExecutedEscappValidation = useRef(false);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(MAIN_SCREEN);
  const prevScreen = useRef(screen);
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
    let _appSettings = processAppSettings(_escapp.getAppSettings());
    setAppSettings(_appSettings);
    Utils.log("App settings:", _appSettings);
  }, []);

  function processAppSettings(_appSettings) {
    if (typeof _appSettings !== "object") {
      _appSettings = {};
    }
    if ((typeof _appSettings.skin === "undefined") && (typeof DEFAULT_APP_SETTINGS.skin === "string")) {
      _appSettings.skin = DEFAULT_APP_SETTINGS.skin;
    }

    let skinSettings;
    switch (_appSettings.skin) {
      case "STANDARD":
        skinSettings = SKIN_SETTINGS_STANDARD;
        break;
      case "RETRO":
        skinSettings = SKIN_SETTINGS_RETRO;
        break;
      case "RETRO_REMOTE":
        skinSettings = SKIN_SETTINGS_RETRO_REMOTE;
        break;
      default:
        skinSettings = {};
    }
    let DEFAULT_APP_SETTINGS_SKIN = Utils.deepMerge(DEFAULT_APP_SETTINGS, skinSettings);

    // Merge _appSettings with DEFAULT_APP_SETTINGS_SKIN to obtain final app settings
    _appSettings = Utils.deepMerge(DEFAULT_APP_SETTINGS_SKIN, _appSettings);

    const allowedActions = ["NONE", "SHOW_MESSAGE"];
    if (!allowedActions.includes(_appSettings.actionAfterSolve)) {
      _appSettings.actionAfterSolve = DEFAULT_APP_SETTINGS.actionAfterSolve;
    }

    if(typeof _appSettings.defaultChannelVideo.type === "undefined"){
      let defaultChannelVideoType = _getVideoTypeForChannel(_appSettings.defaultChannelVideo);
      if(defaultChannelVideoType !== null){
        _appSettings.defaultChannelVideo.type = defaultChannelVideoType;
      }
    }

    _appSettings.channelsHash = {};
    if(_appSettings.channels instanceof Array){
      _appSettings.channelsHash = _appSettings.channels.reduce((acc, channel) => {
        let validatedChannel = _validateChannel(channel);
        if(typeof validatedChannel !== "undefined"){
          acc[channel.id] = validatedChannel;
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

    if (typeof _appSettings.delayMessage === "number") {
      _appSettings.delayMessageNumber = _appSettings.delayMessage;
    } else {
      _appSettings.delayMessageNumber = parseFloat(_appSettings.delayMessage);
    }
    _appSettings.delayMessageNumber = 1000*_appSettings.delayMessageNumber; //Convert delay to ms

    _appSettings.vhs = _appSettings.enableInput && _appSettings.skin === "RETRO_REMOTE";

    if(_appSettings.vhs){
      _appSettings.backgroundTV = _appSettings.backgroundTV_VHS;
    }

    //Init internacionalization module
    I18n.init(_appSettings);

    if(_appSettings.vhs){
      _appSettings.messageNoInput = I18n.getTrans("i.noVideoTape");
    } else {
      _appSettings.messageNoInput = I18n.getTrans("i.noDisc");
    }

    //Change HTTP protocol to HTTPs in URLs if necessary
    _appSettings = Utils.checkUrlProtocols(_appSettings);

    //Preload resources (if necessary)
    Utils.preloadImages([_appSettings.backgroundMessage]);
    //Utils.preloadAudios([_appSettings.soundBeep,_appSettings.soundNok,_appSettings.soundOk]); //Preload done through HTML audio tags
    //Utils.preloadVideos(["videos/some_video.mp4"]);

    return _appSettings;
  }

  function _validateChannel(channel,ignoreId=false){
    let validatedChannel;
    if(((typeof channel === "object")&&(typeof channel.id === "string")&&(/^\d+$/.test(channel.id)))||(ignoreId)){
      if (typeof channel.src === "string"){
        validatedChannel = {src: channel.src};
        let channelVideoType = _getVideoTypeForChannel(channel);
        if(channelVideoType !== null){
          validatedChannel.type = channelVideoType;
        }
      } else if (typeof channel.message === "string"){
          validatedChannel = {message: channel.message};
      }
    }
    return validatedChannel;
  }

  function _getVideoTypeForChannel(channel){
    if((typeof channel.type === "string")&&(html5VideoTypes.includes(channel.type))){
      return channel.type;
    } else {
      return _getVideoTypeFromSource(channel.src);
    }
  }

  function _getVideoTypeFromSource(source) {
    if (typeof source !== "string") return null;
    const extension = source.split('.').pop().toLowerCase();
    const html5VideoTypes = {
      mp4: "video/mp4",
      webm: "video/webm",
      ogg: "video/ogg",
      ogv: "video/ogg"
    };
    return html5VideoTypes[extension] || null;
  }

  useEffect(() => {
    if (!hasExecutedEscappValidation.current && escapp !== null && appSettings !== null && Storage !== null) {
      hasExecutedEscappValidation.current = true;

      //Register callbacks in Escapp client and validate user.
      escapp.registerCallback("onNewErStateCallback", function (erState) {
        try {
          Utils.log("New escape room state received from ESCAPP", erState);
          restoreAppState(erState);
        } catch (e) {
          Utils.log("Error in onNewErStateCallback", e);
        }
      });

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

      const aspectRatio = 16 / 9;
      let width = windowWidth * contentPercentage;
      let height = width / aspectRatio;

      if (height > windowHeight * contentPercentage) {
        height = windowHeight * contentPercentage;
        width = height * aspectRatio;
      }

      setSize({ width, height });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function restoreAppState(erState) {
    Utils.log("Restore application state based on escape room state:", erState);
    if (escapp.getAllPuzzlesSolved()) {
      //Puzzle already solved
    } else {
      //Puzzle not solved. Restore app state based on local storage.
      restoreAppStateFromLocalStorage();
    }
  }

  function restoreAppStateFromLocalStorage() {
    if (typeof Storage !== "undefined") {
      let stateToRestore = Storage.getSetting("state");
      if (stateToRestore) {
        Utils.log("Restore app state", stateToRestore);
        setScreen(stateToRestore.screen);
        if (typeof stateToRestore.solution === "string") {
          solution.current = stateToRestore.solution;
        }
      }
    }
  }

  function saveAppState() {
    if (typeof Storage !== "undefined") {
      let currentAppState = { screen: screen };
      Utils.log("Save app state in local storage", currentAppState);
      Storage.saveSetting("state", currentAppState);
    }
  }

  function onPuzzleSolved(_solution) {
    Utils.log("onPuzzleSolved with solution:", _solution);
    if (typeof _solution !== "string") {
      return;
    }
    solution.current = _solution;

    switch (appSettings.actionAfterSolve) {
      case "SHOW_MESSAGE":
        //TO DO
        return;
      case "NONE":
      default:
        return submitPuzzleSolution();
    }
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
      content: <MainScreen size={size} onPuzzleSolved={onPuzzleSolved} />
    }
  ];

return (
    <div id="global_wrapper"
      className={`
        ${(appSettings !== null && typeof appSettings.skin === "string")
          ? appSettings.skin.toLowerCase()
          : ''
        }
        ${appSettings?.enableInput ? 'input_enabled' : 'input_disabled'}
      `}
    >
      {renderScreens(screens)}
    </div>
  )
}