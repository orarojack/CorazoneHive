"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MessageCircle, CreditCard, MapPin, User } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { cart, getCartTotal, getCartCount, clearCart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    deliveryArea: "",
    specialInstructions: "",
  })

  const deliveryAreas = [
    "CBD",
    "Westlands",
    "Karen",
    "Kilimani",
    "Lavington",
    "Parklands",
    "Eastleigh",
    "South B",
    "South C",
    "Kileleshwa",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const orderDetails = cart
      .map(
        (item) =>
          `${item.name} x${item.quantity} - KSh ${((item.salePrice || item.price) * item.quantity).toLocaleString()}`,
      )
      .join("\n")

    const total = (getCartTotal() * 1.08).toLocaleString()

    const message = `🛍️ *New Order from CorazoneHives*

👤 *Customer Details:*
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

📍 *Delivery Information:*
Address: ${formData.address}
City: ${formData.city}
Delivery Area: ${formData.deliveryArea}

🛒 *Order Details:*
${orderDetails}

💰 *Order Summary:*
Subtotal: KSh ${getCartTotal().toLocaleString()}
Tax: KSh ${(getCartTotal() * 0.08).toLocaleString()}
Total: KSh ${total}

📝 *Special Instructions:*
${formData.specialInstructions || "None"}

Thank you for choosing CorazoneHives! 🍦🍫🌸`

    const whatsappUrl = `https://wa.me/254700123456?text=${encodeURIComponent(message)}`

    clearCart()
    window.open(whatsappUrl, "_blank")

    setTimeout(() => {
      router.push("/")
    }, 1000)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <Link href="/products">
            <Button className="purple-gradient text-white">Start Shopping</Button>
          </Link>
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/cart">
            <Button variant="ghost" className="text-white hover:text-purple-200 hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card className="border-white/20 shadow-corazone glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <User className="w-5 h-5 mr-2 text-red-400" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-purple-200">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="border-white/20 focus:border-white/40 bg-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-purple-200">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="border-white/20 focus:border-white/40 bg-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-purple-200">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="border-white/20 focus:border-white/40 bg-white/10 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-purple-200">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      className="border-white/20 focus:border-white/40 bg-white/10 text-white"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border-white/20 mt-4 shadow-corazone glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <MapPin className="w-5 h-5 mr-2 text-red-400" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-purple-200">
                      Street Address
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                      className="border-white/20 focus:border-white/40 bg-white/10 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-purple-200">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                      className="border-white/20 focus:border-white/40 bg-white/10 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deliveryArea" className="text-purple-200">
                      Delivery Area
                    </Label>
                    <Select
                      value={formData.deliveryArea}
                      onValueChange={(value) => handleInputChange("deliveryArea", value)}
                    >
                      <SelectTrigger className="border-white/20 focus:border-white/40 bg-white/10 text-white">
                        <SelectValue placeholder="Select delivery area" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryAreas.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="specialInstructions" className="text-purple-200">
                      Special Instructions (Optional)
                    </Label>
                    <Textarea
                      id="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                      placeholder="Any special delivery instructions..."
                      className="border-white/20 focus:border-white/40 bg-white/10 text-white placeholder:text-purple-300"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-white/20 sticky top-4 shadow-corazone glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <CreditCard className="w-5 h-5 mr-2 text-red-400" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-white">{item.name}</h4>
                        <p className="text-xs text-purple-200">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-sm text-white">
                        KSh {((item.salePrice || item.price) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t border-white/20 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-200">Subtotal ({getCartCount()} items)</span>
                    <span className="text-white">KSh {getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-200">Delivery</span>
                    <span className="text-white">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-200">Tax</span>
                    <span className="text-white">KSh {(getCartTotal() * 0.08).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-white/20 pt-2">
                    <span className="text-white">Total</span>
                    <span className="text-red-400">KSh {(getCartTotal() * 1.08).toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full mt-6 purple-gradient text-white shadow-corazone"
                  disabled={
                    !formData.firstName ||
                    !formData.lastName ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.address ||
                    !formData.city ||
                    !formData.deliveryArea
                  }
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Complete Order via WhatsApp
                </Button>

                <p className="text-xs text-purple-300 text-center mt-3">
                  Your order will be sent via WhatsApp for confirmation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
