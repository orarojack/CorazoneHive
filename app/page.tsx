import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Zap, Heart, Award, TrendingUp } from "lucide-react"
import { getProducts, getCategories } from "@/lib/api/products"

export default async function HomePage() {
  const products = await getProducts()
  const categories = await getCategories()

  const flashSaleProducts = products.filter((p) => p.onSale).slice(0, 6)
  const popularProducts = products.filter((p) => p.popular).slice(0, 8)

  const categoryStats = categories.map((category) => ({
    name: category.name,
    icon: category.icon,
    count: products.filter((p) => p.category.toLowerCase() === category.name.toLowerCase()).length,
    color: "from-purple-400 to-purple-300", // Use consistent purple theme
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      {/* Header */}
      <header className="glass-purple sticky top-0 z-50 border-b border-purple-300/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 purple-gradient rounded-xl flex items-center justify-center shadow-corazone">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  CORA<span className="text-red-400">ZON</span>HIVES
                </h1>
                <p className="text-xs text-purple-200">You Have Tasted The Rest, Now Taste The Best</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-white hover:text-purple-200 transition-colors font-medium">
                Home
              </Link>
              <Link href="/products" className="text-white hover:text-purple-200 transition-colors font-medium">
                Products
              </Link>
              <Link href="/cart">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm text-white hover:text-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 purple-gradient rounded-full opacity-20 animate-float"></div>
          <div
            className="absolute bottom-10 right-10 w-16 h-16 red-gradient rounded-full opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full border border-white/20 mb-8 shadow-corazone">
            <Award className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Premium Quality • Fast Delivery • Best Prices</span>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Sweet Delights
            <br />
            <span className="text-4xl md:text-5xl text-gradient-purple">Await You</span>
          </h2>

          <p className="text-lg text-purple-100 mb-10 max-w-3xl mx-auto">
            Experience Kenya's finest collection of premium ice cream, chocolates, flowers, and sweet treats. Crafted
            with love, delivered with care to your doorstep across Nairobi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                className="purple-gradient hover:shadow-corazone-lg text-white px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Shop Now
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold rounded-xl glass-effect transition-all duration-300 bg-transparent"
            >
              View Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Banner */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-corazone-lg">
            <Image
              src="/images/corazonehives-banner.png"
              alt="CorazoneHives Banner"
              width={1200}
              height={300}
              className="w-full h-48 md:h-60 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-center">
              <div className="px-6 md:px-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">YOU HAVE TASTED THE REST</h3>
                <h4 className="text-xl md:text-2xl font-bold text-gradient-red">NOW TASTE THE BEST</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-white">Shop by Category</h3>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              Explore our carefully curated selection of premium products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryStats.map((category) => (
              <Link key={category.name} href={`/products?category=${category.name.toLowerCase().replace(" ", "-")}`}>
                <Card className="hover:shadow-corazone-lg transition-all duration-500 hover:scale-105 border-white/20 hover:border-white/40 glass-effect group">
                  <CardContent className="p-6 text-center relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <h4 className="font-bold text-white mb-2">{category.name}</h4>
                      <p className="text-sm text-purple-200">{category.count} items</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sales */}
      {flashSaleProducts.length > 0 && (
        <section className="py-16 px-4 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="flex items-center justify-center mb-12">
              <div className="glass-effect rounded-2xl px-8 py-4 border border-white/30 shadow-corazone-lg">
                <div className="flex items-center">
                  <Zap className="w-8 h-8 text-white mr-3 animate-pulse" />
                  <h3 className="text-3xl font-bold text-white">Flash Sale</h3>
                  <Zap className="w-8 h-8 text-white ml-3 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashSaleProducts.map((product) => (
                <Card
                  key={product.id}
                  className="glass-effect hover:shadow-corazone-lg transition-all duration-500 hover:scale-105 border-white/30 group"
                >
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <Badge className="absolute top-3 right-3 red-gradient text-white px-3 py-1 text-sm font-bold rounded-full shadow-lg animate-pulse">
                        {product.discount}% OFF
                      </Badge>
                      <div className="absolute top-3 left-3 purple-gradient text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                        FLASH SALE
                      </div>
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
                        <span className="text-xl font-bold text-white">KSh {product.salePrice?.toLocaleString()}</span>
                        <span className="text-sm text-purple-300 line-through ml-2">
                          KSh {product.price.toLocaleString()}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="purple-gradient hover:shadow-corazone text-white rounded-xl px-4 py-2 font-bold transition-all duration-300 transform hover:scale-105"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-white">Popular Products</h3>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              Customer favorites that keep coming back for more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-corazone-lg transition-all duration-500 hover:scale-105 border-white/20 hover:border-white/40 glass-effect group"
              >
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 glass-effect hover:bg-white/20 rounded-full shadow-corazone"
                    >
                      <Heart className="w-4 h-4 text-red-400" />
                    </Button>
                    <div className="absolute top-3 left-3 purple-gradient text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      POPULAR
                    </div>
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
                    <span className="text-xl font-bold text-white">KSh {product.price.toLocaleString()}</span>
                    <Button
                      size="sm"
                      className="purple-gradient hover:shadow-corazone text-white rounded-xl px-4 py-2 font-bold transition-all duration-300 transform hover:scale-105"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 glass-effect px-8 py-3 text-lg font-semibold rounded-xl shadow-corazone transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-12 px-4 border-t border-purple-500/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 purple-gradient rounded-xl flex items-center justify-center shadow-corazone">
                  <span className="text-white font-bold">C</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    CORA<span className="text-red-400">ZON</span>HIVES
                  </h3>
                  <p className="text-sm text-purple-300">Premium Sweet Delights</p>
                </div>
              </div>
              <p className="text-purple-200 leading-relaxed">
                Kenya's premier destination for premium ice cream, chocolates, and sweet treats. Quality guaranteed,
                happiness delivered across Nairobi.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg text-gradient-purple">Quick Links</h4>
              <ul className="space-y-3 text-purple-200">
                <li>
                  <Link href="/" className="hover:text-white transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-white transition-colors duration-300">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-white transition-colors duration-300">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg text-gradient-purple">Categories</h4>
              <ul className="space-y-3 text-purple-200">
                <li>
                  <Link href="/products?category=ice-cream" className="hover:text-white transition-colors duration-300">
                    Ice Cream
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=chocolates"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Chocolates
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=flowers" className="hover:text-white transition-colors duration-300">
                    Flowers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg text-gradient-purple">Contact</h4>
              <div className="space-y-3 text-purple-200">
                <p>📱 WhatsApp: +254 700 123 456</p>
                <p>📧 Email: hello@corazonehives.co.ke</p>
                <p>📍 Nairobi, Kenya</p>
                <p>🕒 Mon-Sun: 8AM - 10PM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-500/20 mt-10 pt-8 text-center text-purple-300">
            <p>&copy; 2024 CorazoneHives. All rights reserved. Made with ❤️ in Kenya</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
