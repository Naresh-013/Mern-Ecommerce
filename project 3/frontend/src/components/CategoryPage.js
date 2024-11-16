import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from './Header';

const CategoryPage = () => {
    const { category } = useParams();
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRentalsByCategory = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/rentals/category/${category}`);
                const data = await response.json();

                if (data.success) {
                    setRentals(data.data);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching rentals:', error);
                toast.error('Error fetching rentals');
            } finally {
                setLoading(false);
            }
        };

        fetchRentalsByCategory();
    }, [category]);

    return (
      <>
      <Header/>
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Category: {category}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {rentals.length > 0 ? (
                        rentals.map((rental) => (
                            <div key={rental._id} className="p-4 border rounded-lg shadow-md">
                                <img src={`http://localhost:8080/uploads/${rental.image}`} alt={rental.name} className="w-full h-48 object-cover mb-4 rounded-md" />
                                <h2 className="text-xl font-semibold mb-2">{rental.name}</h2>
                                <p className="text-gray-600 mb-2">{rental.description}</p>
                                <p className="text-gray-800 font-semibold">Price: ${rental.price}</p>
                                <p className="text-gray-700">From: {new Date(rental.fromDate).toLocaleDateString()}</p>
                                <p className="text-gray-700">To: {new Date(rental.toDate).toLocaleDateString()}</p>
                                <p className="text-gray-700">Location: {rental.location}</p>
                                <Link to={`/rentProduct/${rental._id}`} className="block mt-4 py-2 px-4 bg-blue-600 text-white text-center rounded-md">Rent Now</Link>
                            </div>
                        ))
                    ) : (
                        <p>No items found in this category.</p>
                    )}
                </div>
            )}
        </div>
      </>
    );
};

export default CategoryPage;
