import { Outlet } from "react-router"
import {
  MultiSidebarProvider,
  SIDEBAR_LEFT_COOKIE_NAME,
  SIDEBAR_RIGHT_COOKIE_NAME
} from "~/components/ui/multi-sidebar"
import { LeftSidebar } from "../ro.$id/left-sidebar"
import { usePreloadStore } from "./preload-store"
import { HydrateFallback } from "~/root"
import { useMemo } from "react"

// Parse cookie values for sidebar states
const getCookieValue = (name: string) => {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name))
    ?.split("=")[1]

  return value === "true"
}

export default function Parkour() {
  const isReady = usePreloadStore((s) => s.isReady)

  const sidebarStates = useMemo(
    () => ({
      leftSidebarOpen: getCookieValue(SIDEBAR_LEFT_COOKIE_NAME),
      rightSidebarOpen: getCookieValue(SIDEBAR_RIGHT_COOKIE_NAME)
    }),
    []
  )

  return (
    <div className="flex flex-col h-screen relative">
      <MultiSidebarProvider
        defaultLeftOpen={sidebarStates.leftSidebarOpen}
        defaultRightOpen={sidebarStates.rightSidebarOpen}
      >
        <LeftSidebar />
        <Outlet />
      </MultiSidebarProvider>
      {!isReady && <HydrateFallback />}
    </div>
  )
}
