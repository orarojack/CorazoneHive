"use client"

import { createContext, useContext, useState, useEffect } from "react"

interface DeliveryInfo {
  name: string
  phone: string
  area: string
  address: string
  notes: string
}

interface DeliveryContextType {
  deliveryInfo: DeliveryInfo
  updateDeliveryInfo: (field: keyof DeliveryInfo, value: string) => void
  setDeliveryInfo: (info: DeliveryInfo) => void
  clearDeliveryInfo: () => void
  isDeliveryInfoComplete: () => boolean
}

const defaultDeliveryInfo: DeliveryInfo = {
  name: "",
  phone: "",
  area: "",
  address: "",
  notes: ""
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined)

export function DeliveryProvider({ children }: { children: React.ReactNode }) {
  const [deliveryInfo, setDeliveryInfoState] = useState<DeliveryInfo>(defaultDeliveryInfo)

  // Load delivery info from localStorage on mount
  useEffect(() => {
    const savedDeliveryInfo = localStorage.getItem("corazonehives-delivery")
    if (savedDeliveryInfo) {
      setDeliveryInfoState(JSON.parse(savedDeliveryInfo))
    }
  }, [])

  // Save delivery info to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("corazonehives-delivery", JSON.stringify(deliveryInfo))
  }, [deliveryInfo])

  const updateDeliveryInfo = (field: keyof DeliveryInfo, value: string) => {
    setDeliveryInfoState(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const setDeliveryInfo = (info: DeliveryInfo) => {
    setDeliveryInfoState(info)
  }

  const clearDeliveryInfo = () => {
    setDeliveryInfoState(defaultDeliveryInfo)
  }

  const isDeliveryInfoComplete = () => {
    return !!(deliveryInfo.name && deliveryInfo.phone && deliveryInfo.area && deliveryInfo.address)
  }

  return (
    <DeliveryContext.Provider
      value={{
        deliveryInfo,
        updateDeliveryInfo,
        setDeliveryInfo,
        clearDeliveryInfo,
        isDeliveryInfoComplete
      }}
    >
      {children}
    </DeliveryContext.Provider>
  )
}

export function useDelivery() {
  const context = useContext(DeliveryContext)
  if (context === undefined) {
    throw new Error("useDelivery must be used within a DeliveryProvider")
  }
  return context
}
