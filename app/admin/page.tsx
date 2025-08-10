"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Package, Tag, BarChart3, Users, Search, Upload, Link as LinkIcon, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/lib/hooks/use-toast"
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/api/products"
import type { Product } from "@/lib/types"
import Image from "next/image"

interface Category {
  id: string
  name: string
  icon: string
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Product form state
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    salePrice: 0,
    discount: 0,
    image: "",
    categoryId: "",
    rating: 5,
    reviews: 0,
    onSale: false,
    popular: false,
  })

  // Image upload state
  const [imagePreview, setImagePreview] = useState<string>("")
  const [imageUploadMethod, setImageUploadMethod] = useState<"url" | "file">("url")
  const [uploadingImage, setUploadingImage] = useState(false)

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    id: "",
    name: "",
    icon: "",
  })

  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  // Update image preview when productForm.image changes
  useEffect(() => {
    setImagePreview(productForm.image)
  }, [productForm.image])

  const loadData = async () => {
    setLoading(true)
    try {
      const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()])
      setProducts(productsData)
      setCategories(categoriesData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', { 
        method: 'POST', 
        body: formData 
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }
      
      const result = await response.json()
      setProductForm(prev => ({ ...prev, image: result.url }))
      setImagePreview(result.url)
      toast({
        title: "Success",
        description: "Image uploaded successfully",
        variant: "success",
      })
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "error",
      })
    } finally {
      setUploadingImage(false)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "error",
        })
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size must be less than 5MB",
          variant: "error",
        })
        return
      }
      
      handleImageUpload(file)
    }
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await updateProduct(editingProduct, { ...productForm, categoryId: productForm.categoryId })
        toast({
          title: "Success",
          description: "Product updated successfully",
          variant: "success",
        })
      } else {
        await createProduct({ ...productForm, categoryId: productForm.categoryId })
        toast({
          title: "Success",
          description: "Product created successfully",
          variant: "success",
        })
      }
      setIsProductDialogOpen(false)
      resetProductForm()
      loadData()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "error",
      })
    }
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCategory) {
        await updateCategory(editingCategory, categoryForm)
        toast({
          title: "Success",
          description: "Category updated successfully",
          variant: "success",
        })
      } else {
        await createCategory(categoryForm)
        toast({
          title: "Success",
          description: "Category created successfully",
          variant: "success",
        })
      }
      setIsCategoryDialogOpen(false)
      resetCategoryForm()
      loadData()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "error",
      })
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id)
        toast({
          title: "Success",
          description: "Product deleted successfully",
          variant: "success",
        })
        loadData()
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "error",
        })
      }
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id)
        toast({
          title: "Success",
          description: "Category deleted successfully",
          variant: "success",
        })
        loadData()
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete category",
          variant: "error",
        })
      }
    }
  }

  const resetProductForm = () => {
    setProductForm({
      id: "",
      name: "",
      description: "",
      price: 0,
      salePrice: 0,
      discount: 0,
      image: "",
      categoryId: "",
      rating: 5,
      reviews: 0,
      onSale: false,
      popular: false,
    })
    setImagePreview("")
    setImageUploadMethod("url")
    setEditingProduct(null)
  }

  const resetCategoryForm = () => {
    setCategoryForm({
      id: "",
      name: "",
      icon: "",
    })
    setEditingCategory(null)
  }

  const editProduct = (product: Product) => {
    const category = categories.find((c) => c.name.toLowerCase() === product.category.toLowerCase())
    setProductForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      salePrice: product.salePrice || 0,
      discount: product.discount || 0,
      image: product.image,
      categoryId: category?.id || "",
      rating: product.rating,
      reviews: product.reviews,
      onSale: product.onSale || false,
      popular: product.popular || false,
    })
    setImagePreview(product.image)
    setEditingProduct(product.id)
    setIsProductDialogOpen(true)
  }

  const editCategory = (category: Category) => {
    setCategoryForm(category)
    setEditingCategory(category.id)
    setIsCategoryDialogOpen(true)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const stats = {
    totalProducts: products.length,
    totalCategories: categories.length,
    onSaleProducts: products.filter((p) => p.onSale).length,
    popularProducts: products.filter((p) => p.popular).length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      {/* Header */}
      <header className="glass-purple border-b border-purple-300/20 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">CorazoneHives Admin</h1>
              <p className="text-purple-200">Manage your products and categories</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm">Total Products</p>
                  <p className="text-2xl font-bold text-white">{stats.totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-purple-300" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm">Categories</p>
                  <p className="text-2xl font-bold text-white">{stats.totalCategories}</p>
                </div>
                <Tag className="w-8 h-8 text-purple-300" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm">On Sale</p>
                  <p className="text-2xl font-bold text-white">{stats.onSaleProducts}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-300" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-effect border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm">Popular</p>
                  <p className="text-2xl font-bold text-white">{stats.popularProducts}</p>
                </div>
                <Users className="w-8 h-8 text-purple-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="products" className="data-[state=active]:bg-white/20 text-white">
              Products
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-white/20 text-white">
              Categories
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Products Management</CardTitle>
                  <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="purple-gradient text-white" onClick={resetProductForm}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl bg-purple-900 border-white/20 text-white max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-white">
                          {editingProduct ? "Edit Product" : "Add New Product"}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleProductSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-purple-200">Product Name</Label>
                            <Input
                              value={productForm.name}
                              onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
                              className="bg-white/10 border-white/20 text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-purple-200">Category</Label>
                            <Select
                              value={productForm.categoryId}
                              onValueChange={(value) => setProductForm((prev) => ({ ...prev, categoryId: value }))}
                            >
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.icon} {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label className="text-purple-200">Description</Label>
                          <Textarea
                            value={productForm.description}
                            onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label className="text-purple-200">Price (KSh)</Label>
                            <Input
                              type="number"
                              value={productForm.price}
                              onChange={(e) => setProductForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
                              className="bg-white/10 border-white/20 text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-purple-200">Sale Price (KSh)</Label>
                            <Input
                              type="number"
                              value={productForm.salePrice}
                              onChange={(e) =>
                                setProductForm((prev) => ({ ...prev, salePrice: Number(e.target.value) }))
                              }
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-purple-200">Discount (%)</Label>
                            <Input
                              type="number"
                              value={productForm.discount}
                              onChange={(e) =>
                                setProductForm((prev) => ({ ...prev, discount: Number(e.target.value) }))
                              }
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                        </div>

                        {/* Enhanced Image Upload Section */}
                        <div className="space-y-4">
                          <Label className="text-purple-200">Product Image</Label>
                          
                          {/* Image Upload Method Toggle */}
                          <div className="flex space-x-2">
                            <Button
                              type="button"
                              variant={imageUploadMethod === "url" ? "default" : "outline"}
                              onClick={() => setImageUploadMethod("url")}
                              className={imageUploadMethod === "url" ? "purple-gradient" : "border-white/30 text-white hover:bg-white/10"}
                            >
                              <LinkIcon className="w-4 h-4 mr-2" />
                              Image URL
                            </Button>
                            <Button
                              type="button"
                              variant={imageUploadMethod === "file" ? "default" : "outline"}
                              onClick={() => setImageUploadMethod("file")}
                              className={imageUploadMethod === "file" ? "purple-gradient" : "border-white/30 text-white hover:bg-white/10"}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload File
                            </Button>
                          </div>

                          {/* Image URL Input */}
                          {imageUploadMethod === "url" && (
                            <div>
                              <Input
                                value={productForm.image}
                                onChange={(e) => setProductForm((prev) => ({ ...prev, image: e.target.value }))}
                                className="bg-white/10 border-white/20 text-white"
                                placeholder="https://example.com/image.jpg or /placeholder.svg"
                                required
                              />
                              <p className="text-xs text-purple-300 mt-1">
                                Enter a valid image URL or use relative path for local images
                              </p>
                            </div>
                          )}

                          {/* File Upload */}
                          {imageUploadMethod === "file" && (
                            <div className="space-y-2">
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileInputChange}
                                className="hidden"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="border-white/30 text-white hover:bg-white/10 w-full"
                                disabled={uploadingImage}
                              >
                                {uploadingImage ? (
                                  "Uploading..."
                                ) : (
                                  <>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose Image File (Max 5MB)
                                  </>
                                )}
                              </Button>
                              <p className="text-xs text-purple-300">
                                Supported formats: JPG, PNG, GIF, WebP. Maximum size: 5MB
                              </p>
                            </div>
                          )}

                          {/* Image Preview */}
                          {imagePreview && (
                            <div className="mt-4">
                              <Label className="text-purple-200 mb-2 block">Image Preview</Label>
                              <div className="relative inline-block">
                                <Image
                                  src={imagePreview}
                                  alt="Product preview"
                                  width={200}
                                  height={200}
                                  className="rounded-lg border border-white/20 object-cover"
                                  onError={() => {
                                    setImagePreview("/placeholder.svg")
                                    toast({
                                      title: "Warning",
                                      description: "Failed to load image, using placeholder",
                                      variant: "error",
                                    })
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setImagePreview("")
                                    setProductForm(prev => ({ ...prev, image: "" }))
                                  }}
                                  className="absolute top-2 right-2 bg-red-500/80 border-red-500 text-white hover:bg-red-600/80"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-purple-200">Rating</Label>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              value={productForm.rating}
                              onChange={(e) => setProductForm((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-purple-200">Reviews Count</Label>
                            <Input
                              type="number"
                              value={productForm.reviews}
                              onChange={(e) => setProductForm((prev) => ({ ...prev, reviews: Number(e.target.value) }))}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={productForm.onSale}
                              onCheckedChange={(checked) => setProductForm((prev) => ({ ...prev, onSale: checked }))}
                            />
                            <Label className="text-purple-200">On Sale</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={productForm.popular}
                              onCheckedChange={(checked) => setProductForm((prev) => ({ ...prev, popular: checked }))}
                            />
                            <Label className="text-purple-200">Popular</Label>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsProductDialogOpen(false)}
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="purple-gradient text-white">
                            {editingProduct ? "Update" : "Create"} Product
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="glass-effect border-white/20 hover:border-white/40 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="relative mb-3">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={200}
                            height={150}
                            className="w-full h-32 object-cover rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg"
                            }}
                          />
                          <div className="absolute top-2 right-2 flex space-x-1">
                            {product.onSale && <Badge className="red-gradient text-white text-xs">Sale</Badge>}
                            {product.popular && <Badge className="purple-gradient text-white text-xs">Popular</Badge>}
                          </div>
                        </div>
                        <h3 className="font-semibold text-white mb-2 line-clamp-1">{product.name}</h3>
                        <p className="text-purple-200 text-sm mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-white font-bold">KSh {product.price.toLocaleString()}</span>
                            {product.salePrice && (
                              <span className="text-purple-300 text-sm ml-2">
                                Sale: KSh {product.salePrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <Badge variant="outline" className="border-white/30 text-purple-200">
                            {product.category}
                          </Badge>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => editProduct(product)}
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="border-red-400/30 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Categories Management</CardTitle>
                  <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="purple-gradient text-white" onClick={resetCategoryForm}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-purple-900 border-white/20 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-white">
                          {editingCategory ? "Edit Category" : "Add New Category"}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleCategorySubmit} className="space-y-4">
                        <div>
                          <Label className="text-purple-200">Category Name</Label>
                          <Input
                            value={categoryForm.name}
                            onChange={(e) => setCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-purple-200">Icon (Emoji)</Label>
                          <Input
                            value={categoryForm.icon}
                            onChange={(e) => setCategoryForm((prev) => ({ ...prev, icon: e.target.value }))}
                            className="bg-white/10 border-white/20 text-white"
                            placeholder="🍦"
                            required
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsCategoryDialogOpen(false)}
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="purple-gradient text-white">
                            {editingCategory ? "Update" : "Create"} Category
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Card
                      key={category.id}
                      className="glass-effect border-white/20 hover:border-white/40 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-3xl">{category.icon}</div>
                            <div>
                              <h3 className="font-semibold text-white">{category.name}</h3>
                              <p className="text-purple-200 text-sm">
                                {
                                  products.filter((p) => p.category.toLowerCase() === category.name.toLowerCase())
                                    .length
                                }{" "}
                                products
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => editCategory(category)}
                              className="border-white/30 text-white hover:bg-white/10"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteCategory(category.id)}
                              className="border-red-400/30 text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
