import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { ProductsPage } from '../pages/products'

function App() {
  return (
    <BrowserRouter>
      <div className="p-8 font-sans">
        <nav className="mb-8">
          <Link to="/" className="mr-4 text-blue-600 hover:text-blue-800">
            Home
          </Link>
          <Link to="/products" className="text-blue-600 hover:text-blue-800">
            Products
          </Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<div><h1 className="text-3xl font-bold">Home</h1></div>} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
