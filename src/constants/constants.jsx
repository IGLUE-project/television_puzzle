export const DEFAULT_APP_SETTINGS = {
  //Authors settings
  skin: "STANDARD",
  aspectRatio: "16/9",
  actionAfterSolve: "PLAY_VIDEO",
  delayMessage: "3",
  enableLoopForChannels: "TRUE",
  initialVolume: "0.5",
  inputType: "NONE",
  inputInitialState: "OUT",
  inputPlayerInitialState: "TRUE",
  enableRewindAndForward: "TRUE",
  keepState: "TRUE",
  maxChannelLength: "8",
  videoContainerPaddingTop: "0",
  videoContainerPaddingRight: "0",
  videoContainerPaddingBottom: "0",
  videoContainerPaddingLeft: "0",

  //Internal
  rewindFactor: 0.4,
};

export const SKIN_SETTINGS_STANDARD = {
  //Authors settings
  fuzzyScreen: "FALSE",
  inputType: "DISC",
  inputInitialState: "OUT",
  messageFontSize: "9",
  messageFontColor: "white",
  //Internal
  showRemote: true,
  showTvPanel: false,
  showVideoPanel: false,
  //Images
  background: "images/standard/background.png",
  backgroundTV: "images/standard/background_TV_16_9.png",
  backgroundRemote: "images/standard/background_remote.png",
  backgroundButtonRemote: "images/standard/background_button_remote.png",
  backgroundPowerButton: "images/standard/background_power_button.png",
  backgroundEjectButton: "images/standard/background_eject_button.png",
  inputOutImage: "images/standard/disc_out.png",

  //Videos
  defaultChannelContent: {
    src: "videos/TV_NoSignal_16_9.mp4"
  },
  inputChannel: {
    src: "videos/TV_BlackScreen_16_9.mp4"
  },
  //Sounds
  soundRemoteButton: "sounds/tv_remote_click.mp3",
  soundTvOn: "sounds/smart_tv_on.wav",
  soundTvOff: "sounds/smart_tv_off.mp3",
  soundDiscIn: "sounds/disc_in.wav",
  soundDiscOut: "sounds/disc_out.wav",
  //TV screen
  containerSize: 1,
  tvScreenHeight: 64.7,
  tvScreenMarginLeft: 0.1,
  tvScreenMarginBottom: 12.4,
  //Header
  tvHeaderFontSize: "5vmin",
  //Volume
  volumeFontSize: 0.07,
  volumeBarColor: "white",
  volumeColor: "white",
  //Font
  tvFontSize: "9",
  tvFontColor: "white",
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
  remoteButtonFontSize: "5vmin", 
  remoteButtonTextColor: "#000000",
  remoteButtonsInput: true,
  //Input
  inputObjectOutTop: "79.6%",
  inputObjectOutLeft: "50.0%",
  inputObjectSize: 0.043,
  //Eject button
  ejectButtonFontSize: "3vmin", 
  ejectButtonTextColor: "#000000",
  ejectButtonTvWidth: 0.035,
  ejectButtonTvHeight: 0.05,
};

export const SKIN_SETTINGS_STANDARD_43 = {
  tvScreenMarginLeft: 0.1,
  tvScreenMarginBottom: 12.5,
  backgroundTV: "images/standard/background_TV_4_3.png",
  inputObjectSize: 0.034,
  messageFontSize: "8",
  tvFontSize: "8",
  tvHeaderFontSize: "4.7vmin",
  ejectButtonTvWidth: 0.033,
  ejectButtonTvHeight: 0.045,
  defaultChannelContent: {
    src: "videos/TV_NoSignal_4_3.mp4" 
  },
  inputChannel: {
    src: "videos/TV_BlackScreen_4_3.mp4"
  },
}

export const SKIN_SETTINGS_RETRO_REMOTE = {
  //Authors settings
  fuzzyScreen: "TRUE",
  inputType: "VHS",
  inputInitialState: "OUT",
  messageFontSize: "6",
  messageFontColor: "rgb(15, 167, 15)",
  //Internal
  showRemote: true,
  showTvPanel: false,
  showVideoPanel: false,
  //Images
  background: "images/retro_remote/background.png",
  backgroundTV: "images/retro_remote/background_TV_16_9.png",
  backgroundTVInputOut: "images/retro_remote/background_TV_VHS_out_16_9.png",
  backgroundRemote: "images/retro_remote/background_remote.png",
  backgroundButtonRemote: "images/retro_remote/background_button_remote.png",
  backgroundPowerButton: "images/retro_remote/background_power_button.png",
  backgroundEjectButton: "images/retro_remote/background_eject_button.png",
  inputOutImage: "images/retro_remote/vhs_out.png",
  //Videos
  defaultChannelContent: {
    src: "videos/TV_Noise_16-9.mp4" 
  },
  inputChannel: {
    src: "videos/TV_BlackScreen_16_9.mp4"
  },
  //Sounds
  soundRemoteButton: "sounds/tv_remote_click.mp3",
  soundTvOn: "sounds/retro_tv_on.wav",
  soundTvOff: "sounds/retro_tv_off.wav",
  soundVHSIn: "sounds/vhs_tape_in.wav",
  soundVHSOut: "sounds/vhs_tape_out.wav",
  soundVHSOutNoTape: "sounds/vhs_eject_notape.mp3",
  soundVHSRewind: "sounds/vhs_tape_rewind.wav",
  //TV screen
  containerSize: 0.8,
  tvScreenHeight: 56,
  tvScreenMarginLeft: 0.2,
  tvScreenMarginBottom: 13.5,
  //Header
  tvHeaderFontSize: "6vmin",
  //Volume
  volumeFontSize: 0.07,
  volumeBarColor: "rgba(15, 167, 15, 0.76)",
  volumeColor: "rgb(15, 167, 15)",
  //Font
  tvFontSize: "7",
  tvFontColor: "rgb(15, 167, 15)",
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
  remoteButtonFontSize: "4vmin", 
  remoteButtonTextColor: "#000000",
  remoteButtonsInput: true,
  //Input
  inputObjectOutTop: "72.3%",
  inputObjectOutLeft: "50.0%",
  inputObjectSize: 0.135,
  //Eject button
  ejectButtonFontSize: "5vmin", 
  ejectButtonTextColor: "#000000",
  ejectButtonTvWidth: 0.09,
  ejectButtonTvHeight: 0.08,
};

