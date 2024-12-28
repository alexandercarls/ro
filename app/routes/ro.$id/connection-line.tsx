import { type ConnectionLineComponentProps } from "@xyflow/react"
import { type FC } from "react"

export const ConnectionLine: FC<ConnectionLineComponentProps> = ({
  fromX,
  fromY,
  toX,
  toY
}) => {
  return (
    <g>
      <path
        fill="none"
        stroke="red"
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle cx={toX} cy={toY} fill="#fff" r={3} stroke="red" strokeWidth={1.5} />
    </g>
  )
}
