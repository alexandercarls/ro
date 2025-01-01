import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "react-router"
import type { Route } from "./+types/root"
import stylesheet from "./app.css?url"
import { Zero } from "@rocicorp/zero"
import { schema } from "./schema"
import { ZeroProvider } from "@rocicorp/zero/react"
import posthog from "posthog-js"
import { useEffect } from "react"
import { create } from "zustand"

export const links: Route.LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }]

export function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {props.children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export const clientLoader = () => {
  return null
}

export function HydrateFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4" />
      <p className="text-lg">Loading your rally obedience course...</p>
      <p className="text-sm text-gray-600">Get ready to explore!</p>
    </div>
  )
}

function PosthogInit() {
  useEffect(() => {
    posthog.init("phc_QI5FO8rh3mwacv5T4e9A59zOmvxtim9B04hXhpkXL2B", {
      api_host: "/ingest",
      ui_host: "https://eu.posthog.com",
      person_profiles: "always"
    })
  }, [])

  return null
}

type ZeroStore = {
  z: Zero<typeof schema> | null
  createZero: (userId: string) => void
}

const useZeroStore = create<ZeroStore>((set) => ({
  z: null,
  createZero: (userId: string) => {
    const newZ = new Zero({
      userID: userId,
      auth: () => undefined,
      server: import.meta.env.VITE_PUBLIC_SERVER,
      schema,
      kvStore: "idb"
    })
    set({ z: newZ })
  }
}))

// eslint-disable-next-line no-empty-pattern
export default function App({}: Route.ComponentProps) {
  const { z, createZero } = useZeroStore()

  useEffect(() => {
    // Initialize with guest user - you can change this as needed
    console.log("createZero")
    createZero("guest")
  }, [createZero]) // Only run once on mount

  if (!z) return null

  return (
    <ZeroProvider zero={z}>
      <Outlet />
      {import.meta.env.PROD && <PosthogInit />}
    </ZeroProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
