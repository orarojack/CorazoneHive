import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "@/components/ui/toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pinkie's Store - Sweet Delights & Beautiful Flowers",
  description:
    "Your one-stop shop for ice cream, chocolates, flowers, Oreos, and milk products. Made with love, delivered with care.",
  keywords: "ice cream, chocolates, flowers, oreos, milk products, delivery, sweet treats",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
