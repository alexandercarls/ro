import { type NodeProps, type Node } from "@xyflow/react"
import type { SignVdh } from "~/lib/types"

export type RoSignGroupNodeProps = Node<
  {
    signs: Array<SignVdh>
  },
  "ro-sign-group"
>

// const handleClasses = cn("!w-2 !h-2 !bg-green-500 hover:!bg-green-800");

export const RoSignGroupNode = (props: NodeProps<RoSignGroupNodeProps>) => {
  // const position = Position.Bottom;
  // const position =
  //   props.data.sign.type === "A" ? Position.Bottom : Position.Left;

  return (
    <div className="">
      <p>Group</p>
      {props.data.signs.map((sign) => (
        <div key={sign.nr} className="p-2 w-24 border border-yellow-500 border-r-2">
          <img src={`/vdh/${sign.nr}.avif`} alt="" draggable={true} />
        </div>
      ))}
    </div>
  )
}
