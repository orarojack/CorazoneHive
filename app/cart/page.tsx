"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, MapPin, Phone, User } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useDelivery } from "@/lib/delivery-context"
import Header from "@/components/header"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart()
  const { deliveryInfo, updateDeliveryInfo, isDeliveryInfoComplete } = useDelivery()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
        <Header currentPage="cart" />

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
      <Header currentPage="cart" />

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
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-white/20 shadow-corazone glass-effect">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Shopping Cart</CardTitle>
              </CardHeader>
              <CardContent>
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

            {/* Delivery Information */}
            <Card className="border-white/20 shadow-corazone glass-effect">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-300" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={deliveryInfo.name}
                      onChange={(e) => updateDeliveryInfo("name", e.target.value)}
                      className="border-white/20 bg-white/10 text-white placeholder:text-purple-300"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white font-medium">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      placeholder="e.g., +254 700 123 456"
                      value={deliveryInfo.phone}
                      onChange={(e) => updateDeliveryInfo("phone", e.target.value)}
                      className="border-white/20 bg-white/10 text-white placeholder:text-purple-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area" className="text-white font-medium">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Delivery Area *
                    </Label>
                    <Input
                      id="area"
                      placeholder="e.g., Westlands, Kilimani, etc."
                      value={deliveryInfo.area}
                      onChange={(e) => updateDeliveryInfo("area", e.target.value)}
                      className="border-white/20 bg-white/10 text-white placeholder:text-purple-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white font-medium">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Detailed Address *
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Street, building, landmarks, etc."
                      value={deliveryInfo.address}
                      onChange={(e) => updateDeliveryInfo("address", e.target.value)}
                      className="border-white/20 bg-white/10 text-white placeholder:text-purple-300 min-h-[80px]"
                      required
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="notes" className="text-white font-medium">
                      Additional Notes
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special instructions, delivery preferences, or additional information..."
                      value={deliveryInfo.notes}
                      onChange={(e) => updateDeliveryInfo("notes", e.target.value)}
                      className="border-white/20 bg-white/10 text-white placeholder:text-purple-300 min-h-[80px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-white/20 shadow-corazone sticky top-4 glass-effect">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-purple-200">Subtotal ({getCartCount()} items)</span>
                    <span className="font-semibold text-white">KSh {getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-red-400">KSh {getCartTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info Summary */}
                {deliveryInfo.name && deliveryInfo.area && (
                  <div className="mb-6 p-4 border border-white/20 rounded-lg bg-white/5">
                    <h4 className="font-semibold text-white mb-2">Delivery To:</h4>
                    <div className="text-sm text-purple-200 space-y-1">
                      <p><strong>Name:</strong> {deliveryInfo.name}</p>
                      <p><strong>Phone:</strong> {deliveryInfo.phone}</p>
                      <p><strong>Area:</strong> {deliveryInfo.area}</p>
                      {deliveryInfo.address && <p><strong>Address:</strong> {deliveryInfo.address}</p>}
                    </div>
                  </div>
                )}

                <Link href="/checkout">
                  <Button 
                    className="w-full purple-gradient text-white shadow-corazone mb-3"
                    disabled={!isDeliveryInfoComplete()}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <div className="text-center">
                  <p className="text-xs text-purple-300 mb-2">Secure checkout powered by WhatsApp</p>
                  <p className="text-xs text-purple-300">
                    Delivery time: 30-60 minutes within Nairobi
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

