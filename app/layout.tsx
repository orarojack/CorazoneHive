import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { DeliveryProvider } from "@/lib/delivery-context"
import { Toaster } from "@/components/ui/toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CorazoneHives - Premium Sweet Delights & Beautiful Flowers",
  description:
    "Your one-stop shop for premium ice cream, chocolates, flowers, and sweet treats. Made with love, delivered with care across Nairobi.",
  keywords: "ice cream, chocolates, flowers, sweet treats, delivery, nairobi, kenya, premium desserts",
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
          <DeliveryProvider>
            {children}
            <Toaster />
          </DeliveryProvider>
        </CartProvider>
      </body>
    </html>
  )
}
