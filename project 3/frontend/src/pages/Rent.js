import React, { useState } from 'react';
import axios from 'axios';

const RentForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('smartphones');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('fromDate', fromDate);
    formData.append('toDate', toDate);
    formData.append('location', location);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:8080/api/rentals', formData, { withCredentials: true });
      alert('Rental details submitted successfully');
    } catch (error) {
      console.error('Error submitting rental details:', error);
      alert('Error submitting rental details');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Rent a Product</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="smartphones">Mobiles</option>
          <option value="watches">Watches</option>
          <option value="furnitures">Furnitures</option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="laptops">Laptops</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">From Date</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">To Date</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Product Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">Submit</button>
    </form>
  );
};

export default RentForm;
