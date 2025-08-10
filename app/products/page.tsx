import { getProducts, getCategories } from "@/lib/api/products"
import type { Product } from "@/lib/types"
import ProductsPageClient from "./products-client"

export default async function ProductsPage() {
  const products = await getProducts()
  const categories = await getCategories()

  return <ProductsPageClient products={products} categories={categories} />
}
