import { drizzle } from "drizzle-orm/postgres-js"
import { eq } from "drizzle-orm"
import postgres from "postgres"
import { env } from "~/env.server"
import { schema } from "~/schema"
import { seed as seedVdh } from "./seed/vdh"
import { parcoursEdgesTable, parcoursNodesTable, parcoursTable, signsVdhTable, usersTable } from "./schema"

const client = postgres(env.DATABASE_URL)
const db = drizzle(client, { schema })

// Add these type definitions
export type Transaction = Parameters<Parameters<(typeof db)["transaction"]>[0]>[0]
type TransactionOrDB = Transaction | typeof db

export type DB = TransactionOrDB
async function seed() {
  await db.transaction(async (tx) => {
    await seedVdh(tx)

    const [user] = await tx.insert(usersTable).values({
      id: crypto.randomUUID(),
      name: "John",
      email: "xander.carls@gmail.com"
    }).returning()

    console.log("New user created!", user)
    const [parcours] = await tx.insert(parcoursTable).values({
      id: crypto.randomUUID(),
      title: "New Parcours",
      description: "New Parcours",
      ownerId: user.id,
    }).returning()
    console.log("New parcours created!", parcours)

    const [signS] = await tx.select().from(signsVdhTable).where(eq(signsVdhTable.nr, "S"))

    const [sNode] = await tx.insert(parcoursNodesTable).values({
      id: crypto.randomUUID(),
      parcoursId: parcours.id,
      signVdhId: signS.id,
      positionX: 150,
      positionY: 250,
      rotation: 0
    }).returning()

    const [signF] = await tx.select().from(signsVdhTable).where(eq(signsVdhTable.nr, "F"))

    const [fNode] = await tx.insert(parcoursNodesTable).values({
      id: crypto.randomUUID(),
      parcoursId: parcours.id,
      signVdhId: signF.id,
      positionX: 450,
      positionY: 450,
      rotation: 0
    }).returning()

    await tx.insert(parcoursEdgesTable).values({
      id: crypto.randomUUID(),
      parcoursId: parcours.id,
      sourceNodeId: sNode.id,
      targetNodeId: fNode.id
    })
  })
}

seed()
  .catch((error) => {
    console.error("Seed process failed:", error)
    process.exit(1)
  })
  .finally(() => {
    console.log("Seed process finished. Exiting...")
    process.exit(0)
  })
