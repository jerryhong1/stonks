import * as React from "react"
import Svg, { Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={56}
      height={56}
      fill="none"
      viewBox="0 0 56 56"
      {...props}
    >
      <Path
        stroke="#fff"
        strokeWidth="2"
        d="M31.5 1.5h-15A4.5 4.5 0 0012 6v36a4.5 4.5 0 004.5 4.5h15A4.5 4.5 0 0036 42V6a4.5 4.5 0 00-4.5-4.5z"
      />
      <Path
        stroke="#fff"
        strokeWidth="1"
        d="M16.5 1.5h2.25a.75.75 0 01.75.75 1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5.75.75 0 01.75-.75h2.25"
      />
      <Path stroke="#1EDD4E" stroke-width="3" d="M7 40l13.114-13.236h11.24L44 14" />
      <Path
        fill="#1EDD4E"
        d="M47.607 10.536L45.365 18.9l-6.124-6.124 8.366-2.241z"
      />
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h48v48H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
