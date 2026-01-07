import type React from "react"
import type { Metadata } from "next"
import { Exo_2 } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ClientLayoutWrapper } from "@/components/client-layout-wrapper"

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-exo2",
})

export const metadata: Metadata = {
  title: "GenieLabs | Best AI Powered Development Toolkit 2026",
  description: "Explore the ultimate AI code generation toolkit with CI/CD integration. Secure AI coding assistant for fintech and enterprise software modernization.",
  keywords: [
    "best AI powered development toolkit 2026",
    "AI code generation toolkit with CI/CD integration",
    "open-source AI development toolkit 2026",
    "AI toolkit for enterprise software modernization",
    "secure AI coding assistant for fintech 2026",
    "AI API testing automation toolkit",
    "low-code AI mobile app development toolkit",
    "AI green coding toolkit carbon reduction"
  ],
  authors: [{ name: "sdad.pro" }],
  openGraph: {
    title: "GenieLabs | AI Powered Development Toolkit",
    description: "Transform your development workflow with the most advanced AI tools for bug fixing, code analysis, and high-performance generation.",
    url: "https://genielabs.sdad.pro",
    siteName: "GenieLabs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GenieLabs AI Toolkit",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GenieLabs | AI Powered Development Toolkit",
    description: "The secure AI coding assistant for fintech and enterprise software modernization.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${exo2.className} ${exo2.variable} no-horizontal-overflow bg-black text-white antialiased`}>
        <SmoothScroll>
          <div className="flex min-h-screen flex-col">
            <Header />
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}



import './globals.css'