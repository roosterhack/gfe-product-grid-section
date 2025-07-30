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
  }, [])

  if (!productInventory) return null

  const showListPrice =
    productInventory.sale_price < productInventory.list_price

  const outOfStock = productInventory.stock === 0

  return (
    <article className="flex flex-col mb-14">
      <ImageWithBlur
        className="w-full h-full object-cover"
        src={currentImageUrl}
        placeholder="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        alt={product.description}
      />

      <div>
        <div className="text-xs text-neutral-700">{selectedColor}</div>
        <div className="text-lg mb-3">{product.name}</div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <div className="text-base text-neutral-500">
            ${productInventory?.sale_price}
          </div>
          {showListPrice && (
            <div className="text-xs text-neutral-500 line-through">
              ${productInventory?.list_price}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 mt-6">
          {product.colors.map((color) => {
            return (
              <button
                disabled={outOfStock}
                aria-label={`Select ${color} color`}
                onClick={() => handleColorSelect(color)}
                key={color}
                className={`${getColorClass(
                  color
                )} rounded-full w-4 h-4 border transition-all duration-200 hover:scale-110 ${
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
      </div>
    </article>
  )
}
