import { useEffect, type FC } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "~/components/ui/multi-sidebar"
import { useQuery } from "@rocicorp/zero/react"
import { useZ } from "~/hooks/use-z"
import { NavLink } from "react-router"
import { intlFormatDistance } from "date-fns/intlFormatDistance"
import { Plus, Lock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip"
import { createParcour } from "./mutators"
import { usePreloadStore } from "../ro/preload-store"

export const LeftSidebar: FC = () => {
  const z = useZ()
  const [parcours, { type }] = useQuery(z.query.parcours.orderBy("updatedAt", "desc"))
  const setReady = usePreloadStore((s) => s.setReady)

  useEffect(() => {
    if (type === "complete") {
      setReady(true)
    }
  }, [setReady, type])

  return (
    <Sidebar side="left" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => createParcour(z)}>
              <Plus />
              <span>Neuer Parcours</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupLabel>Angepinnt</SidebarGroupLabel>
          <SidebarGroupLabel>Meine</SidebarGroupLabel>
          <SidebarGroupContent>
            {parcours.map((parcours) => (
              <NavLink
                to={parcours.id}
                key={parcours.id}
                className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground aria-[current='page']:bg-sidebar-selected-background aria-[current='page']:text-sidebar-selected-foreground"
              >
                <div className="flex w-full items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger tabIndex={-1}>
                      <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Private</span>
                    </TooltipContent>
                  </Tooltip>
                  <span className="overflow-hidden text-ellipsis">{parcours.title}</span>
                  <span className="ml-auto shrink-0 text-xs">
                    {intlFormatDistance(new Date(parcours.updatedAt!), new Date())}
                  </span>
                </div>
                <span className="font-medium overflow-hidden text-ellipsis w-full">
                  {parcours.id}
                </span>
                <span className="line-clamp-2 w-full whitespace-break-spaces text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </span>
              </NavLink>
            ))}
          </SidebarGroupContent>
          <SidebarGroupLabel>Öffentlich</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
