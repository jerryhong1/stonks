import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CashIcon(props) {
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
        stroke="#1EDD4E"
        strokeWidth="3"
        d="M51.656 19.594H5.344c-.984 0-1.782.797-1.782 1.781v24.938c0 .983.798 1.78 1.782 1.78h46.312c.984 0 1.782-.797 1.782-1.78V21.375c0-.984-.798-1.781-1.782-1.781z"
      />
      <Path strokeWidth="3" stroke="#18AF3E" d="M49.875 14.25H7.125m39.188-5.344H10.687" />
      <Path
        stroke="#1EDD4E"
        strokeWidth="1"
        d="M28.5 24.938a8.906 8.906 0 100 17.812 8.906 8.906 0 000-17.813zM53.438 28.5a8.908 8.908 0 01-8.907-8.906M3.563 39.187a8.906 8.906 0 018.906 8.907l-8.906-8.907zm49.874 0a8.908 8.908 0 00-8.906 8.907l8.907-8.907zM3.563 28.5a8.906 8.906 0 008.906-8.906L3.563 28.5z"
      />
    </Svg>
  )
}

export default CashIcon
