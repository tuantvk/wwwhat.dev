import "@/styles/globals.css"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"

const inter = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "wwwhat.dev",
  description: "What are you Waiting For?",
  icons: [
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout
