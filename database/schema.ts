import { sql } from "drizzle-orm"
import { pgTable as table } from "drizzle-orm/pg-core"
import * as t from "drizzle-orm/pg-core"

export const usersTable = table("users", {
  id: t.uuid().primaryKey().notNull(),
  name: t.varchar({ length: 255 }).notNull(),
  email: t.varchar({ length: 255 }).notNull().unique()
})

export const parcoursTable = table("parcours", {
  id: t.uuid().primaryKey().notNull(),
  ownerId: t
    .uuid()
    .references(() => usersTable.id)
    .notNull(),
  title: t.varchar({ length: 255 }).notNull(),
  description: t.text().notNull(),
  createdAt: t
    .timestamp()
    .default(sql`now()`)
    .notNull(),
  updatedAt: t
    .timestamp()
    .default(sql`now()`)
    .notNull()
})

export const signsVdhTable = table("signsVdh", {
  id: t.uuid().primaryKey().notNull(),
  nr: t.varchar({ length: 255 }).notNull().unique(),
  name: t.varchar({ length: 255 }).notNull(),
  description: t.text().notNull(),
  type: t.varchar({ length: 255 }).notNull(),
  // combination: t.jsonb().array(),
  isSenior: t.boolean().notNull().default(false),
  inFront: t.boolean().notNull().default(false)
})

export const parcoursNodesTable = table("parcoursNodes", {
  id: t.uuid().primaryKey().notNull(),
  parcoursId: t
    .uuid()
    .references(() => parcoursTable.id)
    .notNull(),
  signVdhId: t
    .uuid()
    .references(() => signsVdhTable.id)
    .notNull(),
  positionX: t.real().notNull(),
  positionY: t.real().notNull(),
  rotation: t.real().notNull().default(0)
})

export const parcoursEdgesTable = table("parcoursEdges", {
  id: t.uuid().primaryKey().notNull(),
  parcoursId: t
    .uuid()
    .references(() => parcoursTable.id)
    .notNull(),
  sourceNodeId: t
    .uuid()
    .references(() => parcoursNodesTable.id)
    .notNull(),
  targetNodeId: t
    .uuid()
    .references(() => parcoursNodesTable.id)
    .notNull()
})
