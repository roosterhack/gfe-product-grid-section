import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProductsPage } from '../pages/products'

function App() {
  return (
    <BrowserRouter>
      <div className="p-8 font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50">
          Skip to main content
        </a>
        <main id="main">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
