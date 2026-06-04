import { ImageResponse } from "next/og"

export const contentType = "image/png"
export const size = { width: 1200, height: 630 }

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1F3A5F 0%, #132339 100%)",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="2" width="18" height="20" rx="2" ry="2" />
            <line x1="12" y1="6" x2="12" y2="10" />
            <line x1="8" y1="6" x2="8" y2="10" />
            <line x1="16" y1="6" x2="16" y2="10" />
            <line x1="3" y1="14" x2="21" y2="14" />
          </svg>
          <span style={{ fontSize: 56, fontWeight: 700, color: "white" }}>
            AmsEstudio
          </span>
        </div>
        <span
          style={{
            fontSize: 32,
            color: "#F97316",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Arquitectura y Construcción en Panamá
        </span>
        <span
          style={{
            fontSize: 20,
            color: "#a3b7d3",
            textAlign: "center",
            marginTop: 20,
            maxWidth: 600,
          }}
        >
          Construimos hogares, comunidades y ciudades para el futuro
        </span>
      </div>
    ),
    { ...size },
  )
}
