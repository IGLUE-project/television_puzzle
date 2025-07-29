export const DEFAULT_APP_SETTINGS = {
  skin: "STANDARD",
  actionAfterSolve: "NONE",
  message: undefined,
  keysType: "NUMBERS",
  background: "images/standard/background2.png",
  backgroundTV : "images/standard/background_TV.png",
  backgroundRemote : "images/standard/background_remote.png",
  backgroundButton: "images/standard/background_button.png",
  backgroundPowerButton: "images/standard/background_power_button.png",
  vhsOut: "images/standard/vhs_out.png",
  vhsIn: "images/standard/vhs_in.png",
  backgroundMessage: "images/standard/background_message.png",
  soundBeep: "sounds/beep.mp3",
  soundVHS: "sounds/vhs_tape_in.wav", // Sound for VHS insertion/removal
  soundTvOn: "sounds/tv_on.wav", // Sound for TV on
  soundTvOff: "sounds/tv_off.wav", // Sound for TV off
  buttonFontSize: "5vmin", // Font size for the text in the keypad
  soundIconSize: "5vmin", // Size of the sound icon in the keypad
  buttonTextColor: "#000000", // Color for the text in the keypad
  buttonWidth: 0.09, // Relative width of the buttons in the keypad
  buttonHeight: 0.07, // Relative height of the buttons in the keypad
  vhsLeft: "21.5%", // Left position of the VHS in the TV
  vhsTop: "61.3%", // Top position of the VHS in the TV
  vhsWidth: 0.57, // Width of the VHS tape in the TV
  vhsHeight: 0.15, // Height of the VHS tape in the TV
  minLength: 4, // Minimum length of the solution
  displayVHS: true,
  blackScreen: true,
  blackScreenWidth: "75%", // Width of the black screen in the TV
  blackScreenHeight: "65%", // Height of the black screen in the TV
  blackScreenLeft: "12%", // Left position of the black screen in the TV
  blackScreenTop: "5%", // Top position of the black screen
  fuzzyScreen: true, // Whether to apply a fuzzy effect to the TV screen
  videoPlayerWidth: 0.78, // Width of the video player
  videoPlayerLeft: "16%", // Left position of the video player
  videoPlayerTop: "13.6%", // Top position of the video player
  channelNumberTop: "15%", // Top position of the channel number in the TV
  channelNumberLeft: "18%", // Left position of the channel number in the TV
  remoteWidth: 0.4,
  remoteBottom:"-80%",
  showRemote: true, // Whether to show the remote control
  buttonsTop: ["12%", "22%", "32%", "42%", "52%", "62%", "72%"], // Top positions for the rows of buttons in the remote
  buttonsLeft: "50%", // Left position for the remote buttons
  volumeIconTop: "0.5vmin", // Top position of the volume icon in the remote
  soundIconColor: "#000000", // Color for the sound icon in the remote
  channelFontSize: "6vmin", // Font size for the channel number in the TV
  fuzzyScreenWidth: "75%", // Width of the fuzzy screen effect
  fuzzyScreenHeight: "65%", // Height of the fuzzy screen effect
  fuzzyScreenLeft: "11%", // Left position of the fuzzy screen effect
  fuzzyScreenTop: "5%", // Top position of the fuzzy screen effect
  volumeTop: "60%",
  volumeLeft: "17%", // Left position of the volume control in the remote
  volumeHeight: "5vmin", // Height of the volume control in the remote
  volumeContainerWidth: 0.45, // Width of the volume control container in the remote
  volumeBarLeft: 0.21,
  volumeFontSize: 0.07,
  volumeBarColor: "rgba(15, 167, 15, 0.76)", // Color of the volume bar
  volumeColor: "rgb(15, 167, 15)", // Color of the volume text
  pausedIconSize: "25vmin", // Size of the paused icon in the remote
  pausedIconColor: "rgb(15, 167, 15)", // Color of the paused icon in the remote
  noTapeFontSize: "0.06",
  defaultVideo:{src: "videos/WhiteNoise.mp4", type: "video/mp4"},
  channels : [
    { id: "11111", name: "Never gonna give you up", src:"https://www.youtube.com/watch?v=dQw4w9WgXcQ", type: "video/youtube" },
    { id: "12345", name: "Anuncios de los 90", src:"https://www.youtube.com/watch?v=G1dGb_i3ZU8", type: "video/youtube" }, 
  ],
  inputChannel: {id: "-1", name: "vhs", type:"video/youtube", src:"https://www.youtube.com/watch?v=EYZUikg-NXE"}, // Default input channel for the VHS
};

