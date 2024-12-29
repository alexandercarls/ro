import React, { type FC, type ReactNode, useContext, useRef } from "react"
import { createStore, type StoreApi, useStore } from "zustand"
import {
  applyEdgeChanges,
  addEdge,
  MarkerType,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  type XYPosition,
  type BuiltInEdge,
  useReactFlow,
  applyNodeChanges,
  type OnNodeDrag
} from "@xyflow/react"
import { type RoSignNodeProps } from "./nodes/RoSignNode"
import { type RoSignGroupNodeProps } from "./nodes/RoSignGroupNode"
import { useZ } from "~/hooks/use-z"

export type AppNode = RoSignNodeProps | RoSignGroupNodeProps
export type AppEdge = BuiltInEdge

export type AppState = {
  nodes: Array<AppNode>
  edges: Array<AppEdge>
  draggedNode?: string
  onNodesChange: OnNodesChange<AppNode>
  onEdgesChange: OnEdgesChange<AppEdge>
  onNodeDragStart: OnNodeDrag<AppNode>
  onNodeDragStop: OnNodeDrag<AppNode>
  onConnect: OnConnect
  setDraggedSign: (nr: string) => void
  addNode: (nr: string, position: XYPosition) => void
  setRemoteNodesAndEdges: (
    parcoursId: string,
    nodes: Array<AppNode>,
    edges: Array<AppEdge>
  ) => void
  parcoursId: string
  setParcoursId: (id: string) => void
  parcourInitialised: boolean
}

// https://www.typescriptlang.org/play/?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wG4AoUSWOAbzgGUZokBBMYOAXzm1wIBeAVwDOMFADsAJmUrho8emiIoYSJi268cefMLGSpAegBuk4ABsLKWeTQQJYuMtRqAWqPHSAwg7UAPeABeOAAecjg4ABUASQlgGGAUCwAaCOiNIjgkQKRpEUZmInZgUMkATwA+NMqACnSAcyQYTKQALjha4HjE5I7YnqSLAEo4IMqMoqQ00fG6dPtHeF8JAODEYhgAOhdVJBW1+sjIiSErOBQCiouCqNa0yOGKBYcnAAUcE2ApJCgxzrAODAIg6tHSkTQAAtLFIiBIAPwdZDobbIjAAOQgPwoxzg3QSQwAaskhO1onECckcdxZhMwbjFk4ANpiFgAXX+aO2onU4jUtVqtPBxyaLSmtUBEGBW3xvQsxIspOGD2OT3IwqIMCEUAknWFkVCBxy2w+EC+Pz+ZkVSCCtFZRC4lX1x1okulUJhcK4ztCRiNgS2pvNvyduLVkS4z0imu1uvpxx5-pgHUFYwmXK2ib8xtqSeVwqTKsiQe+vxVkfIFfIMHKYCQhT2-3jACNUFAQXBTiBW1Bqd1diIkG8pWdVMAHCmux0uz3aXATBBvhQq4z4AAhNtMISYTD-XbuTyGJNHTqyoZMPaguCtlDt6dCbu-Glp+a4mM65wqNStUIXtR1YYBUHGA51qeNcRvO88UGZI-yQLZIJEItjn7FRB2HMBR0SCdOmbcohVxXFgKAvkkFA8DCMiRCOgMNQELbAoAGpr3KZDcS4YZ83YzjqS4GZnlXOB2DAf5UzmeN311E8DQ3W8tx3QNPlLKBnTPZIFVJW0KIghiOgARjY7hvVxUNCIAWXKISwDAYVfVkqB5MwRSzWU0y1QrIA
const ParcourContext = React.createContext<StoreApi<AppState> | null>(null)

