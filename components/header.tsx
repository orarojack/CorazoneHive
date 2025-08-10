"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface HeaderProps {
  currentPage?: "home" | "products" | "cart"
}

export default function Header({ currentPage = "home" }: HeaderProps) {
  const { getCartCount } = useCart()

  return (
    <header className="glass-purple sticky top-0 z-50 border-b border-purple-300/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 purple-gradient rounded-xl flex items-center justify-center shadow-corazone">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                CORA<span className="text-red-400">ZON</span>HIVES
              </h1>
              <p className="text-xs text-purple-200">You Have Tasted The Rest, Now Taste The Best</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`transition-colors font-medium ${
                currentPage === "home" 
                  ? "text-red-400 font-bold" 
                  : "text-white hover:text-purple-200"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`transition-colors font-medium ${
                currentPage === "products" 
                  ? "text-red-400 font-bold" 
                  : "text-white hover:text-purple-200"
              }`}
            >
              Products
            </Link>
            <Link href="/cart">
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm text-white hover:text-white relative"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getCartCount() > 99 ? "99+" : getCartCount()}
                  </span>
                )}
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
