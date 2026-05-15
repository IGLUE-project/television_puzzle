const Icons = {
 standardPauseIcon: (
    <svg
      style={{ height: "100%", width: "100%" }}
      viewBox="0 0 1920 1080"
    >
      <rect width="1920" height="1080" fill="black" />
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
      <rect width="1920" height="1080" fill="black" />
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
  )
};

export default Icons;