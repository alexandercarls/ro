import { Outlet } from "react-router"

export default function Parkour() {
  return (
    <div className="flex flex-col h-screen">
      <Outlet />
    </div>
  )
}
