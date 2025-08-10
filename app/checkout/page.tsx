"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, User, Clock, MessageCircle, CheckCircle } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useDelivery } from "@/lib/delivery-context"
import Header from "@/components/header"
import { useToast } from "@/lib/hooks/use-toast"

export default function CheckoutPage() {
  const { cart, getCartTotal, getCartCount, clearCart } = useCart()
  const { deliveryInfo, clearDeliveryInfo } = useDelivery()
  const { toast } = useToast()

  const subtotal = getCartTotal()
  const total = subtotal

  const handlePlaceOrder = () => {
    // Create WhatsApp message with order details
    const orderItems = cart.map(item => 
      `• ${item.name} x${item.quantity} - KSh ${((item.salePrice || item.price) * item.quantity).toLocaleString()}`
    ).join('\n')

    const message = `🍦 *NEW ORDER - CorazoneHives* 🍦

*Order Details:*
${orderItems}

*Delivery Information:*
👤 Name: ${deliveryInfo.name}
📱 Phone: ${deliveryInfo.phone}
📍 Area: ${deliveryInfo.area}
🏠 Address: ${deliveryInfo.address}
${deliveryInfo.notes ? `📝 Notes: ${deliveryInfo.notes}` : ''}

*Order Summary:*
Subtotal: KSh ${subtotal.toLocaleString()}
*Total: KSh ${total.toLocaleString()}*

Please confirm this order and provide delivery fee information.`

    const whatsappUrl = `https://wa.me/254795541756?text=${encodeURIComponent(message)}`
    
    // Clear cart and delivery info after order placement
    clearCart()
    clearDeliveryInfo()
    
    // Show success toast
    toast({
      title: "Order placed successfully!",
      description: "Redirecting to WhatsApp for payment confirmation...",
      variant: "success",
    })

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
        <Header currentPage="cart" />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-white mb-4">No items in cart</h2>
            <p className="text-purple-200 mb-8">Please add items to your cart before checkout.</p>
            <Link href="/products">
              <Button className="purple-gradient text-white">
                Continue Shopping
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
          <Link href="/cart">
            <Button variant="ghost" className="text-white hover:text-purple-200 hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-white/20 shadow-corazone glass-effect">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 border border-white/20 rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{item.name}</h4>
                        <p className="text-sm text-purple-200">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">
                          KSh {((item.salePrice || item.price) * item.quantity).toLocaleString()}
                        </p>
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
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-purple-300" />
                    <span className="text-white font-medium">{deliveryInfo.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-purple-300" />
                    <span className="text-white">{deliveryInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-purple-300" />
                    <span className="text-white">{deliveryInfo.area}</span>
                  </div>
                  <div className="pl-7">
                    <p className="text-purple-200">{deliveryInfo.address}</p>
                  </div>
                  {deliveryInfo.notes && (
                    <div className="pl-7">
                      <p className="text-purple-200 text-sm">
                        <strong>Notes:</strong> {deliveryInfo.notes}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div>
            <Card className="border-white/20 shadow-corazone sticky top-4 glass-effect">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-purple-200">Subtotal ({getCartCount()} items)</span>
                    <span className="font-semibold text-white">KSh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-red-400">KSh {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="mb-6 p-4 border border-white/20 rounded-lg bg-white/5">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span className="text-white font-semibold">Estimated Delivery Time</span>
                  </div>
                  <p className="text-purple-200 text-sm">30-60 minutes within Nairobi</p>
                </div>

                {/* Payment Method */}
                <div className="mb-6 p-4 border border-white/20 rounded-lg bg-white/5">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white font-semibold">Payment via WhatsApp</span>
                  </div>
                  <p className="text-purple-200 text-sm">Pay on delivery or via mobile money</p>
                  <p className="text-purple-200 text-sm mt-1">Delivery fee will be communicated via WhatsApp</p>
                </div>

                <Button 
                  className="w-full purple-gradient text-white shadow-corazone mb-3"
                  onClick={handlePlaceOrder}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Place Order via WhatsApp
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-purple-300">
                    You'll be redirected to WhatsApp to confirm your order
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
