import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination'; // Make sure to import the new Pagination component

const OpenFoodFactsList = ({ search }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [productsPerPage] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [currentPage, search, selectedCategory, sortOption]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `https://world.openfoodfacts.org/api/v2/search?fields=id,product_name,image_url,categories,ingredients_text,nutriscore_grade&page=${currentPage}&page_size=${productsPerPage}`;
      
      if (search) {
        url += `&search_terms=${encodeURIComponent(search)}`;
      }
      if (selectedCategory) {
        url += `&categories_tags=${encodeURIComponent(selectedCategory)}`;
      }
      if (sortOption) {
        const sortMapping = {
          'name-asc': 'product_name',
          'name-desc': '-product_name',
          'grade-asc': 'nutriscore_grade',
          'grade-desc': '-nutriscore_grade'
        };
        url += `&sort_by=${sortMapping[sortOption]}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.products) {
        setProducts(data.products);
        setTotalProducts(data.count);
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

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

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center p-4">{error}</p>;

  return (
    <div className="container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-wrap gap-4">
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
        {products.map((product) => (
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
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.product_name}</h3>
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
      <Pagination 
        currentPage={currentPage}
        totalPages={Math.ceil(totalProducts / productsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default OpenFoodFactsList;