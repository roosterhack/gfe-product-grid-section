import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProductsPage } from '../pages/products'

function App() {
  return (
    <BrowserRouter>
      <div className="p-8 font-sans">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
