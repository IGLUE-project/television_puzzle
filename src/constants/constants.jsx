export const DEFAULT_APP_SETTINGS = {
  //Authors settings
  skin: "RETRO_REMOTE",
  actionAfterSolve: "PLAY_VIDEO",
  delayMessage: "3",
  enableLoopForChannels: true,
  initialVolume: 0.5,
  enableInput: true,
  enableRewindAndForward: true,
  keepState: true,
  maxChannelLength: 8,
  videoContainerPadding: 0,

  //Internal
  showRemote: true,
  rewindFactor: 0.4,
};

export const SKIN_SETTINGS_RETRO_REMOTE = {
  //Authors settings
  fuzzyScreen: true,
  //Images
  background: "images/retro_remote/background.png",
  backgroundTV: "images/retro_remote/background_TV.png",
  backgroundTV_VHS: "images/retro_remote/background_TV_vhs.png",
  backgroundRemote: "images/retro_remote/background_remote.png",
  backgroundButton: "images/retro_remote/background_button.png",
  backgroundPowerButton: "images/retro_remote/background_power_button.png",
  backgroundButtonTv: "images/retro_remote/background_button_tv.png",
  vhsOut: "images/retro_remote/vhs_out.png",
  vhsOutHover: "images/retro_remote/vhs_out_hover.png",
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
  remoteWidth: 0.25,
  remoteButtonsTop: ["10%", "20%", "30%", "40%", "50%", "62%", "70%"],
  remoteButtonsLeft: "50%",
  remoteButtonWidth: 0.09, 
  remoteButtonHeight: 0.07,
  remoteButtonSize: "6vmin", 
  remoteButtonColor: "#000000",
  remoteButtonsInput: true,
  //VHS
  vhsTop: "72.3%",
  vhsSize: 0.135,
};

export const SKIN_SETTINGS_RETRO = {
};

export const SKIN_SETTINGS_STANDARD = {
  //Sounds
  soundDiscIn: "sounds/disc_in.wav",
  soundDiscOut: "sounds/disc_out.wav",
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";