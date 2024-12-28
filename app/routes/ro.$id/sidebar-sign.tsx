import { type FC, type DragEvent } from "react"
import { SignDetailsDrawer } from "./sign-details-drawer"
import { cn } from "~/lib/utils"
import type { SignVdh } from "~/lib/types"

type SidebarSignProps = {
  sign: SignVdh
  onDragStart: (event: DragEvent<HTMLDivElement>, nodeType: string) => void
  className?: string
}

export const SidebarSign: FC<SidebarSignProps> = (props) => {
  return (
    <SignDetailsDrawer sign={props.sign}>
      <div
        className={cn(
          "border border-green-200 rounded-sm active:cursor-grabbing cursor-grab",
          props.className
        )}
        onDragStart={(event) => props.onDragStart(event, props.sign.nr)}
        draggable
      >
        <div className="relative">
          <div className="absolute inset-0 h-16 flex items-center justify-center">
            <span className="text-3xl">🐶</span>
          </div>
          <img
            className="relative"
            loading="lazy"
            src={`/vdh/${props.sign.nr}.avif`}
            alt=""
            draggable={false}
          />
        </div>
      </div>
    </SignDetailsDrawer>
  )
}
