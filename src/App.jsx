
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from "react"
import Navbar from "./components/Navbar"
import OpenFoodFactsList from "./components/OpenFoodFactsList"
import ProductDetails from "./components/ProductDetails"

function App() {
  // State for search text
  const [search, setSearch] = useState('')

  // Function to handle search input
  const handleSearch = (searchText) => {
    setSearch(searchText)
  }

  return (
    // Set up Router for handling navigation
    <Router>
      {/* Include Navbar with search handling */}
      <Navbar handleSearch={handleSearch} />
      {/* Define routes for different pages */}
      <Routes>
        {/* Route for displaying the list of products */}
        <Route path="/" element={<OpenFoodFactsList search={search} />} />

        {/* Route for displaying product details */}
        <Route 
          path="/product/:productId" 
          element={<ProductDetails />} 
        />
      </Routes>
    </Router>
  )
}


export default App
