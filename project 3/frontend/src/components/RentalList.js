import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RentalList = () => {
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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Rentals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rentals.map(rental => (
          <div key={rental._id} className="p-4 bg-white shadow-md rounded-lg">
            {rental.image && (
              <img src={`http://localhost:8080/uploads/${rental.image}`} alt={rental.name} className="w-full h-48 object-cover mb-4 rounded-md" />
            )}
            <h3 className="text-xl font-semibold">{rental.name}</h3>
            <p className="text-gray-700">{rental.description}</p>
            <p className="text-gray-700 font-bold">${rental.price}</p>
            <p className="text-gray-700">{rental.category}</p>
            <p className="text-gray-700">From: {new Date(rental.fromDate).toLocaleDateString()}</p>
            <p className="text-gray-700">To: {new Date(rental.toDate).toLocaleDateString()}</p>
            <p className="text-gray-700">Location: {rental.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalList;