export const SKIN_SETTINGS_RETRO_REMOTE_43 = {
  tvScreenMarginLeft: 0.1,
  tvScreenMarginBottom: 13.9,
  backgroundTV: "images/retro_remote/background_TV_4_3.png",
  backgroundTVInputOut: "images/retro_remote/background_TV_VHS_out_4_3.png",
  inputObjectSize: 0.099,
  messageFontSize: "5",
  tvFontSize: "6",
  tvHeaderFontSize: "4.7vmin",
  ejectButtonTvWidth: 0.065,
  ejectButtonTvHeight: 0.07,
  defaultChannelContent: {
    src: "videos/TV_Noise_4-3.mp4" 
  },
  inputChannel: {
    src: "videos/TV_BlackScreen_4_3.mp4"
  },
}

export const SKIN_SETTINGS_RETRO = {
  //Authors settings
  fuzzyScreen: "TRUE",
  inputType: "VHS",
  inputInitialState: "OUT",
  messageFontSize: "6",
  messageFontColor: "rgb(15, 167, 15)",
  //Internal
  showRemote: false,
  showTvPanel: true,
  showVideoPanel: true,
  //Images
  background: "images/retro/background.png",
  backgroundTV: "images/retro/background_TV_16_9.png",
  backgroundTVInputOut: "images/retro/background_TV_16_9_VHS_out.png",
  backgroundPowerButton: "images/retro/background_power_button.png",
  backgroundEjectButton: "images/retro/background_button_video.png",
  backgroundButtonTv: "images/retro/background_button_tv.png",
  backgroundButtonVideo: "images/retro/background_button_video.png",
  inputOutImage: "images/retro_remote/vhs_out.png",
  //Videos
  defaultChannelContent: {
    src: "videos/TV_Noise_16-9.mp4" 
  },
  inputChannel: {
    src: "videos/TV_BlackScreen_16_9.mp4"
  },
  //Sounds
  soundTVButton: "sounds/tv_button_click.mp3",
  soundTvOn: "sounds/retro_tv_on.wav",
  soundTvOff: "sounds/retro_tv_off.wav",
  soundVideoOn: "sounds/retro_video_on.mp3",
  soundVideoOff: "sounds/retro_video_off.mp3",
  soundVHSIn: "sounds/vhs_tape_in.wav",
  soundVHSOut: "sounds/vhs_tape_out.wav",
  soundVHSOutNoTape: "sounds/vhs_eject_notape.mp3",
  soundVHSRewind: "sounds/vhs_tape_rewind.wav",
  //TV screen
  containerSize: 0.8,
  tvScreenHeight: 51,
  tvScreenMarginLeft: -19.3,
  tvScreenMarginBottom: -8.6,
  //Header
  tvHeaderFontSize: "6vmin",
  //Volume
  volumeFontSize: 0.07,
  volumeBarColor: "rgba(15, 167, 15, 0.76)", // Color of the volume bar
  volumeColor: "rgb(15, 167, 15)", // Color of the volume text
  //Font
  tvFontSize: "7",
  tvFontColor: "rgb(15, 167, 15)",
  //Panel button
  panelButtonWidth: 0.085, 
  panelButtonHeight: 0.100,
  panelButtonColor: "black",
  panelButtonFontSize: "5vmin",
  //Input
  inputObjectOutTop: "11.3%",
  inputObjectOutLeft: "50.0%",
  inputObjectSize: 0.095,
  //Eject button
  ejectButtonFontSize: "5vmin", 
  ejectButtonTextColor: "#08130f",
  ejectButtonTvWidth: 0.06,
  ejectButtonTvHeight: 0.06,
};

export const SKIN_SETTINGS_RETRO_43 = {
  tvScreenMarginLeft: -14.3,
  tvScreenMarginBottom: -8.5,
  backgroundTV: "images/retro/background_TV_4_3.png",
  backgroundTVInputOut: "images/retro/background_TV_4_3_VHS_out.png",
  inputObjectSize: 0.076,
  messageFontSize: "5",
  tvFontSize: "6",
  tvHeaderFontSize: "4.7vmin",
  defaultChannelContent: {
    src: "videos/TV_Noise_4-3.mp4" 
  },
  inputChannel: {
    src: "videos/TV_BlackScreen_4_3.mp4"
  },
}

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";