import { supabase } from "../supabase"
import type { Product } from "../types"

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        name
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    salePrice: item.sale_price,
    discount: item.discount,
    image: item.image,
    category: item.categories?.name || "",
    category_id: item.category_id,
    rating: item.rating,
    reviews: item.reviews,
    onSale: item.on_sale,
    popular: item.popular,
  }))
}

export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data
}

export async function createProduct(product: Omit<Product, "id"> & { categoryId: string }) {
  const { data, error } = await supabase
    .from("products")
    .insert({
      name: product.name,
      description: product.description,
      price: product.price,
      sale_price: product.salePrice,
      discount: product.discount,
      image: product.image,
      category_id: product.categoryId,
      rating: product.rating,
      reviews: product.reviews,
      on_sale: product.onSale,
      popular: product.popular,
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateProduct(id: string, product: Partial<Product> & { categoryId?: string }) {
  const { data, error } = await supabase
    .from("products")
    .update({
      name: product.name,
      description: product.description,
      price: product.price,
      sale_price: product.salePrice,
      discount: product.discount,
      image: product.image,
      category_id: product.categoryId,
      rating: product.rating,
      reviews: product.reviews,
      on_sale: product.onSale,
      popular: product.popular,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}

export async function createCategory(category: { name: string; icon: string }) {
  const { data, error } = await supabase.from("categories").insert(category).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateCategory(id: string, category: { name: string; icon: string }) {
  const { data, error } = await supabase
    .from("categories")
    .update({
      ...category,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}