export const SKIN_SETTINGS_RETRO = {
  background: "images/retro/background2.png",
  backgroundTV : "images/retro/background_TV.png",
  backgroundButton: "images/retro/background_button.png",
  backgroundPowerButton: "images/retro/retro_power_button.png",
  backgroundMessage: "images/retro/background_message_retro.png",
  soundBeep: "sounds/beep_retro.mp3",
  vhsOut: "images/retro/vhs_out.png",
  vhsIn: "images/retro/vhs_in.png", // Background image for the VHS in the TV
  VHSButton: "images/retro/old_VHS_button.png",
  vhsLeft: "18%", // Left position of the VHS in the TV
  vhsTop: "0%", // Top position of the VHS in the TV
  vhsWidth: 0.37, // Width of the VHS tape in the TV
  vhsHeight: 0.09, // Height of the VHS tape in the TV
  showRemote: false,
  powerButtonLeft: "76%", // Left position of the power button in the remote
  powerButtonTop: "22%", // Top position of the power button
  buttonWidth: 0.06, // Relative width of the buttons in the keypad
  buttonHeight: 0.05, // Relative height of the buttons in the keypad
  powerButtonWidth: 0.06, // Relative width of the power button
  powerButtonHeight: 0.05, // Relative height of the power button
  vhsButtonWidth: 0.08, // Relative width of the VHS button
  vhsButtonHeight: 0.07, // Relative height of the VHS button
  buttonFontSize: "3.3vmin", // Font size for the text in the keypad
  soundIconSize: "3.5vmin", // Size of the sound icon in the keypad
  volumeIconTop: "0vmin", // Top position of the volume icon in the remote
  buttonTextColor: "#FFFFFF", // Color for the text in the keypad
  buttonsTop: ["40%", "45%", "50%", "55%", "60%", "75%"], // Top positions for the rows of buttons in the remote
  buttonsLeft: "91%", // Left position for the remote buttons  
  blackScreen: true,
  blackScreenWidth: "70%", // Width of the black screen in the TV
  blackScreenHeight: "60%", // Height of the black screen in the TV
  blackScreenLeft: "5%", // Left position of the black screen in the TV
  blackScreenTop: "25%", // Top position of the black screen
  fuzzyScreenWidth: "70%", // Width of the fuzzy screen effect
  fuzzyScreenHeight: "60%", // Height of the fuzzy screen effect
  fuzzyScreenLeft: "5%", // Left position of the fuzzy screen effect
  fuzzyScreenTop: "25%", // Top position of the fuzzy screen effect
  videoPlayerWidth: 0.75, // Width of the video player
  videoPlayerLeft: "10.5%", // Left position of the video player
  videoPlayerTop: "36%", // Top position of the video player
  channelNumberTop: "35%", // Top position of the channel number in the TV
  channelNumberLeft: "14%", // Left position of the channel number in the TV
  volumeTop: "72%",
  volumeLeft: "12%", // Left position of the volume control in the remote
  volumeHeight: "4.5vmin", // Height of the volume control in the remote
  volumeContainerWidth: 0.35, // Width of the volume control container in the remote
  volumeBarLeft: 0.21,
  volumeFontSize: 0.06, // Font size for the volume control text in the remote
  playPauseButtonTop: "2%", // Top position of the play/pause button in the remote
  playPauseButtonLeft: "55%", // Left position of the play/pause button in
  ejectButtonTop: "2%", // Top position of the eject button in the remote
  ejectButtonLeft: "64%", // Left position of the eject button in the remote



};

export const SKIN_SETTINGS_FUTURISTIC = {
  background: "images/futuristic/background2.png",
  backgroundTV : "images/futuristic/background_TV2.png",
  backgroundRemote : "images/futuristic/background_remote.png",
  backgroundButton: "images/futuristic/background_button.png",
  backgroundPowerButton: "images/futuristic/background_power_button.png",
  backgroundMessage: "images/futuristic/background_message_futuristic.png",
  vhsOut: "images/futuristic/dvd_out.png",
  vhsIn: "images/futuristic/dvd_in.png", 
  vhsLeft: "37%", // Left position of the VHS in the TV
  vhsTop: "62.5%", // Top position of the VHS in the TV
  vhsWidth: 0.25, // Width of the VHS tape in the TV
  vhsHeight: 0.15, // Height of the VHS tape in the TV
  displayVHS: true,
  fuzzyScreen: false,
  remoteBottom: "-85%",
  videoPlayerWidth: 0.68, // Width of the video player
  videoPlayerLeft: "12%", // Left position of the video player
  videoPlayerTop: "19.5%", // Top position of the video player
  channelNumberTop: "20%", // Top position of the channel number in the TV
  channelNumberLeft: "10%", // Left position of the channel number in the TV
  blackScreen: true,
  blackScreenWidth: "93%", // Width of the black screen in the TV
  blackScreenHeight: "60%", // Height of the black screen in the TV
  blackScreenLeft: "3%", // Left position of the black screen in the TV
  blackScreenTop: "15%", // Top position of the black screen
  buttonFontSize: "5vmin", // Font size for the text in the keypad
  soundIconSize: "5vmin", // Size of the sound icon in the keypad
  buttonTextColor: "#FFFFFF", // Color for the text in the keypad
  volumeIconTop: "1vmin", // Top position of the volume icon in the remote
  buttonWidth: 0.08, // Relative width of the buttons in the keypad
  buttonHeight: 0.08, // Relative height of the buttons in the keypad
  buttonsTop: ["10%","20%", "30%", "40%", "50%", "60%", "70%"], // Top positions for the rows of buttons in the remote
  buttonsLeft: "50%", // Left position for the remote buttons
  soundIconColor: "#FFFFFF", // Color for the sound icon in the remote
  volumeTop: "62%",
  volumeLeft: "8%", // Left position of the volume control in the remote
  volumeHeight: "5vmin", // Height of the volume control in the remote
  volumeContainerWidth: 0.6, // Width of the volume control container in the remote
  volumeBarLeft: 0.25,
  volumeFontSize: 0.08,
  soundVHS: "sounds/dvd.wav",
  inputChannel: {id: "-1", name: "DVD", type:"video/youtube", src:"https://www.youtube.com/watch?v=EYZUikg-NXE"},
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath:"./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";
export const MESSAGE_SCREEN = "MESSAGE_SCREEN";