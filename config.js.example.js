//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  skin: "STANDARD", //skin can be "STANDARD", "RETRO_REMOTE" or "RETRO".
  aspectRatio: "16/9", //Specify the aspect ratio for the TV screen. Possible values: "16/9", "4/3".
  // background: "NONE", //background can be "NONE" or a URL.
  actionAfterSolve: "PLAY_VIDEO", //actionAfterSolve can be "NONE", "SHOW_MESSAGE" or "PLAY_VIDEO".
  // delayMessage: "3", //Delay for the message (in seconds). Only for actionAfterSolve="SHOW_MESSAGE".
  maxChannelLength: "4", //Maximum number of digits in a channel number
  // videoContainerPaddingTop: "0", //Allow to specify top padding for the video container
  // videoContainerPaddingRight: "0", //Allow to specify right padding for the video container
  // videoContainerPaddingBottom: "0", //Allow to specify bottom padding for the video container
  // videoContainerPaddingLeft: "0", //Allow to specify left padding for the video container
  // enableLoopForChannels: "TRUE", //Whether the channel videos will play on a loop
  // fuzzyScreen: "TRUE", //Whether to apply a fuzzy effect to the TV screen
  initialVolume: "50", //Initial volume of the TV (0-100)
  inputType: "DISC", //Allows enabling an input source based on the skin (e.g., disc, VHS, internal storage). Possible values: "NONE", "INTERNAL", "VHS", "DISC".
  inputInitialState: "OUT", //For items that can be inserted and removed, specify whether the item is inside or outside the TV. Possible values: "IN", "OUT".
  inputPlayerInitialState: "ON", // For skins with a player (e.g. a VHS player) that can be switched on and off, specifies whether the player is initially turned on. Possible values: "ON", "OFF".
  enableRewindAndForward: "TRUE", //Enable rewinding and fast-forwarding for the input video
  keepState: "FALSE", //Enable keeping the TV state when the app is closed
  //List with TV channels
  channels: [
    { 
      id: "2", 
      src: "videos/sample_16_9.webm"
    },
    {
      id: "3", 
      src: "videos/sample_4_3.webm"
    },
    {
      id: "4", 
      message: "Hello World"
    }
  ],
  //Video for the input
  inputChannel: {
    src: "videos/sample2_16_9.mp4"
  },
  //Override default video for channels
  // defaultChannelContent: {
  //   src: "videos/TV_Test_Card_16-9.mp4" 
  // },

  //Settings that will be automatically specified by the Escapp server
  solutionLength: 4,
  locale:"es",

  escappClientSettings: {
    endpoint:"https://escapp.es/api/escapeRooms/id",
    linkedPuzzleIds: [1],
    rtc: false,
  },
};