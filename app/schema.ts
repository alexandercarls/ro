// These data structures define your client-side schema.
// They must be equal to or a subset of the server-side schema.
// Note the "relationships" field, which defines first-class
// relationships between tables.
// See https://github.com/rocicorp/mono/blob/main/apps/zbugs/src/domain/schema.ts
// for more complex examples, including many-to-many.

import {
  ANYONE_CAN,
  boolean,
  createSchema,
  definePermissions,
  number,
  relationships,
  string,
  table,
  type Row
} from "@rocicorp/zero"

const usersTable = table("users")
  .columns({
    id: string(),
    name: string(),
    email: string()
  })
  .primaryKey("id")

const parcoursTable = table("parcours")
  .columns({
    id: string(),
    title: string(),
    description: string(),
    ownerId: string(),
    createdAt: number().optional(),
    updatedAt: number().optional()
  })
  .primaryKey("id")

const signsVdhTable = table("signsVdh")
  .columns({
    id: string(),
    nr: string(),
    name: string(),
    description: string(),
    type: string(),
    isSenior: boolean(),
    inFront: boolean()
  })
  .primaryKey("id")

const parcoursNodesTable = table("parcoursNodes")
  .columns({
    id: string(),
    parcoursId: string(),
    signVdhId: string(),
    positionX: number(),
    positionY: number(),
    rotation: number()
  })
  .primaryKey("id")

const parcoursEdgesTable = table("parcoursEdges")
  .columns({
    id: string(),
    parcoursId: string(),
    sourceNodeId: string(),
    targetNodeId: string()
  })
  .primaryKey("id")

const parcoursNodesRelationships = relationships(parcoursNodesTable, ({ one }) => ({
  sign: one({
    sourceField: ["signVdhId"],
    destField: ["id"],
    destSchema: signsVdhTable
  })
}))

const parcoursRelationships = relationships(parcoursTable, ({ many }) => ({
  nodes: many({
    sourceField: ["id"],
    destField: ["parcoursId"],
    destSchema: parcoursNodesTable
  }),
  edges: many({
    sourceField: ["id"],
    destField: ["parcoursId"],
    destSchema: parcoursEdgesTable
  })
}))

export const schema = createSchema(1, {
  tables: [
    usersTable,
    parcoursTable,
    signsVdhTable,
    parcoursNodesTable,
    parcoursEdgesTable
  ],
  relationships: [parcoursRelationships, parcoursNodesRelationships]
})

export type Schema = typeof schema
export type User = Row<typeof schema.tables.users>
export type Parcours = Row<typeof schema.tables.parcours>
export type SignsVdh = Row<typeof schema.tables.signsVdh>
export type ParcoursNodes = Row<typeof schema.tables.parcoursNodes>
export type ParcoursEdges = Row<typeof schema.tables.parcoursEdges>

type AuthData = {
  sub: string | null
}

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
  return {
    parcours: {
      row: {
        insert: ANYONE_CAN
      }
    },
    signsVdh: {
      row: {
        insert: ANYONE_CAN
      }
    },
    signsVdhParcours: {
      row: {
        insert: ANYONE_CAN
      }
    }
  }
})
// const allowIfLoggedIn = (
//   authData: AuthData,
//   { cmpLit }: ExpressionBuilder<TableSchema>
// ) => cmpLit(authData.sub, "IS NOT", null);

//     const allowIfMessageSender = (
//       authData: AuthData,
//       { cmp }: ExpressionBuilder<typeof messageSchema>
//     ) => cmp("senderID", "=", authData.sub ?? "");

//     return {
//       medium: {
//         row: {
//           insert: NOBODY_CAN,
//           update: {
//             preMutation: NOBODY_CAN,
//           },
//           delete: NOBODY_CAN,
//         },
//       },
//       user: {
//         row: {
//           insert: NOBODY_CAN,
//           update: {
//             preMutation: NOBODY_CAN,
//           },
//           delete: NOBODY_CAN,
//         },
//       },
//       message: {
//         row: {
//           // anyone can insert
//           insert: ANYONE_CAN,
//           // only sender can edit their own messages
//           update: {
//             preMutation: [allowIfMessageSender],
//           },
//           // must be logged in to delete
//           delete: [allowIfLoggedIn],
//         },
//       },
//     };
//   });
