import type { Route } from "./+types/up"

// eslint-disable-next-line no-empty-pattern
export const loader = async ({}: Route.LoaderArgs) => {
  return Response.json({ message: "ok" })
}
