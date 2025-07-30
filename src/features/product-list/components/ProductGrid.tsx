import { ProductCard } from '../../../entities/product'
import { useProducts } from '../hooks/useProducts'

export const ProductGrid = () => {
  const { products, error, isLoading, loadMore, hasMore, isLoadingMore } =
    useProducts({
      collection: ['latest']
    })

  if (isLoading) {
    return (
      <div 
        className="text-center text-gray-500" 
        role="status" 
        aria-live="polite"
      >
        Loading products...
      </div>
    )
  }

  if (error) {
    return (
      <div 
        className="text-center text-red-500"
        role="alert"
        aria-live="assertive"
      >
        Error loading products: {String(error)}
      </div>
    )
  }

  return (
    <>
      <header className="flex justify-between mb-8 items-center">
        <h1 className="text-2xl font-semibold">Latest Arrivals</h1>
        <button
          onClick={() => loadMore()}
          disabled={!hasMore || isLoadingMore}
          className="py-2.5 px-4 shadow-2xs rounded-sm cursor-pointer hover:bg-neutral-50 border-neutral-200 border disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-describedby={isLoadingMore ? 'loading-status' : undefined}
        >
          {isLoadingMore
            ? 'Loading...'
            : hasMore
            ? 'View more'
            : 'No more products'}
        </button>
        {isLoadingMore && (
          <div 
            id="loading-status" 
            className="sr-only" 
            aria-live="polite" 
            role="status"
          >
            Loading more products
          </div>
        )}
      </header>
      <section 
        className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5"
        aria-label="Product listing"
        role="region"
      >
        {products?.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </section>
    </>
  )
}
