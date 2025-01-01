import { createStore, useStore } from "zustand"
import type { ReactNode } from "react"
import React from "react"
import { useRef } from "react"
import type { StoreApi } from "zustand"
import { useZ } from "~/hooks/use-z"
import { preload } from "../ro.$id/preload"

type PreloadState = {
  isReady: boolean
  setReady: (ready: boolean) => void
  callCount: number
}

const StoreContext = React.createContext<StoreApi<PreloadState> | null>(null)

export const PreloadProvider = ({
  children,
  requiredCalls
}: {
  children: ReactNode
  requiredCalls: number
}) => {
  const storeRef = useRef<StoreApi<PreloadState>>(null)
  const z = useZ()

  if (!storeRef.current) {
    storeRef.current = createStore((set, get) => ({
      isReady: false,
      callCount: 0,
      setReady: (ready) => {
        const currentState = get()
        if (!currentState.isReady) {
          set({ callCount: currentState.callCount + 1 })
          if (currentState.callCount + 1 === requiredCalls) {
            console.log("preloading")
            preload(z)
            set({ isReady: ready })
          }
        }
      }
    }))
  }
  return (
    <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePreloadStore = <T,>(selector: (state: PreloadState) => T): T => {
  const store = React.useContext(StoreContext)
  if (!store) {
    throw new Error("Missing StoreProvider")
  }
  return useStore(store, selector)
}
