const Icons = {
 standardPauseIcon: (
    <svg
      style={{ height: "100%", width: "100%" }}
      viewBox="0 0 1920 1080"
    >
      <circle
        cx="960"
        cy="540"
        r="260"
        fill="none"
        stroke="white"
        strokeWidth="28"
      />
      <rect
        x="850"
        y="380"
        width="70"
        height="320"
        rx="24"
        fill="white"
      />
      <rect
        x="1000"
        y="380"
        width="70"
        height="320"
        rx="24"
        fill="white"
      />
    </svg>
  ),

  retroPauseIcon: (
    <svg
      style={{ height: "100%", width: "100%" }}
      viewBox="0 0 1920 1080"
    >
      <circle
        cx="960"
        cy="540"
        r="250"
        fill="none"
        stroke="#0FA70F"
        strokeWidth="24"
      />
      <rect
        x="840"
        y="365"
        width="78"
        height="350"
        fill="#0FA70F"
      />
      <rect
        x="1002"
        y="365"
        width="78"
        height="350"
        fill="#0FA70F"
      />
    </svg>
  ),

  inputRemoteIcon: (appSettings) => (
    <svg width={appSettings.remoteButtonFontSize} height={appSettings.remoteButtonFontSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 12 H54 Q58 12 58 16 V48 Q58 52 54 52 H20 Q16 52 16 48 V40"
        fill="none"
        stroke={appSettings.remoteButtonTextColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 32 H36"
        fill="none"
        stroke={appSettings.remoteButtonTextColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M28 24 L36 32 L28 40"
        fill="none"
        stroke={appSettings.remoteButtonTextColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  volumeRemoteIcon: (appSettings) => (
    <svg width={appSettings.remoteButtonSize} height={appSettings.remoteButtonSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 24v16h12l16 14V10L20 24H8z" fill={appSettings.remoteButtonColor}/>
      <path d="M44 22c4 4 4 16 0 20" fill="none" stroke={appSettings.remoteButtonColor} strokeWidth="4" strokeLinecap="round"/>
      <path d="M50 14c9 9 9 27 0 36" fill="none" stroke={appSettings.remoteButtonColor} strokeWidth="4" strokeLinecap="round"/>
    </svg>
  ),

  volumeTVIcon: (appSettings) => (
    <svg width="5vmin" height="5vmin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect x="14" y="38" width="18" height="24" rx="3" fill="black"/>
      <path d="M38 36 L64 18 Q68 16 68 22 V78 Q68 84 64 82 L38 64 Z" fill="black"/>
      <path d="M76 32 L88 22 Q91 20 93 23 Q95 26 92 28 L80 38 Q77 40 75 37 Q73 34 76 32 Z" fill="black"/>
      <rect x="76" y="47" width="20" height="6" rx="3" fill="black"/>
      <path d="M76 68 L88 78 Q91 80 93 77 Q95 74 92 72 L80 62 Q77 60 75 63 Q73 66 76 68 Z" fill="black"/>
    </svg>
  ),

  volumeScreenIcon: (appSettings) => (
    <svg width="5vmin" height="5vmin" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 24v16h12l16 14V10L20 24H8z" fill="white"/>
      <path d="M44 22c4 4 4 16 0 20" fill="white" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <path d="M50 14c9 9 9 27 0 36" fill="white" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  ),

  rewindRemoteIcon: (appSettings) => (
    <svg width={appSettings.remoteButtonSize} height={appSettings.remoteButtonSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M34 16L14 32L34 48V16Z" fill={appSettings.remoteButtonColor}/>
      <path d="M52 16L32 32L52 48V16Z" fill={appSettings.remoteButtonColor}/>
    </svg>
  ),

  forwardRemoteIcon: (appSettings) => (
    <svg width={appSettings.remoteButtonSize} height={appSettings.remoteButtonSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 16L32 32L12 48V16Z" fill={appSettings.remoteButtonColor}/>
      <path d="M30 16L50 32L30 48V16Z" fill={appSettings.remoteButtonColor}/>
    </svg>
  ),

  playPauseRemoteIcon: (appSettings) => (
    <svg width={appSettings.remoteButtonSize} height={appSettings.remoteButtonSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 16L34 32L14 48V16Z" fill={appSettings.remoteButtonColor}/>
      <rect x="42" y="16" width="6" height="32" rx="1" fill={appSettings.remoteButtonColor}/>
      <rect x="52" y="16" width="6" height="32" rx="1" fill={appSettings.remoteButtonColor}/>
    </svg>
  ),

  ejectIconVHS: (appSettings) => (
    <svg width={appSettings.ejectButtonFontSize} height={appSettings.ejectButtonFontSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 12L18 30H46L32 12Z" fill={appSettings.ejectButtonTextColor}/>
      <rect x="16" y="34" width="32" height="5" rx="2" fill={appSettings.ejectButtonTextColor}/>
      <rect x="14" y="44" width="36" height="8" rx="2" fill={appSettings.ejectButtonTextColor}/>
    </svg>
  ),

  ejectIconDisc: (appSettings) => (
    <svg width={appSettings.ejectButtonFontSize} height={appSettings.ejectButtonFontSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 12L18 30H46L32 12Z" fill={appSettings.ejectButtonTextColor}/>
      <rect x="16" y="34" width="32" height="5" rx="2" fill={appSettings.ejectButtonTextColor}/>
      <rect x="14" y="44" width="36" height="8" rx="2" fill={appSettings.ejectButtonTextColor}/>
    </svg>
  ),

  powerIconOff: (appSettings) => (
    <svg width="2.5vmin" height="2.5vmin" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 28 A30 30 0 1 0 68 28"
        fill="none"
        stroke="#000"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="14"
        x2="50"
        y2="50"
        stroke="#000"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  ),

  powerIconOn: (appSettings) => (
    <svg width="2.5vmin" height="2.5vmin" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 28 A30 30 0 1 0 68 28"
        fill="none"
        stroke="#0B7A0E"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="14"
        x2="50"
        y2="50"
        stroke="#0B7A0E"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  ),

  circleOn: (appSettings) => (
    <svg width="2.5vmin" height="2.5vmin" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#222e35"/>
      <circle cx="50" cy="50" r="40" fill="#0f8610"/>
    </svg>
  ),

  circleOff: (appSettings) => (
    <svg width="2.5vmin" height="2.5vmin" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#222e35"/>
    </svg>
  ),

};

export default Icons;