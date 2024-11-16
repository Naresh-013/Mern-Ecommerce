import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Watches', path: '/category/watches' },
  { name: 'Mobiles', path: '/category/mobiles' },
  { name: 'Laptops', path: '/category/laptops' },
  { name: 'Furniture', path: '/category/furnitures' },
  { name: 'Bikes', path: '/category/bike' },
  { name: 'Cars', path: '/category/car' },
];

function CategorySection() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 px-24">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 px-12 lg:grid-cols-6 gap-4">
        {categories.map(category => (
          <Link
            key={category.name}
            to={category.path}
            className="block p-4 bg-gray-200 rounded-lg hover:bg-gray-300 text-center"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;
