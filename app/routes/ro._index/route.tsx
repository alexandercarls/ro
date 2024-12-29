import { Link } from "react-router"
import { intlFormatDistance } from "date-fns"
import type { Route } from "../ro._index/+types/route"
import { useZ } from "~/hooks/use-z"
import { useQuery } from "@rocicorp/zero/react"
import { Button } from "~/components/ui/button"
import { createParcour } from "../ro.$id/mutators"

// eslint-disable-next-line no-empty-pattern
export default function Parkour({}: Route.ComponentProps) {
  const z = useZ()

  const [parcours] = useQuery(z.query.parcours.orderBy("updatedAt", "desc"))

  return (
    <div>
      <h1>RO Parcours</h1>
      <Button onClick={() => createParcour(z)}>Create</Button>
      <ul className="divide-y divide-gray-100">
        {parcours.map((parcours) => (
          <li key={parcours.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <Link to={parcours.id} className="hover:underline">
                    {parcours.id}
                  </Link>
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  <a href={`mailto:${parcours.id}`} className="truncate hover:underline">
                    {parcours.id}
                  </a>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{"TODO"}</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  last update{" "}
                  <time dateTime={new Date(parcours.updatedAt!).toISOString()}>
                    {intlFormatDistance(new Date(parcours.updatedAt!), new Date())}
                  </time>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
