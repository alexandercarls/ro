import type { Route } from "./+types/route"

const API_HOST = "eu.i.posthog.com"
const ASSET_HOST = "eu-assets.i.posthog.com"

const posthogProxy = async (request: Request) => {
  const url = new URL(request.url)
  const hostname = url.pathname.startsWith("/ingest/static/") ? ASSET_HOST : API_HOST

  const newUrl = new URL(url)
  newUrl.protocol = "https"
  newUrl.hostname = hostname
  newUrl.port = "443"
  newUrl.pathname = newUrl.pathname.replace(/^\/ingest/, "")

  const headers = new Headers(request.headers)
  headers.set("host", hostname)

  const fetchOptions: RequestInit = {
    method: request.method,
    headers,
    redirect: "follow"
  }

  if (!["GET", "HEAD"].includes(request.method)) {
    fetchOptions.body = request.body
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    fetchOptions.duplex = "half" // Required for streaming request body
  }

  const response = await fetch(newUrl, fetchOptions)

  const newHeaders = new Headers(response.headers)
  newHeaders.delete("content-encoding")
  newHeaders.delete("content-encoding")
  newHeaders.delete("content-length")
  newHeaders.delete("transfer-encoding")

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  })
}

export const loader = async ({ request }: Route.LoaderArgs) => posthogProxy(request)

export const action = async ({ request }: Route.ActionArgs) => posthogProxy(request)
