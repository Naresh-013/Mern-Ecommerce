import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user-details', { withCredentials: true });
        if (response.data.success) {
          setUser(response.data.data);
        } else {
          alert(response.data.message);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Error fetching user details');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const UserDetailsCard = ({ title, children }) => (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {children}
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in first.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <UserDetailsCard title="Basic Information">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
        </UserDetailsCard>
        <UserDetailsCard title="Rental Details">
          {user.rentals && user.rentals.length > 0 ? (
            <ul className="list-disc pl-5">
              {user.rentals.map((rental) => (
                <li key={rental._id} className="mb-4">
                  <p><strong>Product:</strong> {rental.name}</p>
                  <p><strong>Category:</strong> {rental.category}</p>
                  <p><strong>From Date:</strong> {new Date(rental.fromDate).toLocaleDateString()}</p>
                  <p><strong>To Date:</strong> {new Date(rental.toDate).toLocaleDateString()}</p>
                  <p><strong>Location:</strong> {rental.location}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No rental details found.</p>
          )}
        </UserDetailsCard>
      </div>
    </div>
  );
};

export default UserDetails;
