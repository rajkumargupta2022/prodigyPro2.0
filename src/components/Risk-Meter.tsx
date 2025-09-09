const RiskMeter = ({ rotation = 0 }) => {
  return (
    <svg width="180" height="90" viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        {/* Green Zone */}
        <path
          d="M0 88 C1 73 5 57 13 44 C21 30 32 19 46 11 L60 37 C51 42 43 49 37 59 C32 68 29 78 29 89 L0 88 Z"
          fill="#6EC32A"
        />
        {/* Yellow Zone */}
        <path
          d="M49 10 C63 3 78 -0.4 93 0 C108 0.5 123 5 136 12 L121 37 C112 32 102 29 92 29 C82 29 71 31 62 36 L49 10 Z"
          fill="#FEC81D"
        />
        {/* Red Zone */}
        <path
          d="M138 14 C151 22 162 33 169 47 C176 60 180 75 180 90 L151 90 C151 80 149 70 144 61 C139 52 132 44 123 38 L138 14 Z"
          fill="#F15A25"
        />

        {/* Needle */}
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "90px 90px",
            transition: "transform 1s ease-in-out",
          }}
        >
          <path
            d="M90 88 C85 88 80 83 80 77 C80 70 90 51 90 51 C90 51 101 71 101 77 C101 83 96 88 90 88 Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="180" height="90" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default RiskMeter
