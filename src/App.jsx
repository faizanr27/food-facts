import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from "react"
import Navbar from "./components/Navbar"
import OpenFoodFactsList from "./components/OpenFoodFactsList"
import ProductDetails from "./components/ProductDetails"


function App() {
  // const [productId, setProductId] = useState('')
  const [search, setSearch] = useState('')

  // const handleSelectProduct = (productId) => {
  //   setProductId(productId);
  //   console.log(productId)
  // }
  const handleSearch = (searchText) => {
    setSearch(searchText)
  }

  return (
  <Router>
    <Navbar handleSearch={handleSearch} />
    <Routes>
      {/* Route for OpenFoodFactsList */}
      <Route path="/" element={<OpenFoodFactsList search={search} />} />

      {/* Route for ProductDetails with conditional rendering */}
      <Route 
          path="/product/:productId" 
          element={<ProductDetails />} 
        />
    </Routes>
  </Router>
    // <>
    // <Navbar handleSearch={handleSearch}/>
    
    // {productId ? (<ProductDetails productId={productId} />) : (<OpenFoodFactsList handleSelectProduct={handleSelectProduct}/>) }

    // </>
  )
}

export default App
