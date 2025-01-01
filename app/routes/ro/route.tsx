import { Outlet } from "react-router"
import { MultiSidebarProvider } from "~/components/ui/multi-sidebar"
import { LeftSidebar } from "../ro.$id/left-sidebar"
import { PreloadProvider } from "./preload-store"

export default function Parkour() {
  return (
    <div className="flex flex-col h-screen">
      <PreloadProvider>
        <MultiSidebarProvider>
          <LeftSidebar />
          <Outlet />
        </MultiSidebarProvider>
      </PreloadProvider>
    </div>
  )
}
