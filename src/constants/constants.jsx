export const DEFAULT_APP_SETTINGS = {
  skin: "RETRO_REMOTE",
  actionAfterSolve: "NONE",
  message: undefined,

  soundBeep: "sounds/tv_remote_click.mp3",
  soundVHS: "sounds/vhs_tape_in.wav", // Sound for VHS insertion/removal
  soundTvOn: "sounds/retro_tv_on.wav", // Sound for TV on
  soundTvOff: "sounds/retro_tv_off.wav", // Sound for TV off
  
  buttonFontSize: "5vmin", // Font size for the text in the keypad
  soundIconSize: "5vmin", // Size of the sound icon in the keypad
  buttonTextColor: "#000000", // Color for the text in the keypad
  buttonWidth: 0.09, // Relative width of the buttons in the keypad
  buttonHeight: 0.07, // Relative height of the buttons in the keypad
  vhsLeft: "13.5%", // Left position of the VHS in the TV
  vhsTop: "59.3%", // Top position of the VHS in the TV
  vhsWidth: 0.705, // Width of the VHS tape in the TV
  vhsHeight: 0.15, // Height of the VHS tape in the TV
  displayVHS: true,
  blackScreen: true,
  blackScreenWidth: "73%", // Width of the black screen in the TV
  blackScreenHeight: "48%", // Height of the black screen in the TV
  fuzzyScreen: true, // Whether to apply a fuzzy effect to the TV screen
  remoteWidth: 0.4,
  remoteBottom: "-87%",
  showRemote: true, // Whether to show the remote control
  buttonsTop: ["12%", "22%", "32%", "42%", "52%", "62%", "72%"], // Top positions for the rows of buttons in the remote
  buttonsLeft: "50%", // Left position for the remote buttons
  volumeIconTop: "0.5vmin", // Top position of the volume icon in the remote
  soundIconColor: "#000000", // Color for the sound icon in the remote
  channelFontSize: "6vmin", // Font size for the channel number in the TV
  volumeFontSize: 0.07,
  volumeBarColor: "rgba(15, 167, 15, 0.76)", // Color of the volume bar
  volumeColor: "rgb(15, 167, 15)", // Color of the volume text
  pausedIconSize: "25vmin", // Size of the paused icon in the remote
  pausedIconColor: "rgb(15, 167, 15)", // Color of the paused icon in the remote
  noTapeFontSize: "0.06",
  buttonTvWidth: 0.09, // Size of the button text in the TV
  buttonTvHeight: 0.1, // Height of the button text in the TV
  buttonTvMarginTop: "55.5%", // Margin top for the button text in the TV
  buttonTvMarginLeft: "85.5%", // Margin left for the button text in the TV
  buttonTvIconMarginTop: "-5%",
  buttonTvIconSize: "4.5vmin", // Size of the icon in the TV button
  defaultVideo: { 
    src: "videos/TV_Noise_16-9.mp4", 
    type: "video/mp4" 
  },
  channels: [
    { 
      id: "11", 
      src: "videos/sample_16_9.webm" 
    },
    { 
      id: "12", 
      src: "videos/sample2_16_9.mp4"
    },
    {
      id: "13", 
      src: "videos/sample_4_3.webm" 
    },
    {
      id: "14", 
      src: "videos/sample2_4_3.mp4"
    }
  ],
  containerMarginTop: 0.115,
  containerMarginLeft: -0.015,
  inputChannel: { id: "-1", name: "vhs", src: "videos/spain_metro.webm" }, // Default input channel for the VHS
};

export const SKIN_SETTINGS_RETRO_REMOTE = {
  background: "images/retro_remote/background.png",
  backgroundTV: "images/retro_remote/background_TV.png",
  backgroundRemote: "images/retro_remote/background_remote.png",
  backgroundButton: "images/retro_remote/background_button.png",
  backgroundPowerButton: "images/retro_remote/background_power_button.png",
  vhsOut: "images/retro_remote/vhs_out.png",
  vhsIn: "images/retro_remote/vhs_in.png",
  backgroundButtonTv: "images/retro_remote/background_button_tv.png",

  soundBeep: "sounds/tv_remote_click.mp3",
};

