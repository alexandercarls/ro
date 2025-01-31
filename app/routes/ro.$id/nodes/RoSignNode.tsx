import {
  type NodeProps,
  type Node,
  Handle,
  Position,
  NodeToolbar,
  useReactFlow,
  useUpdateNodeInternals
} from "@xyflow/react"
import type { SignVdh } from "~/lib/types"
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { LucideRotateCw } from "lucide-react"

export type RoSignNodeProps = Node<
  {
    sign: SignVdh
    rotation: number
  },
  "ro-sign"
>

const handleClasses = cn("w-2! h-2! bg-green-500! hover:bg-green-800!")

export const RoSignNode = (props: NodeProps<RoSignNodeProps>) => {
  const { updateNodeData } = useReactFlow()
  const updateNode = useUpdateNodeInternals()

  const position = props.data.sign.inFront ? Position.Bottom : Position.Left

  return (
    <>
      <NodeToolbar>
        <Button
          variant="outline"
          onClick={() => {
            // triggers node change `replace
            updateNodeData(props.id, {
              rotation: ((props.data.rotation ?? 0) + 90) % 360
            })
            updateNode(props.id)
          }}
        >
          <LucideRotateCw className="w-4 h-4" />
        </Button>
      </NodeToolbar>
      <div
        className="p-2 w-24 border border-yellow-500 border-r-2"
        style={{
          transform: `rotate(${props.data.rotation ?? 0}deg)`
        }}
      >
        <div className="relative h-16">
          <div className="absolute inset-0 h-16 flex items-center justify-center">
            <span className="text-3xl">🐶</span>
          </div>
          <img
            loading="lazy"
            className="relative"
            src={`/vdh/${props.data.sign.nr}.avif`}
            alt=""
            draggable={true}
          />
        </div>
        <Handle
          type="source"
          isConnectableStart={true}
          isConnectableEnd={false}
          className={cn(
            handleClasses,
            position === Position.Left ? "-left-3!" : "-bottom-3!"
          )}
          position={position}
        />
        <Handle
          type="target"
          isConnectableStart={false}
          isConnectableEnd={true}
          className={cn(
            handleClasses,
            position === Position.Left ? "-left-3!" : "-bottom-3!"
          )}
          position={position}
        />
      </div>
    </>
  )
}
