import { ProductCard } from '../../../entities/product'
import { useProducts } from '../hooks/useProducts'

export const ProductGrid = () => {
  const { products, error, isLoading, loadMore, hasMore, isLoadingMore } =
    useProducts({
      collection: ['latest']
    })

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading products...</div>
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading products: {String(error)}
      </div>
    )
  }
  console.log('Products:', products)
  return (
    <>
      <div className="flex justify-between mb-8 items-center">
        <div className="text-2xl font-semibold">Latest Arrivals</div>
        <button
          onClick={() => loadMore()}
          disabled={!hasMore || isLoadingMore}
          className="py-2.5 px-4 shadow-2xs rounded-sm cursor-pointer hover:bg-neutral-50 border-neutral-200 border disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoadingMore
            ? 'Loading...'
            : hasMore
            ? 'View more'
            : 'No more products'}
        </button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {products?.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </>
  )
}
