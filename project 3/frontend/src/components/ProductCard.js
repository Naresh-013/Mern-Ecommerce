import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2 rounded-lg" />
        <h3 className="text-xl font-semibold flex justify-center items-center mb-2">{product.name}</h3>
        <h3 className="text-xl font-semibold flex justify-center items-center  mb-2">{product.Price}</h3>
      </Link>
      <p className='flex justify-center items-center '>
      <button className="bg-green-500 text-white px-4 py-2 mt-2">Add to Cart</button>
      </p>
    </div>
  );
}

export default ProductCard;
