import type { Zero } from "@rocicorp/zero"
import type { Schema } from "~/schema"

export const createParcour = (z: Zero<Schema>) => {
  z.mutateBatch((tx) => {
    const user = z.query.users.one().run()!

    const parcourId = crypto.randomUUID()
    console.log("parcourId", parcourId)
    tx.parcours.insert({
      id: parcourId,
      title: "New Parcours",
      description: "New Parcours",
      ownerId: user.id,
      updatedAt: Date.now()
    })

    const signS = z.query.signsVdh.where("nr", "=", "S").one().run()!
    const nodeSid = crypto.randomUUID()
    console.log("s", signS.nr)
    tx.parcoursNodes.insert({
      id: nodeSid,
      parcoursId: parcourId,
      signVdhId: signS.id,
      positionX: 150,
      positionY: 250,
      rotation: 0
    })

    const signF = z.query.signsVdh.where("nr", "=", "F").one().run()!
    console.log("f", signF.nr)
    const nodeFid = crypto.randomUUID()
    tx.parcoursNodes.insert({
      id: nodeFid,
      parcoursId: parcourId,
      signVdhId: signF.id,
      positionX: 450,
      positionY: 450,
      rotation: 0
    })

    tx.parcoursEdges.insert({
      id: crypto.randomUUID(),
      sourceNodeId: nodeSid,
      targetNodeId: nodeFid,
      parcoursId: parcourId
    })
  })
}
