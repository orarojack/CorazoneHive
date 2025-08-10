"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Search, Filter, Heart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import type { Product } from "@/lib/types"

interface ProductsPageClientProps {
  products: Product[]
  categories: any[]
}

export default function ProductsPageClient({ products, categories }: ProductsPageClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const { addToCart } = useCart()

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map((category) => ({ value: category.id, label: category.name })),
  ]

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category_id === selectedCategory
      return matchesSearch && matchesCategory
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.salePrice || a.price) - (b.salePrice || b.price)
        case "price-high":
          return (b.salePrice || b.price) - (a.salePrice || a.price)
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy, products])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      {/* Header */}
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
                <p className="text-xs text-purple-200">Premium Sweet Delights</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-white hover:text-purple-200 transition-colors font-medium">
                Home
              </Link>
              <Link href="/products" className="text-red-400 font-bold">
                Products
              </Link>
              <Link href="/cart">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm text-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3 text-white">Our Products</h2>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Discover our amazing collection of sweet treats and beautiful flowers
          </p>
        </div>

        {/* Filters */}
        <div className="glass-effect rounded-xl border border-white/20 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-white/20 focus:border-white/40 bg-white/10 text-white placeholder:text-purple-300"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-white/20 focus:border-white/40 bg-white/10 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-white/20 focus:border-white/40 bg-white/10 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center text-purple-200">
              <Filter className="w-4 h-4 mr-2" />
              <span>{filteredProducts.length} products found</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="hover:shadow-corazone-lg transition-all duration-300 hover:scale-105 border-white/20 hover:border-white/40 glass-effect"
            >
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg"
                    }}
                  />
                  {product.onSale && (
                    <Badge className="absolute top-2 left-2 red-gradient text-white text-xs font-bold">
                      {product.discount}% OFF
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" className="absolute top-2 right-2 glass-effect hover:bg-white/20">
                    <Heart className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
                <h4 className="font-semibold text-white mb-2 line-clamp-2 text-sm">{product.name}</h4>
                <p className="text-xs text-purple-200 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < product.rating ? "text-white fill-current" : "text-gray-400"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-purple-200 ml-2">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-white">
                      KSh {(product.salePrice || product.price).toLocaleString()}
                    </span>
                    {product.salePrice && (
                      <span className="text-xs text-purple-300 line-through ml-2">
                        KSh {product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="purple-gradient hover:shadow-corazone text-white text-xs px-3 py-1"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-purple-200">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
