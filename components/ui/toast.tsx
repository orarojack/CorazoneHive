"use client"

import { X } from "lucide-react"
import { Button } from "./button"
import { useToast, type Toast } from "@/lib/hooks/use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}
    </div>
  )
}

function ToastComponent({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const variantStyles = {
    default: "bg-white border-gray-200",
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  }

  return (
    <div
      className={`${variantStyles[toast.variant]} border rounded-lg p-4 shadow-lg min-w-[300px] animate-in slide-in-from-right`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold">{toast.title}</h4>
          {toast.description && <p className="text-sm mt-1 opacity-90">{toast.description}</p>}
        </div>
        <Button variant="ghost" size="sm" onClick={() => onDismiss(toast.id)} className="h-6 w-6 p-0 hover:bg-black/10">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
