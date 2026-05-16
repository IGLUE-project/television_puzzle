export const DEFAULT_APP_SETTINGS = {
  //Authors settings
  skin: "RETRO_REMOTE",
  actionAfterSolve: "PLAY_VIDEO",
  delayMessage: "3",
  enableLoopForChannels: "TRUE",
  initialVolume: "0.5",
  enableInput: "TRUE",
  inputInitialState: "OUT",
  enableRewindAndForward: "TRUE",
  keepState: "TRUE",
  maxChannelLength: "8",
  videoContainerPadding: "0",

  //Internal
  showRemote: "TRUE",
  rewindFactor: 0.4,
};

export const SKIN_SETTINGS_STANDARD = {
  //Authors settings
  fuzzyScreen: "FALSE",
  //Images
  background: "images/standard/background.png",
  backgroundTV: "images/standard/background_TV.png",
  backgroundRemote: "images/standard/background_remote.png",
  backgroundButton: "images/standard/background_button.png",
  backgroundPowerButton: "images/standard/background_power_button.png",
  backgroundButtonTv: "images/standard/background_button_tv.png",
  inputOutImage: "images/standard/disc_out.png",
  inputOutImageHover: "images/standard/disc_out.png",

  //Videos
  defaultChannelVideo: {
    src: "videos/TV_NoSignal_16_9.mp4"
  },
  //Sounds
  soundRemoteButton: "sounds/tv_remote_click.mp3",
  soundTvOn: "sounds/smart_tv_on.wav",
  soundTvOff: "sounds/smart_tv_off.mp3",
  soundDiscIn: "sounds/disc_in.wav",
  soundDiscOut: "sounds/disc_out.wav",
  //UI
  buttonFontSize: "5vmin", 
  buttonTextColor: "#000000",
  buttonTvWidth: 0.035,
  buttonTvHeight: 0.05,
  //TV screen
  tvScreenHeight: "65%",
  tvScreenMarginBottom: "12.5%",
  //Header
  tvHeaderFontSize: "5vmin",
  //Volume
  volumeFontSize: 0.07,
  volumeBarColor: "white",
  volumeColor: "white",
  //Message
  messageFontSize: "0.05",
  //Remote
  remoteBottom: "-63%",
  remoteHeight: 0.75,
  remoteWidth: 0.17,
  remoteButtonsTop: ["10%", "20%", "30%", "40%", "50%", "62%", "70%"],
  remoteButtonsLeft: "50%",
  remoteButtonWidth: 0.085, 
  remoteButtonHeight: 0.065,
  remoteButtonSize: "5vmin", 
  remoteButtonColor: "#000000",
  remoteButtonsInput: true,
  //Input
  inputObjectOutTop: "79.6%",
  inputObjectSize: 0.043,
};

export const SKIN_SETTINGS_RETRO_REMOTE = {
  //Authors settings
  fuzzyScreen: "TRUE",
  //Images
  background: "images/retro_remote/background.png",
  backgroundTV: "images/retro_remote/background_TV.png",
  backgroundTV_VHS: "images/retro_remote/background_TV_vhs.png",
  backgroundRemote: "images/retro_remote/background_remote.png",
  backgroundButton: "images/retro_remote/background_button.png",
  backgroundPowerButton: "images/retro_remote/background_power_button.png",
  backgroundButtonTv: "images/retro_remote/background_button_tv.png",
  inputOutImage: "images/retro_remote/vhs_out.png",
  inputOutImageHover: "images/retro_remote/vhs_out_hover.png",
  //Videos
  defaultChannelVideo: {
    src: "videos/TV_Noise_16-9.mp4" 
  },
  //Sounds
  soundRemoteButton: "sounds/tv_remote_click.mp3",
  soundTvOn: "sounds/retro_tv_on.wav",
  soundTvOff: "sounds/retro_tv_off.wav",
  soundVHSIn: "sounds/vhs_tape_in.wav",
  soundVHSOut: "sounds/vhs_tape_out.wav",
  soundVHSOutNoTape: "sounds/vhs_eject_notape.mp3",
  soundVHSRewind: "sounds/vhs_tape_rewind.wav",
  //UI
  buttonFontSize: "5vmin", 
  buttonTextColor: "#000000",
  buttonTvWidth: 0.09,
  buttonTvHeight: 0.1,
  //TV screen
  tvScreenHeight: "56%",
  tvScreenMarginBottom: "14%",
  //Header
  tvHeaderFontSize: "6vmin",
  //Volume
  volumeFontSize: 0.07,
  volumeBarColor: "rgba(15, 167, 15, 0.76)", // Color of the volume bar
  volumeColor: "rgb(15, 167, 15)", // Color of the volume text
  //Message
  messageFontSize: "0.05",
  //Remote
  remoteBottom: "-65%",
  remoteHeight: 0.98,
  remoteWidth: 0.25,
  remoteButtonsTop: ["10%", "20%", "30%", "40%", "50%", "62%", "70%"],
  remoteButtonsLeft: "50%",
  remoteButtonWidth: 0.09, 
  remoteButtonHeight: 0.07,
  remoteButtonSize: "6vmin", 
  remoteButtonColor: "#000000",
  remoteButtonsInput: true,
  //Input
  inputObjectOutTop: "72.3%",
  inputObjectSize: 0.135,
};

export const SKIN_SETTINGS_RETRO = {
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";