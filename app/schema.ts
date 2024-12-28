// These data structures define your client-side schema.
// They must be equal to or a subset of the server-side schema.
// Note the "relationships" field, which defines first-class
// relationships between tables.
// See https://github.com/rocicorp/mono/blob/main/apps/zbugs/src/domain/schema.ts
// for more complex examples, including many-to-many.

import {
  ANYONE_CAN,
  createSchema,
  createTableSchema,
  definePermissions,
  type Row
} from "@rocicorp/zero"

const usersTable = createTableSchema({
  tableName: "users",
  columns: {
    id: "string",
    name: "string",
    email: "string"
  },
  primaryKey: "id"
})

const parcoursTable = createTableSchema({
  tableName: "parcours",
  columns: {
    id: "string",
    title: "string",
    description: "string",
    ownerId: "string",
    createdAt: { type: "number", optional: true },
    updatedAt: { type: "number", optional: true }
  },
  primaryKey: "id",
  relationships: {
    nodes: {
      sourceField: "id",
      destField: "parcoursId",
      destSchema: () => parcoursNodesTable
    },
    edges: {
      sourceField: "id",
      destField: "parcoursId",
      destSchema: () => parcoursEdgesTable
    }
    //   signs: [
    //     {
    //       sourceField: "id",
    //       destField: "parcoursId",
    //       destSchema: () => parcoursNodesTable
    //     },
    //     {
    //       sourceField: "signVdhId",
    //       destField: "id",
    //       destSchema: () => signsVdhTable
    //     }
    //   ]
  }
})

const signsVdhTable = createTableSchema({
  tableName: "signsVdh",
  columns: {
    id: "string",
    nr: "string",
    name: "string",
    description: "string",
    type: "string",
    isSenior: "boolean",
    inFront: "boolean"
  },
  primaryKey: "id"
})

const parcoursNodesTable = createTableSchema({
  tableName: "parcoursNodes",
  columns: {
    id: "string",
    parcoursId: "string",
    signVdhId: "string",
    positionX: "number",
    positionY: "number",
    rotation: "number"
  },
  primaryKey: "id",
  relationships: {
    sign: {
      sourceField: "signVdhId",
      destField: "id",
      destSchema: () => signsVdhTable
    }
  }
})

const parcoursEdgesTable = createTableSchema({
  tableName: "parcoursEdges",
  columns: {
    id: "string",
    parcoursId: "string",
    sourceNodeId: "string",
    targetNodeId: "string"
  },
  primaryKey: "id"
})

export const schema = createSchema({
  version: 1,
  tables: {
    users: usersTable,
    parcours: parcoursTable,
    signsVdh: signsVdhTable,
    parcoursNodes: parcoursNodesTable,
    parcoursEdges: parcoursEdgesTable
  }
})

export type Schema = typeof schema
export type User = Row<typeof usersTable>
export type Parcours = Row<typeof parcoursTable>
export type SignsVdh = Row<typeof signsVdhTable>
export type ParcoursNodes = Row<typeof parcoursNodesTable>
export type ParcoursEdges = Row<typeof parcoursEdgesTable>

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