export const ParcoursProvider: FC<{
  children: ReactNode
  nodes: Array<AppNode>
  edges: Array<AppEdge>
  parcoursId: string
}> = (props) => {
  const z = useZ()
  const storeRef = useRef<StoreApi<AppState>>(null)
  const { screenToFlowPosition } = useReactFlow()

  // The provider gets updated when the nodes or edges change
  // However, as of now we enfore a single instance and don't update reactively
  // Explore this a little bit later, this would enable some real time updates
  // I currently decoupled it, as I don't want to emit thousands of position updates
  // AFAIK this and some UI state like selection is considered UI state
  // Maybe we can merge UI State and z state in the future or integrate the reactive diff hook that will
  // be released in the future like useWatchQuert.
  // We don't support rollback, this might result in a state drift

  if (!storeRef.current) {
    storeRef.current = createStore<AppState>((set, get) => ({
      nodes: props.nodes,
      edges: props.edges,
      parcourInitialised: false,
      setRemoteNodesAndEdges: (parcoursId, nodes, edges) => {
        // We don't want to override extsting state (yet)
        // - selection
        // - drag dimensions event
        if (get().parcourInitialised) {
          return
        }

        set({ nodes, edges, parcourInitialised: true })
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onNodeDragStart: (_event, _node, _nodes) => {
        // console.log("onNodeDragStart")
        // TODO: Add CQRS for Undo/Redo of all nodes
        // - Save Start Position here
        // - Save End Position at Stop Event
        // Commit z at command stream or at stop event
      },
      onNodeDragStop: (_event, _node, nodes) => {
        // console.log("onNodeDragStop")
        for (const n of nodes) {
          z.mutate.parcoursNodes.update({
            id: n.id,
            positionX: n.position.x,
            positionY: n.position.y
          })
        }
        // console.log("parcoursId store", get().parcoursId)
        z.mutate.parcours.update({
          id: get().parcoursId!,
          updatedAt: Date.now()
        })
      },
      onNodesChange: (changes) => {
        // console.groupCollapsed("onNodesChange")
        for (const change of changes) {
          // console.log("change", change.type)

          switch (change.type) {
            case "remove":
              // // console.log("remove node", change.id)
              z.mutate.parcoursNodes.delete({
                id: change.id
              })
              break
            case "replace": {
              // console.log("replace node", change)
              // cha
              if (change.item.type !== "ro-sign") {
                // console.log("not a ro-sign", change)
                break
              }
              const rotation = change.item.data.rotation ?? 0
              // console.log("rotation", rotation)
              z.mutate.parcoursNodes.update({
                id: change.id,
                // positionX: change.node.position!.x,
                // positionY: change.node.position!.y,
                rotation
              })
              break
            }
            case "position":
              // if (!change.position) {
              //   // console.log("no position", change)
              //   break
              // }
              // // console.log("position node", change)
              // z.mutate.parcoursNodes.update({
              //   id: change.id,
              //   positionX: change.position!.x,
              //   positionY: change.position!.y
              // })
              // Will get persisted by dragStop instead
              break
          }
        }
        // // console.groupEnd()

        // Persist changes to in-memory state of React Flow
        const updatedNodes = applyNodeChanges(changes, get().nodes)
        // console.log("applyNodeChanges", updatedNodes)
        set({
          nodes: updatedNodes
        })
      },
      onEdgesChange: (changes) => {
        // console.groupCollapsed("onEdgesChange")
        for (const change of changes) {
          // console.log("change", change.type)
          switch (change.type) {
            case "remove":
              z.mutate.parcoursEdges.delete({
                id: change.id
              })
              break
            case "add":
              // // console.log("add edge", change)
              // z.mutate.parcoursEdges.insert({
              //   id: change.id,
              //   from: change.source,
              //   to: change.target
              // })
              break
          }
        }
        set({ edges: applyEdgeChanges(changes, get().edges) })
        // // console.groupEnd()
      },
      onConnect: (connection) => {
        // console.groupCollapsed("onConnect")
        z.mutate.parcoursEdges.insert({
          id: crypto.randomUUID(),
          parcoursId: get().parcoursId!,
          sourceNodeId: connection.source,
          targetNodeId: connection.target
        })
        set({
          edges: addEdge(
            {
              ...connection,
              // type: "smoothstep", // bezier
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: "#FF0072"
              }
            },
            get().edges
          )
        })
        // // console.groupEnd()
      },
      setDraggedSign: (nr: string) => set({ draggedNode: nr }),
      addNode: (nr: string, screenPosition: XYPosition) => {
        const sign = z.query.signsVdh.where("nr", "=", nr).one().run()!

        const position = screenToFlowPosition(screenPosition)
        console.log("addNode", position)
        console.log("screen", screenPosition)

        const id = crypto.randomUUID()
        z.mutate.parcoursNodes.insert({
          id,
          parcoursId: get().parcoursId!,
          signVdhId: sign.id,
          positionX: position.x,
          positionY: position.y,
          rotation: 0
        })

        const newNode: AppNode = {
          id,
          type: "ro-sign",
          position: position,
          data: { sign, rotation: 0 }
        }

        set({ nodes: [newNode, ...get().nodes] })
      },
      parcoursId: props.parcoursId,
      setParcoursId: (id: string) => set({ parcoursId: id, parcourInitialised: false })
    }))
  }

  return (
    <ParcourContext.Provider value={storeRef.current}>
      {props.children}
    </ParcourContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useParcoursStore = <T,>(selector: (state: AppState) => T): T => {
  const store = useContext(ParcourContext)
  if (!store) {
    throw new Error("Missing ParcoursProvider")
  }
  return useStore(store, selector)
}
