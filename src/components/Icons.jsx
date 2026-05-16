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
        stroke="#f0eadc"
        strokeWidth="24"
      />
      <rect
        x="840"
        y="365"
        width="78"
        height="350"
        fill="#f0eadc"
      />
      <rect
        x="1002"
        y="365"
        width="78"
        height="350"
        fill="#f0eadc"
      />
    </svg>
  ),

  inputRemoteIcon: (appSettings) => (
    <svg width={appSettings.buttonFontSize} height={appSettings.buttonFontSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 12 H54 Q58 12 58 16 V48 Q58 52 54 52 H20 Q16 52 16 48 V40"
        fill="none"
        stroke={appSettings.buttonTextColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 32 H36"
        fill="none"
        stroke={appSettings.buttonTextColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M28 24 L36 32 L28 40"
        fill="none"
        stroke={appSettings.buttonTextColor}
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

  ejectIcon: (appSettings) => (
    <svg width={appSettings.buttonFontSize} height={appSettings.buttonFontSize} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 12L18 30H46L32 12Z" fill={appSettings.buttonTextColor}/>
      <rect x="16" y="34" width="32" height="5" rx="2" fill={appSettings.buttonTextColor}/>
      <rect x="14" y="44" width="36" height="8" rx="2" fill={appSettings.buttonTextColor}/>
    </svg>
  ),

  ejectIconDisc: (appSettings) => (
    <svg width="3vmin" height="3vmin" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 12L18 30H46L32 12Z" fill={appSettings.buttonTextColor}/>
      <rect x="16" y="34" width="32" height="5" rx="2" fill={appSettings.buttonTextColor}/>
      <rect x="14" y="44" width="36" height="8" rx="2" fill={appSettings.buttonTextColor}/>
    </svg>
  ),

};

export default Icons;