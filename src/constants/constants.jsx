export const DEFAULT_APP_SETTINGS = {
  skin: "RETRO_REMOTE",
  actionAfterSolve: "PLAY_VIDEO", //actionAfterSolve can be "NONE", "SHOW_MESSAGE" or "PLAY_VIDEO".

  message: undefined,
  delayMessage: "3", //in seconds

  enableLoopForChannels: true,

  enableInput: false,
  showRemote: true,

  maxChannelLength: 8,
  

  
  buttonFontSize: "5vmin", 

  buttonTextColor: "#000000",

 

  
  tvScreenWidth: "73%", // Width of the black screen in the TV
  tvScreenHeight: "48%", // Height of the black screen in the TV


  

  
  buttonsTop: ["12%", "22%", "32%", "42%", "52%", "62%", "72%"], // Top positions for the rows of buttons in the remote
  buttonsLeft: "50%", // Left position for the remote buttons


  volumeFontSize: 0.07,
  volumeBarColor: "rgba(15, 167, 15, 0.76)", // Color of the volume bar
  volumeColor: "rgb(15, 167, 15)", // Color of the volume text
  pausedIconSize: "25vmin", // Size of the paused icon in the remote
  pausedIconColor: "rgb(15, 167, 15)", // Color of the paused icon in the remote
  
  buttonTvWidth: 0.09, // Size of the button text in the TV
  buttonTvHeight: 0.1, // Height of the button text in the TV
  buttonTvMarginTop: "55.5%", // Margin top for the button text in the TV
  buttonTvMarginLeft: "85.5%", // Margin left for the button text in the TV
  buttonTvIconMarginTop: "-5%",
  buttonTvIconSize: "4.5vmin", // Size of the icon in the TV button
  containerMarginTop: 0.115,
  containerMarginLeft: -0.015,

  defaultChannelVideo: {
    src: "videos/TV_Noise_16-9.mp4" 
  },

};

export const SKIN_SETTINGS_RETRO_REMOTE = {
  //Authors settings
  fuzzyScreen: true, // Whether to apply a fuzzy effect to the TV screen
  initialVolume: 0.5,
  enableInput: true,
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
  vhsIn: "images/retro_remote/vhs_in.png",
  //Sounds
  soundRemoteButton: "sounds/tv_remote_click.mp3",
  soundTvOn: "sounds/retro_tv_on.wav",
  soundTvOff: "sounds/retro_tv_off.wav",
  soundDiscIn: "sounds/disc_in.wav",
  soundDiscOut: "sounds/disc_out.wav",
  soundVHSIn: "sounds/vhs_tape_in.wav",
  soundVHSOut: "sounds/vhs_tape_out.wav",
  soundVHSOutNoTape: "sounds/vhs_eject_notape.mp3",
  
  //TV screen
  tvScreenHeight: "56%",
  tvScreenMarginBottom: "14%",
  //Header
  tvHeaderFontSize: "6vmin",
  //Message
  messageFontSize: "0.05",
  //Remote
  remoteBottom: "-65%",
  remoteWidth: 0.25,
  remoteButtonsTop: ["10%", "20%", "30%", "40%", "50%", "62%", "70%"],
  remoteButtonsLeft: "50%",
  remoteButtonWidth: 0.09, 
  remoteButtonHeight: 0.07,
  remoteVolumeButtonMarginTop: "0.5vmin",
  remoteVolumeButtonSize: "6vmin", 
  remoteVolumeButtonColor: "#000000",
  removeButtonsInput: true,
  //VHS
  vhsTop: "72.3%",
  vhsSize: 0.135,
};

export const SKIN_SETTINGS_RETRO = {
  background: "images/retro/background.png",
  backgroundTV: "images/retro/background_TV.png",
  backgroundButton: "images/retro/background_button.png",
  backgroundPowerButton: "images/retro/retro_power_button.png",
  backgroundMessage: "images/retro/background_message_retro.png",
  soundRemoteButton: "sounds/beep_retro.mp3",
  vhsOut: "images/retro/vhs_out.png",
  vhsIn: "images/retro/vhs_in.png", // Background image for the VHS in the TV
  VHSButton: "images/retro/old_VHS_button.png",

  vhsWidth: 0.45, // Width of the VHS tape in the TV
  vhsHeight: 0.09, // Height of the VHS tape in the TV
  showRemote: false,
  powerButtonLeft: "78%", // Left position of the power button in the remote
  powerButtonTop: "19%", // Top position of the power button
  buttonWidth: 0.06, 
  buttonHeight: 0.05, 
  powerButtonWidth: 0.07, // Relative width of the power button
  powerButtonHeight: 0.06, // Relative height of the power button
  vhsButtonWidth: 0.08, // Relative width of the VHS button
  vhsButtonHeight: 0.07, // Relative height of the VHS button
  buttonFontSize: "3.3vmin", 

  volumeIconTop: "0vmin", // Top position of the volume icon in the remote
  buttonTextColor: "#FFFFFF", 
 

  tvScreenWidth: "62%", // Width of the black screen in the TV
  tvScreenHeight: "45%", // Height of the black screen in the TV
  volumeFontSize: 0.06, // Font size for the volume control text in the remote
  playPauseButtonTop: "2%", // Top position of the play/pause button in the remote
  playPauseButtonLeft: "55%", // Left position of the play/pause button in
  ejectButtonTop: "2%", // Top position of the eject button in the remote
  ejectButtonLeft: "64%", // Left position of the eject button in the remote
  containerMarginTop: 0.46,
  containerMarginLeft: -0.23,
};

export const SKIN_SETTINGS_STANDARD = {
  background: "images/futuristic/background.png",
  backgroundTV: "images/futuristic/background_TV.png",
  backgroundRemote: "images/futuristic/background_remote.png",
  backgroundButton: "images/futuristic/background_button.png",
  backgroundPowerButton: "images/futuristic/background_power_button.png",
  backgroundMessage: "images/futuristic/background_message_futuristic.png",
  vhsOut: "images/futuristic/dvd_out.png",
  vhsIn: "images/futuristic/dvd_in.png",
  vhsLeft: "38.5%", // Left position of the VHS in the TV
  vhsTop: "64.6%", // Top position of the VHS in the TV
  vhsWidth: 0.225, // Width of the VHS tape in the TV
  vhsHeight: 0.132, // Height of the VHS tape in the TV
  
  fuzzyScreen: false,


  tvScreenWidth: "100%", // Width of the black screen in the TV
  tvScreenHeight: "55%", // Height of the black screen in the TV
  buttonFontSize: "5vmin", 
  buttonTextColor: "#FFFFFF", 
  volumeIconTop: "1vmin", // Top position of the volume icon in the remote
  buttonWidth: 0.08, 
  buttonHeight: 0.08, 
  buttonsTop: ["10%", "20%", "30%", "40%", "50%", "60%", "70%"], // Top positions for the rows of buttons in the remote
  buttonsLeft: "50%", // Left position for the remote buttons

  volumeFontSize: 0.08,
  soundVHS: "sounds/dvd.wav",
  buttonTvWidth: 0.07, // Size of the button text in the TV
  buttonTvHeight: 0.06, // Height of the button text in the TV
  buttonTvMarginTop: "60%", // Margin top for the button text in the TV
  buttonTvMarginLeft: "67.5%", // Margin left for the button text in the TV
  buttonTvIconSize: "4vmin", // Size of the icon in the TV button

  containerMarginTop: 0.07,
  containerMarginLeft: 0,
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";
export const MESSAGE_SCREEN = "MESSAGE_SCREEN";