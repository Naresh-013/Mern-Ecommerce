import React, { useEffect, useState } from 'react';
import BannerPro from '../components/BannerPro';
import products from '../components/Products';
import ProductCard from '../components/ProductCard';
import CategorySection from '../components/CategorySection';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/rentals', { withCredentials: true });
        setRentals(response.data.data);
      } catch (error) {
        console.error('Error fetching rental data:', error);
      }
    };

    fetchRentals();
  }, []);

  const topTrending = products.filter(product => product.category === 'Top Trending');
  const recentlyAdded = products.filter(product => product.category === 'Recently Added');

  return (
    <div className='bg-blue-300'>
      <>
        <ToastContainer />
        <BannerPro />
        <CategorySection />
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Available Rentals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rentals.map(rental => (
              <div key={rental._id} className="p-4 bg-white shadow-md rounded-lg">
                {rental.image && (
                  <img src={rental.image} alt={rental.name} className="w-full h-48 object-cover mb-4 rounded-md" />
                )}
                <h3 className="text-xl font-semibold">{rental.name}</h3>
                <p className="text-gray-700">{rental.description}</p>
                <p className="text-gray-700 font-bold">${rental.price}</p>
                <p className="text-gray-700">{rental.category}</p>
                <p className="text-gray-700">From: {new Date(rental.fromDate).toLocaleDateString()}</p>
                <p className="text-gray-700">To: {new Date(rental.toDate).toLocaleDateString()}</p>
                <p className="text-gray-700">Location: {rental.location}</p>
                <Link to={`/rentProduct/${rental._id}`} className="block mt-4 py-2 px-4 bg-blue-600 text-white text-center rounded-md">Rent Now</Link>
              </div>
            ))}
          </div>
        </div>

        <section id='topTrending'>
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Top Trending</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {topTrending.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        <section id='recentlyAdded'>
          <div className='container mx-auto p-4'>
            <h2 className="text-2xl font-bold mt-8 mb-4">Recently Added</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recentlyAdded.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default Home;
