//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  skin: "STANDARD", //skin can be "STANDARD", "RETRO" or "FUTURISTIC".
  //background: "NONE", //background can be "NONE" or a URL.
  actionAfterSolve: "SHOW_MESSAGE", //actionAfterSolve can be "NONE" or "SHOW_MESSAGE".
  //message: "Custom message",
  checkSolution: "AFTER_WATCH_VIDEO", //checkSolution can be "AFTER_ENTER_CHANNEL" or "AFTER_WATCH_VIDEO".
  //id is channel number
  channels : [
    { id: "11", src:"videos/lions.webm" },
    { id: "1234", src:"videos/monkey.webm" }, 
  ],
  // vhsVideo :"videos/monkey.webm", //video showed in the tape


  //Settings that will be automatically specified by the Escapp server
  solutionLength: 4,
  locale:"es",

  escappClientSettings: {
    endpoint:"https://escapp.es/api/escapeRooms/id",
    linkedPuzzleIds: [1],
    rtc: false,
  },
};