export const SKIN_SETTINGS_RETRO = {
  background: "images/retro/background.png",
  backgroundTV: "images/retro/background_TV.png",
  backgroundButton: "images/retro/background_button.png",
  backgroundPowerButton: "images/retro/retro_power_button.png",
  backgroundMessage: "images/retro/background_message_retro.png",
  soundBeep: "sounds/beep_retro.mp3",
  vhsOut: "images/retro/vhs_out.png",
  vhsIn: "images/retro/vhs_in.png", // Background image for the VHS in the TV
  VHSButton: "images/retro/old_VHS_button.png",
  vhsLeft: "11.2%", // Left position of the VHS in the TV
  vhsTop: "0%", // Top position of the VHS in the TV
  vhsWidth: 0.45, // Width of the VHS tape in the TV
  vhsHeight: 0.09, // Height of the VHS tape in the TV
  showRemote: false,
  powerButtonLeft: "78%", // Left position of the power button in the remote
  powerButtonTop: "19%", // Top position of the power button
  buttonWidth: 0.06, // Relative width of the buttons in the keypad
  buttonHeight: 0.05, // Relative height of the buttons in the keypad
  powerButtonWidth: 0.07, // Relative width of the power button
  powerButtonHeight: 0.06, // Relative height of the power button
  vhsButtonWidth: 0.08, // Relative width of the VHS button
  vhsButtonHeight: 0.07, // Relative height of the VHS button
  buttonFontSize: "3.3vmin", // Font size for the text in the keypad
  soundIconSize: "3.5vmin", // Size of the sound icon in the keypad
  volumeIconTop: "0vmin", // Top position of the volume icon in the remote
  buttonTextColor: "#FFFFFF", // Color for the text in the keypad
  buttonsTop: ["36.5%", "41.5%", "46.5%", "51.5%", "56.5%", "61.5%", "66.5%"], // Top positions for the rows of buttons in the remote
  buttonsLeft: "91%", // Left position for the remote buttons  
  blackScreen: true,
  blackScreenWidth: "62%", // Width of the black screen in the TV
  blackScreenHeight: "45%", // Height of the black screen in the TV
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
  displayVHS: true,
  fuzzyScreen: false,
  remoteBottom: "-85%",
  blackScreen: true,
  blackScreenWidth: "100%", // Width of the black screen in the TV
  blackScreenHeight: "55%", // Height of the black screen in the TV
  buttonFontSize: "5vmin", // Font size for the text in the keypad
  soundIconSize: "5vmin", // Size of the sound icon in the keypad
  buttonTextColor: "#FFFFFF", // Color for the text in the keypad
  volumeIconTop: "1vmin", // Top position of the volume icon in the remote
  buttonWidth: 0.08, // Relative width of the buttons in the keypad
  buttonHeight: 0.08, // Relative height of the buttons in the keypad
  buttonsTop: ["10%", "20%", "30%", "40%", "50%", "60%", "70%"], // Top positions for the rows of buttons in the remote
  buttonsLeft: "50%", // Left position for the remote buttons
  soundIconColor: "#FFFFFF", // Color for the sound icon in the remote
  volumeFontSize: 0.08,
  soundVHS: "sounds/dvd.wav",
  buttonTvWidth: 0.07, // Size of the button text in the TV
  buttonTvHeight: 0.06, // Height of the button text in the TV
  buttonTvMarginTop: "60%", // Margin top for the button text in the TV
  buttonTvMarginLeft: "67.5%", // Margin left for the button text in the TV
  buttonTvIconSize: "4vmin", // Size of the icon in the TV button
  inputChannel: { id: "-1", name: "DVD", src: "videos/spain_metro.webm" }, // Default input channel for the VHS
  containerMarginTop: 0.07,
  containerMarginLeft: 0,
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";
export const MESSAGE_SCREEN = "MESSAGE_SCREEN";