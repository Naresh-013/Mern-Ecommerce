import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../components/Products';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';

function ProductPage() {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
    <Header/>
    <Nav/>
    <div className="container mx-auto p-4  ">
      <h1 className="text-3xl flex justify-center py-8 items-center font-bold mb-4">{product.name}</h1>
      <img  src={product.image} alt={product.name} className="w-2/6 h-auto mx-auto mb-4" />
      <p className="text-lg flex justify-center items-center mb-4">{product.description}</p>
      <p className="text-lg flex justify-center items-center mb-4">Price - {product.Price}</p>
      <p className="text-lg flex justify-center items-center mb-4">Location - {product.location}</p>
      <p className="text-lg flex justify-center items-center mb-4">Date - {product.date}</p>
      <p className='flex justify-center items-center'>
      <button className="bg-blue-500  text-white  px-4 py-2">Add to Cart</button>
      </p>
    </div>
    <Footer/>
    </>
  );
}

export default ProductPage;
