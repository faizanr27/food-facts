import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

// Main component to list OpenFoodFacts products
const OpenFoodFactsList = ({ search }) => {

   // State variables for products, categories, filters, and error/loading handling
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Fetch data when the component mounts
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);


  // Filter and sort products whenever search, category, or sort options change
  useEffect(() => {
    filterAndSortProducts();
  }, [search, selectedCategory, sortOption, products]);

  // Fetch products data from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://world.openfoodfacts.org/api/v2/search?fields=id,product_name,image_url,categories,ingredients_text,nutriscore_grade&page_size=500');
      const data = await response.json();
      
      if (data.products) {
        setProducts(data.products);
        setError(null);
      } else {
        setError('No products found');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories data from the API
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://world.openfoodfacts.org/categories.json');
      const data = await response.json();
      if (data.tags) {
        setCategories(data.tags.map(tag => tag.name).slice(0, 20));
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Filter and sort the products based on user input
  const filterAndSortProducts = () => {
    let result = [...products];

    // Filter based on search term
    if (search) {
      result = result.filter(product => 
        product.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter based on selected category
    if (selectedCategory) {
      result = result.filter(product => 
        product.categories?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Sort products based on user-selected option
    if (sortOption === 'name-asc') {
      result.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (sortOption === 'name-desc') {
      result.sort((a, b) => b.product_name.localeCompare(a.product_name));
    } else if (sortOption === 'grade-asc') {
      result.sort((a, b) => (a.nutriscore_grade || 'z').localeCompare(b.nutriscore_grade || 'z'));
    } else if (sortOption === 'grade-desc') {
      result.sort((a, b) => (b.nutriscore_grade || 'z').localeCompare(a.nutriscore_grade || 'z'));
    }

    setFilteredProducts(result);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  // Navigate to the product details page when a product is clicked
  const handleDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getNutriScoreColor = (score) => {
    const colors = {
      'a': 'bg-green-500',
      'b': 'bg-light-green-500',
      'c': 'bg-yellow-500',
      'd': 'bg-orange-500',
      'e': 'bg-red-500',
    };
    return colors[score?.toLowerCase()] || 'bg-gray-500';
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render loading or error messages
  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center p-4">{error}</p>;

  return (
    <div className="container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filters, search, and sort options */}
      <div className="mb-4 flex flex-wrap gap-4">
        {/* Category filter */}
        <select
          className="p-2 border rounded"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        {/* Sorting options */}
        <select
          className="p-2 border rounded"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Sort by</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="grade-asc">Nutrition Grade (Best-Worst)</option>
          <option value="grade-desc">Nutrition Grade (Worst-Best)</option>
        </select>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Display the products list */}
        {currentProducts.map(product => (
          <div key={product.id} onClick={() => handleDetails(product.id)}
               className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col hover:border-blue-300 hover:border-2">
            {product.image_url && (
              <div className="relative pt-[100%]">
                <img 
                  className="absolute top-0 left-0 w-full h-full object-contain rounded-t-lg"
                  src={product.image_url} 
                  alt={product.product_name}
                />
              </div>
            )}
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 ">{product.product_name}</h3>
                <p className="text-sm mb-1"><span className="font-medium">Category:</span> {product.categories?.split(',')[0] || 'N/A'}</p>
                <p className="text-sm mb-2 line-clamp-3"><span className="font-medium">Ingredients:</span> {product.ingredients_text || 'N/A'}</p>
              </div>
              <div className="mt-auto">
                <p className="text-sm font-medium">
                  Nutri-Grade: 
                  <span className={`ml-2 px-2 py-1 rounded-full text-white ${getNutriScoreColor(product.nutriscore_grade)}`}>
                    {product.nutriscore_grade?.toUpperCase() || 'N/A'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Render pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default OpenFoodFactsList;