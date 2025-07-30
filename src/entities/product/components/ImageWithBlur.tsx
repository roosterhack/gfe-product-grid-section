// ImageWithBlur.tsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type Props = {
  src: string
  alt: string
  placeholder: string // low-res or base64 blur image
  className?: string
}

export const ImageWithBlur = ({ src, alt, placeholder, className }: Props) => {
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Reset loaded state when src changes and handle mounting
  useEffect(() => {
    setLoaded(false)
    setMounted(true)
    
    // Small delay to ensure proper animation
    const timer = setTimeout(() => {
      setMounted(true)
    }, 10)
    
    return () => clearTimeout(timer)
  }, [src])

  if (!mounted) {
    return (
      <div className="w-full max-w-[336px] max-h-[300px] rounded-md overflow-hidden mb-4 h-full relative bg-gray-200">
        <motion.img
          src={placeholder}
          alt={alt}
          style={{
            filter: 'blur(20px)',
            width: '100%',
            height: '100%',
            position: 'absolute'
          }}
          aria-hidden="true"
        />
      </div>
    )
  }

  return (
    <div className="w-full max-w-[336px] max-h-[300px] rounded-md overflow-hidden mb-4 h-full relative bg-gray-200">
      <motion.img
        src={placeholder}
        alt={alt}
        style={{
          filter: 'blur(20px)',
          width: '100%',
          height: '100%',
          position: 'absolute',
          transition: 'opacity 0.5s',
          opacity: loaded ? 0 : 1
        }}
        aria-hidden="true"
      />

      <motion.img
        className={className}
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'relative'
        }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
