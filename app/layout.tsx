import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Petpresso",
  description: "Create beautiful pet profiles",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/cherry-bomb-one" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
