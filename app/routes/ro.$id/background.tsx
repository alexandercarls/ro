import { useStore, useViewport } from "@xyflow/react"

export function NodeExtentBackground() {
  const nodeExtent = useStore((store) => store.nodeExtent)
  const { zoom, x, y } = useViewport()

  if (!nodeExtent) return null

  const [[minX, minY], [maxX, maxY]] = nodeExtent
  const width = maxX - minX
  const height = maxY - minY

  // Define grass pattern
  const grassPattern = (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern
        id="grassPattern"
        x="0"
        y="0"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M0,20 Q5,5 10,20 M10,20 Q15,5 20,20"
          stroke="rgba(0, 128, 0, 0.3)"
          fill="none"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grassPattern)" />
    </svg>
  )

  return (
    <>
      {/* Grass background */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none"
        }}
      >
        {grassPattern}
      </div>

      {/* Node extent border */}
      <div
        style={{
          position: "absolute",
          left: `${minX * zoom + x}px`,
          top: `${minY * zoom + y}px`,
          width: `${width * zoom}px`,
          height: `${height * zoom}px`,
          border: "2px dashed rgba(0, 200, 0, 1)",
          pointerEvents: "none",
          transform: "scale(1)",
          transformOrigin: "top left",
          background: "white"
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="gridPattern"
            width={50 * zoom}
            height={50 * zoom}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${50 * zoom} 0 L 0 0 0 ${50 * zoom}`}
              fill="none"
              stroke="rgba(0, 0, 0, 0.1)"
              strokeWidth={zoom}
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      </div>
    </>
  )
}
