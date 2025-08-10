export interface Product {
  id: string
  name: string
  description: string
  price: number
  salePrice?: number
  discount?: number
  image: string
  category: string
  category_id: string
  rating: number
  reviews: number
  onSale?: boolean
  popular?: boolean
}
