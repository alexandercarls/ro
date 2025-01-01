import type { Zero } from "@rocicorp/zero"
import type { Schema } from "~/schema"

export const preload = (z: Zero<Schema>) => {
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
