import * as React from "react"
import { ExternalLink } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "~/components/ui/drawer"
import { type FC } from "react"
import type { SignVdh } from "~/lib/types"

export const SignDetailsDrawer: FC<{ sign: SignVdh; children: React.ReactNode }> = (
  props
) => (
  <Drawer>
    <DrawerTrigger asChild>{props.children}</DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>{props.sign.name}</DrawerTitle>
          <DrawerDescription>{props.sign.nr}</DrawerDescription>
          <Button className="absolute top-2 right-2" size="icon" variant="ghost" asChild>
            <a href={`/vdh/${props.sign.nr}.avif`} target="_blank" rel="noreferrer">
              <ExternalLink />
            </a>
          </Button>
        </DrawerHeader>
        <img src={`/vdh/${props.sign.nr}.avif`} alt="" />
        <div className="p-4 pb-0">{props.sign.description}</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
)
