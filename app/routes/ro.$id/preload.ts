import type { Zero } from "@rocicorp/zero"
import type { Schema } from "~/schema"

let didPreload = false

export const preload = (z: Zero<Schema>) => {
  console.log("preloading")
  if (didPreload) {
    console.log("already preloaded")
    return
  }
  didPreload = true

  const { complete: completeSignsVdh } = z.query.signsVdh.preload()
  const { complete: completeUsers } = z.query.users.preload()
  const { complete: completeParcours } = z.query.parcours
    .related("nodes", (n) => n.related("sign", (s) => s.one()))
    .related("edges")
    .orderBy("updatedAt", "desc")
    .preload()

  Promise.all([completeSignsVdh, completeUsers, completeParcours]).then(() => {
    console.log("preloaded")
  })
}
