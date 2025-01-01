import { type DragEvent, type FC, useEffect, useState } from "react"
import { useParcoursStore } from "./store"
import { SidebarSign } from "./sidebar-sign"
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "~/components/ui/multi-sidebar"
import { useQuery } from "@rocicorp/zero/react"
import { useZ } from "~/hooks/use-z"
import { escapeLike } from "@rocicorp/zero"
import { usePreloadStore } from "../ro/preload-store"

export const RightSidebar: FC = () => {
  const z = useZ()
  const setReady = usePreloadStore((s) => s.setReady)
  const [filter, setFilter] = useState<string[]>([])
  const [directionFilter, setDirectionFilter] = useState<string>()
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const setDraggedType = useParcoursStore((state) => state.setDraggedSign)
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    setDraggedType(nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  let q = z.query.signsVdh.orderBy("nr", "asc")

  // Apply direction filter
  if (directionFilter) {
    q = q.where("name", "LIKE", `%${escapeLike(directionFilter)}%`)
  }

  // apply sign type filter
  if (filter.length > 0) {
    q = q.where(({ or, cmp }) =>
      or(
        ...filter.flatMap((f) => {
          if (f === "sitz ") {
            return [
              cmp("name", "ILIKE", `%${escapeLike(f)}%`),
              cmp("name", "ILIKE", `%${escapeLike("halt")}%`)
            ]
          }
          return [cmp("name", "ILIKE", `%${escapeLike(f)}%`)]
        })
      )
    )
  }

  // apply type filter
  if (typeFilter.length > 0) {
    q = q.where(({ or, cmp }) =>
      or(...typeFilter.map((f) => cmp("nr", "LIKE", `${escapeLike(f)}%`)))
    )
  }

  const [signs, { type }] = useQuery(q)

  useEffect(() => {
    if (type === "complete") {
      setReady(true)
    }
  }, [type, setReady])

  return (
    <Sidebar side="right" variant="inset">
      <SidebarHeader>
        <p>Schilder</p>
        <ToggleGroup
          size={"lg"}
          type="multiple"
          onValueChange={(value) => {
            setFilter(value)
          }}
        >
          <ToggleGroupItem value="platz" aria-label="Toggle bold">
            Platz
          </ToggleGroupItem>
          <ToggleGroupItem value="sitz" aria-label="Toggle italic">
            Sitz/Halt
          </ToggleGroupItem>
        </ToggleGroup>
        <small>Richtung</small>
        <ToggleGroup
          size={"lg"}
          type="single"
          onValueChange={(value) => setDirectionFilter(value)}
        >
          <ToggleGroupItem value="links" aria-label="Toggle underline">
            Links
          </ToggleGroupItem>
          <ToggleGroupItem value="rechts" aria-label="Toggle underline">
            Rechts
          </ToggleGroupItem>
          <ToggleGroupItem value="180" aria-label="Toggle underline">
            Kehrtwende
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup
          size="sm"
          type="multiple"
          onValueChange={(value) => setTypeFilter(value)}
        >
          <ToggleGroupItem value="b" aria-label="Toggle underline">
            B
          </ToggleGroupItem>
          <ToggleGroupItem value="1" aria-label="Toggle underline">
            1
          </ToggleGroupItem>
          <ToggleGroupItem value="2" aria-label="Toggle underline">
            2
          </ToggleGroupItem>
          <ToggleGroupItem value="3" aria-label="Toggle underline">
            3
          </ToggleGroupItem>
        </ToggleGroup>
      </SidebarHeader>
      <SidebarContent className="grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] place-content-start gap-1">
        {signs.map((sign) => (
          <SidebarSign
            className="h-16"
            key={sign.nr}
            sign={sign}
            onDragStart={onDragStart}
          />
        ))}
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail side="right" />
    </Sidebar>
  )
}
