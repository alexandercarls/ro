import { Outlet } from "react-router"
import { MultiSidebarProvider } from "~/components/ui/multi-sidebar"
import { LeftSidebar } from "../ro.$id/left-sidebar"
import { usePreloadStore } from "./preload-store"
import { HydrateFallback } from "~/root"

export default function Parkour() {
  const isReady = usePreloadStore((s) => s.isReady)
  return (
    <div className="flex flex-col h-screen relative">
      <MultiSidebarProvider>
        <LeftSidebar />
        <Outlet />
      </MultiSidebarProvider>
      {!isReady && <HydrateFallback />}
    </div>
  )
}
