"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  variant?: "default" | "flash-sale" | "popular"
}

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <Card className="hover:shadow-corazone-lg transition-all duration-500 hover:scale-105 border-white/20 hover:border-white/40 glass-effect group">
      <CardContent className="p-6">
        <div className="relative mb-6">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded-xl"
          />
          {product.onSale && (
            <Badge className="absolute top-3 right-3 red-gradient text-white px-3 py-1 text-sm font-bold rounded-full shadow-lg animate-pulse">
              {product.discount}% OFF
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 glass-effect hover:bg-white/20 rounded-full shadow-corazone"
          >
            <Heart className="w-4 h-4 text-red-400" />
          </Button>
          {variant === "flash-sale" && (
            <div className="absolute top-3 left-3 purple-gradient text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              FLASH SALE
            </div>
          )}
          {variant === "popular" && (
            <div className="absolute top-3 left-3 purple-gradient text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              POPULAR
            </div>
          )}
        </div>
        <h4 className="font-bold text-white mb-3 text-lg leading-tight">{product.name}</h4>
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < product.rating ? "text-white fill-current" : "text-gray-400"}`}
              />
            ))}
          </div>
          <span className="text-sm text-purple-200 ml-2">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-white">
              KSh {(product.salePrice || product.price).toLocaleString()}
            </span>
            {product.salePrice && (
              <span className="text-sm text-purple-300 line-through ml-2">
                KSh {product.price.toLocaleString()}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="purple-gradient hover:shadow-corazone text-white rounded-xl px-4 py-2 font-bold transition-all duration-300 transform hover:scale-105"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
