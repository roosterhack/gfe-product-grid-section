import { useInfiniteQuery } from '@tanstack/react-query'
import type { Product } from '../../../entities/product/model/types'

type UseProductOptions = {
  collection?: string[]
  sort?: 'popularity' | 'created' | 'rating' | 'price'
  per_page?: number
  direction?: string
}

type ProductsResponse = {
  data: Product[]
  pagination: {
    has_more: boolean
    page: number
    per_page: number
    total: number
  }
}

const fetchProducts = async (
  options: UseProductOptions & { page: number }
): Promise<ProductsResponse> => {
  const params = new URLSearchParams()
  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value))
    }
  })

  const res = await fetch(
    `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?${params}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  return res.json()
}

export const useProducts = (options: UseProductOptions) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['products', options],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({ ...options, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_more ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1
  })

  // Flatten all pages into a single array
  const allProducts = data?.pages.flatMap((page) => page.data) || []

  return {
    products: allProducts,
    isLoading,
    error,
    pagingnationInfo: data?.pages[data.pages.length - 1]?.pagination || null,
    loadMore: fetchNextPage,
    hasMore: hasNextPage,
    isLoadingMore: isFetchingNextPage
  }
}
