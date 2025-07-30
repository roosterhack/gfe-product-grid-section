import { useState, useMemo, useCallback } from 'react'
import type { InventoryItem, Product } from '../model/types'
import { ImageWithBlur } from './ImageWithBlur'

type ProductCardProps = {
  product: Product
}

const getColorClass = (color: string) => {
  switch (color) {
    case 'black':
      return 'bg-black'
    case 'yellow':
      return 'bg-yellow-500'
    case 'beige':
      return 'bg-stone-300'
    case 'orange':
      return 'bg-orange-500'
    case 'white':
      return 'bg-white'
    case 'brown':
      return 'bg-amber-500'
    case 'blue':
      return 'bg-blue-500'
    default:
      return 'bg-gray-400'
  }
}

const getImageByColor = (
  color: string,
  images: { color: string; image_url: string }[]
) => {
  return images.find((image) => image.color === color)?.image_url
}

const getProductInventoryByColor = (
  color: string,
  inventory: InventoryItem[]
) => {
  return inventory.find((product) => product.color === color)
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [announceColorChange, setAnnounceColorChange] = useState('')

  const productInventory = useMemo(
    () => getProductInventoryByColor(selectedColor, product.inventory),
    [selectedColor, product.inventory]
  )

  const currentImageUrl = useMemo(
    () =>
      getImageByColor(selectedColor, product.images) ||
      product.images[0]?.image_url,
    [selectedColor, product.images]
  )

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color)
    setAnnounceColorChange(`Selected ${color} color for ${product.name}`)
    setTimeout(() => setAnnounceColorChange(''), 1000)
  }, [product.name])

  if (!productInventory) return null

  const showListPrice =
    productInventory.sale_price < productInventory.list_price

  const outOfStock = productInventory.stock === 0

  return (
    <article className="flex flex-col mb-14" aria-labelledby={`product-${product.product_id}-name`}>
      <ImageWithBlur
        className="w-full h-full object-cover"
        src={currentImageUrl}
        placeholder="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        alt={product.description}
      />

      <div>
        <div className="text-xs text-neutral-700" aria-label="Selected color">{selectedColor}</div>
        <h2 id={`product-${product.product_id}-name`} className="text-lg mb-3">{product.name}</h2>
      </div>
      <div>
        <div className="flex items-center gap-2" role="group" aria-label="Product pricing">
          <div className="text-base text-neutral-500" aria-label={`Sale price $${productInventory?.sale_price}`}>
            ${productInventory?.sale_price}
          </div>
          {showListPrice && (
            <div className="text-xs text-neutral-500 line-through" aria-label={`Original price $${productInventory?.list_price}`}>
              ${productInventory?.list_price}
            </div>
          )}
        </div>
        <fieldset className="mt-6">
          <legend className="sr-only">Choose color for {product.name}</legend>
          <div className="flex items-center gap-1" role="radiogroup" aria-label="Available colors">
            {product.colors.map((color, index) => {
              return (
                <button
                  disabled={outOfStock}
                  aria-label={`Select ${color} color`}
                  aria-pressed={selectedColor === color}
                  role="radio"
                  aria-checked={selectedColor === color}
                  tabIndex={selectedColor === color ? 0 : -1}
                  onClick={() => handleColorSelect(color)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                      e.preventDefault()
                      const nextIndex = e.key === 'ArrowRight' 
                        ? (index + 1) % product.colors.length
                        : (index - 1 + product.colors.length) % product.colors.length
                      handleColorSelect(product.colors[nextIndex])
                    }
                  }}
                  key={color}
                  className={`${getColorClass(
                    color
                  )} rounded-full w-4 h-4 border transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    getColorClass(color) === 'bg-white'
                      ? 'border-gray-200'
                      : 'border-transparent'
                  } ${
                    selectedColor === color ? 'ring-2 ring-blue-500' : ''
                  } cursor-pointer ${outOfStock ? 'opacity-25' : ''}`}
                ></button>
              )
            })}
          </div>
        </fieldset>
      </div>
      {announceColorChange && (
        <div 
          className="sr-only" 
          aria-live="polite" 
          role="status"
        >
          {announceColorChange}
        </div>
      )}
      {outOfStock && (
        <div 
          className="sr-only" 
          aria-live="polite" 
          role="status"
        >
          This product is currently out of stock
        </div>
      )}
    </article>
  )
}
