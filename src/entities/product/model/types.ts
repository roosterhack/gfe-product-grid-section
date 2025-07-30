export interface Category {
  category_id: string
  name: string
  created_at: string
}

export interface Collection {
  collection_id: string
  name: string
  description: string
  image_url: string
  created_at: string
}

export interface ProductImage {
  color: string
  image_url: string
}

export interface InventoryItem {
  sku: string
  color: string
  size: string | null
  list_price: number
  discount: number | null
  discount_percentage: number | null
  sale_price: number
  sold: number
  stock: number
}

export interface PriceRange {
  highest: number
  lowest: number
}

export interface Product {
  product_id: string
  name: string
  description: string
  category: Category
  collection: Collection
  created_at: string
  colors: string[]
  images: ProductImage[]
  inventory: InventoryItem[]
  priceRange: PriceRange
  rating: number
  reviews: number
  sizes: string[]
  sold: number
}

export interface ProductsResponse {
  data: Product[]
  pagination: {
    has_more: boolean
    page: number
    per_page: number
    total: number
  }
}