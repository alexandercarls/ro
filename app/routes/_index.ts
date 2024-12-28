import { redirect } from "react-router"
import type { Route } from "./+types/_index"

// eslint-disable-next-line no-empty-pattern
export const loader = ({}: Route.LoaderArgs) => {
  return redirect("/ro")
}
