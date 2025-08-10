"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
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
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-purple-200 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products">
              <Button className="purple-gradient text-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
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
              <Link href="/" className="text-white hover:text-purple-200 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-white hover:text-purple-200 transition-colors">
                Products
              </Link>
              <span className="text-red-400 font-semibold">Cart ({getCartCount()})</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/products">
            <Button variant="ghost" className="text-white hover:text-purple-200 hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-white/20 shadow-corazone glass-effect">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Shopping Cart</h2>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border border-white/20 rounded-lg glass-effect"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <p className="text-sm text-purple-200 line-clamp-2">{item.description}</p>
                        <p className="text-lg font-bold text-white mt-1">
                          KSh {item.salePrice?.toLocaleString() || item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="border-white/20 hover:bg-white/10 text-white"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 0)}
                          className="w-16 text-center border-white/20 bg-white/10 text-white"
                          min="0"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="border-white/20 hover:bg-white/10 text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">
                          KSh {((item.salePrice || item.price) * item.quantity).toLocaleString()}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 mt-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-white/20 shadow-corazone sticky top-4 glass-effect">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-purple-200">Subtotal ({getCartCount()} items)</span>
                    <span className="font-semibold text-white">KSh {getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Shipping</span>
                    <span className="font-semibold text-white">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Tax</span>
                    <span className="font-semibold text-white">KSh {(getCartTotal() * 0.08).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-red-400">KSh {(getCartTotal() * 1.08).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button className="w-full purple-gradient text-white shadow-corazone">Proceed to Checkout</Button>
                </Link>
                <p className="text-xs text-purple-300 text-center mt-3">Secure checkout powered by WhatsApp</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
