import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://en.openfoodfacts.net/api/v2/product/${productId}?fields=product_name,image_url,ingredients_text_en,nutriments,labels_tags.json`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  );
  if (!product) return null;

  return (
    <div className="container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sky-500">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{product.product_name}</h2>
        {product.image_url && (
          <img src={product.image_url} alt={product.product_name} className="w-full h-64 object-contain mb-4 rounded-lg" />
        )}

        <div className="space-y-4">
          <section>
            <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
            <p className="text-gray-700">{product.ingredients_text_en || 'No ingredient information available'}</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Nutrition Facts (per 100g)</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Energy: {product.nutriments?.energy_100g || 'N/A'} kcal</li>
              <li>Fat: {product.nutriments?.fat_100g || 'N/A'}g</li>
              <li>Carbohydrates: {product.nutriments?.carbohydrates_100g || 'N/A'}g</li>
              <li>Proteins: {product.nutriments?.proteins_100g || 'N/A'}g</li>
              <li>Salt: {product.nutriments?.salt_100g || 'N/A'}g</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Labels</h3>
            <div className="flex flex-wrap gap-2">
              {product.labels_tags ? (
                product.labels_tags.map((label, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                    {label.replace(/(en:|ar:|fr:)/g, '')}
                  </span>
                ))
              ) : (
                <p className="text-gray-700">No label information available</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;