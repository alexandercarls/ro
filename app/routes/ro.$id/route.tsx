import {
  Controls,
  ReactFlow,
  ViewportPortal,
  type ProOptions,
  ReactFlowProvider,
  type NodeProps,
  type OnNodeDrag
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useShallow } from "zustand/react/shallow"
import { Fragment, useCallback, useEffect, useState } from "react"
import { RoSignNode } from "./nodes/RoSignNode"
import { ConnectionLine } from "./connection-line"
import {
  type AppEdge,
  type AppNode,
  type AppState,
  ParcoursProvider,
  useParcoursStore
} from "./store"
import { Button } from "~/components/ui/button"
import { Redo2, Undo2 } from "lucide-react"
import { RightSidebar } from "./right-sidebar"
import { LeftSidebar } from "./left-sidebar"
import { Separator } from "@radix-ui/react-separator"
import { RoSignGroupNode, type RoSignGroupNodeProps } from "./nodes/RoSignGroupNode"
import type { Route } from "../ro.$id/+types/route"
import { useZ } from "~/hooks/use-z"
import { useQuery } from "@rocicorp/zero/react"
import {
  MultiSidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "~/components/ui/multi-sidebar"
import { preload } from "./preload"
import { NodeExtentBackground } from "./background"

const selector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodeDragStart: state.onNodeDragStart,
  onNodeDragStop: state.onNodeDragStop,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
  draggedSignNr: state.draggedNode,
  setRemoteNodesAndEdges: state.setRemoteNodesAndEdges,
  setParcoursId: state.setParcoursId
})

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes: Record<
  NonNullable<AppNode["type"] | RoSignGroupNodeProps["type"]>,
  React.ComponentType<
    NodeProps & {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: any
    }
  >
> = {
  "ro-sign": RoSignNode,
  "ro-sign-group": RoSignGroupNode
}
const proOptions: ProOptions = { hideAttribution: true }

export default function ROWrapper({ params }: Route.ComponentProps) {
  const z = useZ()

  // TODO: Not too sure if I only need to trigger preload when all `useQuery`s are ready
  const [roReady, setRoReady] = useState(false)
  const [leftSidebarReady, setLeftSidebarReady] = useState(false)
  const [rightSidebarReady, setRightSidebarReady] = useState(false)
  useEffect(() => {
    if (roReady && leftSidebarReady && rightSidebarReady) {
      preload(z)
    }
  }, [roReady, leftSidebarReady, rightSidebarReady, z])

  return (
    <ReactFlowProvider>
      <ParcoursProvider nodes={[]} edges={[]} parcoursId={params.id}>
        <MultiSidebarProvider>
          <LeftSidebar onReady={() => setLeftSidebarReady(true)} />
          <SidebarInset>
            <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" side="left" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <SidebarTrigger className="ml-auto" side="right" />
            </header>
            <RO parcoursId={params.id} onReady={() => setRoReady(true)} />
          </SidebarInset>
          <RightSidebar onReady={() => setRightSidebarReady(true)} />
        </MultiSidebarProvider>
      </ParcoursProvider>
    </ReactFlowProvider>
  )
}

const RO = (props: { onReady: () => void; parcoursId: string }) => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeDragStart,
    onNodeDragStop,
    addNode,
    draggedSignNr,
    setRemoteNodesAndEdges,
    setParcoursId
  } = useParcoursStore(useShallow(selector))

  const z = useZ()

  useEffect(() => {
    console.log("parcour id: ", props.parcoursId)
    setParcoursId(props.parcoursId)
  }, [props.parcoursId, setParcoursId])

  const [parcour, { type }] = useQuery(
    z.query.parcours
      .where("id", "=", props.parcoursId)
      .related("nodes", (q) => q.related("sign", (s) => s.one()))
      .related("edges")
      .one()
  )

  useEffect(() => {
    console.log(
      `%c ${type.toString()}\t${parcour === undefined ? "no data" : "has data"}`,
      parcour === undefined
        ? "color: #ff4444; font-weight: bold"
        : "color: #44ff44; font-weight: bold"
    )
  }, [type, parcour])

  useEffect(() => {
    if (type === "complete") {
      props.onReady()
    }
  }, [type, props])

  const onNodeDrag = useCallback<OnNodeDrag<AppNode>>((_event, node) => {
    if (node.type !== "ro-sign") {
      return
    }

    return
  }, [])

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      // check if the dropped element is valid
      if (!draggedSignNr) {
        return
      }

      addNode(draggedSignNr, { x: event.clientX, y: event.clientY })
    },
    [draggedSignNr, addNode]
  )

  useEffect(() => {
    // Return early if parcour data isn't available
    if (!parcour) {
      return
    }

    const remoteNodes: Array<AppNode> = parcour.nodes.map((node) => ({
      id: node.id,
      type: "ro-sign",
      data: { sign: node.sign!, rotation: node.rotation },
      position: { x: node.positionX, y: node.positionY }
    }))

    const remoteEdges: Array<AppEdge> = parcour.edges.map((edge) => ({
      id: edge.id,
      source: edge.sourceNodeId,
      target: edge.targetNodeId
    }))

    setRemoteNodesAndEdges(parcour.id, remoteNodes, remoteEdges)
  }, [props.parcoursId, parcour, setRemoteNodesAndEdges])

  if (!parcour && type === "complete") {
    return <div>Parcour not found</div>
  }

  // Flicker
  // console.log(type, parcour)
  if (!parcour) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] gap-2 bg-red-800">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <div className="h-full relative">
        <ReactFlow<AppNode | RoSignGroupNodeProps, AppEdge>
          nodes={nodes}
          edges={edges}
          // nodeOrigin={[1, 1]}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          onConnect={onConnect}
          connectionLineComponent={ConnectionLine}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeDrag={onNodeDrag}
          nodeTypes={nodeTypes}
          defaultViewport={{ x: 100, y: 100, zoom: 0.5 }}
          proOptions={proOptions}
          nodeExtent={[
            [0, 0],
            [1500, 1000]
          ]}
          translateExtent={[
            [-600, -600],
            [2400, 1600]
          ]}
        >
          <Controls position="bottom-left" aria-label="TODO" />
          <NodeExtentBackground />
          <ViewportPortal>
            {[0, 5, 10, 15, 20, 25, 30].map((meter) => (
              <Fragment key={meter}>
                <div
                  key={`t-${meter}`}
                  className="absolute text-slate-500"
                  style={{
                    transform: `translate(${meter * 50}px, -20px)`
                  }}
                >
                  {meter}
                </div>
                <div
                  className="absolute text-slate-500"
                  key={`b-${meter}`}
                  style={{
                    transform: `translate(${meter * 50}px, 1000px)`
                  }}
                >
                  {meter}
                </div>
              </Fragment>
            ))}
          </ViewportPortal>
        </ReactFlow>
        <div className="absolute top-4 left-20 flex gap-2">
          <Button size="icon" variant="outline" disabled={true} onClick={() => {}}>
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" disabled={true} onClick={() => {}}>
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )
}
